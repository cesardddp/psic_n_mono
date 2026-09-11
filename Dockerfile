FROM oven/bun:1-alpine AS frontend

WORKDIR /app/psi_n_mono

COPY psi_n_mono/package.json psi_n_mono/bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

COPY psi_n_mono/ ./
RUN bun run build

FROM python:3.13-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY psi_n_mono_back/pyproject.toml psi_n_mono_back/README.rst ./psi_n_mono_back/
COPY psi_n_mono_back/psi_n_mono_back ./psi_n_mono_back/psi_n_mono_back

RUN pip install --no-cache-dir ./psi_n_mono_back \
    && rm -rf /root/.cache /root/.pip

RUN rm -rf /app/psi_n_mono_back/psi_n_mono_back/static/*
COPY --from=frontend /app/psi_n_mono/dist/ /app/psi_n_mono_back/psi_n_mono_back/static/

WORKDIR /app/psi_n_mono_back

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "psi_n_mono_back.app:app"]