import os
import sqlite3
import time

DB_PATH = os.environ.get("DB_PATH", "/tmp/cache.sqlite3")

def _connect():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS csv_cache (
            url TEXT PRIMARY KEY,
            payload TEXT NOT NULL,
            fetched_at INTEGER NOT NULL
        )
        """
    )
    return conn


def get_or_update_csv(url, ttl_seconds, fetcher):
    now = int(time.time())
    conn = _connect()
    try:
        row = conn.execute(
            "SELECT payload, fetched_at FROM csv_cache WHERE url = ?",
            (url,),
        ).fetchone()

        if row is not None:
            payload, fetched_at = row
            if now - fetched_at < ttl_seconds:
                return payload

        payload = fetcher()
        conn.execute(
            "INSERT INTO csv_cache(url, payload, fetched_at) VALUES(?, ?, ?) "
            "ON CONFLICT(url) DO UPDATE SET payload = excluded.payload, fetched_at = excluded.fetched_at",
            (url, payload, now),
        )
        conn.commit()
        return payload
    finally:
        conn.close()
