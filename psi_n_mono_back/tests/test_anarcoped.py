from pathlib import Path

import pytest

from psi_n_mono_back import trata_csv


@pytest.fixture
def csv_fixture():
    fixture = Path(__file__).with_name("acesso_em_hoje.csv")
    return fixture.read_text(encoding="utf-8-sig")


def test_main_returns_rows_from_csv(monkeypatch, csv_fixture):
    class FakeResponse:
        text = csv_fixture

        def raise_for_status(self):
            return None

    monkeypatch.setattr(trata_csv.httpx, "get", lambda url, timeout=30, follow_redirects=True: FakeResponse())

    rows = trata_csv.main(None, {})

    assert len(rows) > 1
    assert rows[0]["nome"] == "Matheus Augusto de Carvalho"
    assert rows[0]["cidadeRegiaoAtendimento"] == "Alfenas - MG"


def test_main_filters_by_name_and_query_params(monkeypatch, csv_fixture):
    class FakeResponse:
        text = csv_fixture

        def raise_for_status(self):
            return None

    monkeypatch.setattr(trata_csv.httpx, "get", lambda url, timeout=30, follow_redirects=True: FakeResponse())

    rows = trata_csv.main(
        "Matheus",
        {"convenio": "Não", "online": "Sim", "social": "Valor Social"},
    )

    assert len(rows) == 1
    assert rows[0]["nome"] == "Matheus Augusto de Carvalho"
    assert rows[0]["atendeConvenio"] == "Não"
    assert rows[0]["possibilidadeAtendimentoSocial"] == "Valor Social"


def test_csv_fixture_is_the_real_source():
    fixture = Path(__file__).with_name("acesso_em_hoje.csv")
    csv_text = fixture.read_text(encoding="utf-8-sig")

    assert fixture.exists()
    assert "Carimbo de data/hora" in csv_text
    assert "Nome" in csv_text
    assert "Atende convênio?" in csv_text
