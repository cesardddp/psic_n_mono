import os

import pytest

from psi_n_mono_back import cache_store


@pytest.fixture
def isolated_db(tmp_path, monkeypatch):
    db_path = tmp_path / "cache.sqlite3"
    monkeypatch.setattr(cache_store, "DB_PATH", str(db_path))
    return db_path


def test_get_or_update_csv_stores_and_reuses_value(isolated_db):
    calls = {"count": 0}

    def fetcher():
        calls["count"] += 1
        return "nome,telefone\nAna,9999\n"

    value1 = cache_store.get_or_update_csv("https://example.test/csv", ttl_seconds=60, fetcher=fetcher)
    value2 = cache_store.get_or_update_csv("https://example.test/csv", ttl_seconds=60, fetcher=fetcher)

    assert value1 == "nome,telefone\nAna,9999\n"
    assert value2 == value1
    assert calls["count"] == 1


def test_get_or_update_csv_refreshes_expired_value(isolated_db):
    calls = {"count": 0}

    def fetcher():
        calls["count"] += 1
        return f"nome,telefone\nAna,{calls['count']}\n"

    cache_store.get_or_update_csv("https://example.test/csv", ttl_seconds=60, fetcher=fetcher)
    cache_store.get_or_update_csv(
        "https://example.test/csv",
        ttl_seconds=0,
        fetcher=fetcher,
    )

    assert calls["count"] == 2
    assert "Ana,2" in cache_store.get_or_update_csv("https://example.test/csv", ttl_seconds=60, fetcher=fetcher)
