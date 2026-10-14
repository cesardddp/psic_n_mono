import sys
from pathlib import Path

from psi_n_mono_back import __version__
from psi_n_mono_back.__main__ import _load_app


def test_version():
    assert __version__ == '1.0.7.2'


def test_load_app_when_running_from_package_directory(monkeypatch):
    package_dir = Path(__file__).resolve().parents[1] / 'psi_n_mono_back'
    monkeypatch.chdir(package_dir)
    monkeypatch.setattr(sys, 'path', [str(package_dir)])

    assert _load_app() is not None
