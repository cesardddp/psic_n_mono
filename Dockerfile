FROM oven/bun:1-alpine AS frontend

WORKDIR /app/psi_n_mono

COPY psi_n_mono/package.json psi_n_mono/bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

COPY psi_n_mono/ ./
RUN bun run build

FROM python:3.13-slim AS backend-builder

ENV PIP_NO_CACHE_DIR=1

WORKDIR /build

COPY psi_n_mono_back/pyproject.toml psi_n_mono_back/README.rst ./
COPY psi_n_mono_back/psi_n_mono_back ./psi_n_mono_back

RUN pip install --prefix=/install .

FROM gcr.io/distroless/python3-debian13:nonroot AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/usr/local/lib/python3.13/site-packages

WORKDIR /app

COPY --from=backend-builder /install /usr/local
COPY --from=frontend /app/psi_n_mono/dist/ /usr/local/lib/python3.13/site-packages/psi_n_mono_back/static/

WORKDIR /app/psi_n_mono_back

EXPOSE 8000

CMD ["-m", "gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "psi_n_mono_back.app:app"]