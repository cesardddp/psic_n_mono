import csv
import io

import httpx

from .cache_store import get_or_update_csv


CSV_URL = "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBCl7flmc6Q4-JI6L4RhcdQZquIh-qlKr8oGF_YDKELDBlOqve3vyv2fqGBeOQVhuVBGYu1ijAUMha/pub?gid=453695488&single=true&output=csv"
CACHE_TTL_SECONDS = 12 * 60 * 60


def _parse_rows(csv_text):
    reader = csv.DictReader(io.StringIO(csv_text))
    rows = []
    for row in reader:
        normalized = {
            "col_posicao": row.get("col_posicao", ""),
            "nome": (row.get("Nome") or "").strip(),
            "pronomes": (row.get("Pronomes") or "").strip(),
            "cidadeRegiaoAtendimento": (row.get("Cidade ou região que atende") or "").strip(),
            "atendeADistancia": (row.get("Faz atendimento à distância (online)") or "").strip(),
            "telefoneCelular": (row.get("Telefone/Celular") or "").strip(),
            "temWhatsapp": (row.get("Tem whatsapp?") or "").strip(),
            "abordagemEspecialidades": (row.get("Abordagem e Especialidades") or "").strip(),
            "possibilidadeAtendimentoSocial": (row.get("Possibilidade de atendimento social ") or "").strip(),
            "atendeConvenio": (row.get("Atende convênio?") or "").strip(),
            "redesSociais": (row.get("Redes Sociais") or "").strip(),
        }
        if any(value for value in normalized.values()):
            rows.append(normalized)
    return rows


def _download_csv():
    def fetcher():
        response = httpx.get(CSV_URL, timeout=30, follow_redirects=True)
        response.raise_for_status()
        return response.text

    return get_or_update_csv(CSV_URL, CACHE_TTL_SECONDS, fetcher)


def main(search_term, filtros):
    rows = _parse_rows(_download_csv())

    if search_term is not None or filtros:
        filtered_rows = []
        for row in rows:
            text = " ".join(row.values()).lower()
            search_match = True if not search_term else search_term.lower() in text

            convenio = str(filtros.get("convenio", "")).strip()
            filtro_convenio = True if not convenio else row.get("atendeConvenio", "") == convenio

            online = str(filtros.get("online", "")).strip()
            filtro_online = True if not online else row.get("atendeADistancia", "") == online

            social = str(filtros.get("social", "")).strip()
            filtro_social = True if not social else row.get("possibilidadeAtendimentoSocial", "") == social

            if search_match and filtro_convenio and filtro_online and filtro_social:
                filtered_rows.append(row)
        return filtered_rows

    return rows
