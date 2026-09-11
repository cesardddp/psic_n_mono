SHELL := sh

FRONTEND_DIR := psi_n_mono
BACKEND_DIR := psi_n_mono_back
BACKEND_STATIC_DIR := $(BACKEND_DIR)/psi_n_mono_back/static
APP_URL := http://localhost:8000

.PHONY: all build-front publish-front open run

all: run

build-front:
	cd $(FRONTEND_DIR) && bun run build

publish-front: build-front
	mkdir -p $(BACKEND_STATIC_DIR)
	find $(BACKEND_STATIC_DIR) -mindepth 1 -maxdepth 1 -exec rm -rf {} +
	cp -R $(FRONTEND_DIR)/dist/. $(BACKEND_STATIC_DIR)/

open:
	cmd.exe /c start "" "$(APP_URL)"

run: publish-front
	$(MAKE) open
	cd $(BACKEND_DIR) && uv run python -m psi_n_mono_back