import requests
from bs4 import BeautifulSoup

URL = "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBCl7flmc6Q4-JI6L4RhcdQZquIh-qlKr8oGF_YDKELDBlOqve3vyv2fqGBeOQVhuVBGYu1ijAUMha/pubhtml?gid=453695488&single=true"


def main():

    content = requests.get(URL).text
    soup = BeautifulSoup(content, "html.parser")
    soup1 = soup.select("tr")
    columns = [
        "col_posicao",
        "nome",
        "pronomes",
        "cidadeRegiaoAtendimento",
        "atendeADistancia",
        "telefoneCelular",
        "temWhatsapp",
        "abordagemEspecialidades",
        "possibilidadeAtendimentoSocial",
        "atendeConvenio",
        "redesSociais",
    ]
    # '1
    # Nome
    # Pronomes
    # Cidade ou região que atende
    # Faz atendimento à distância (online)
    # Telefone/CelularTem whatsapp?
    # Abordagem e Especialidades
    # Possibilidade de atendimento social 
    # Atende convênio?
    # Redes Sociais'
    psics = map(lambda row: dict(zip(columns, [a.text for a in row.children])), soup1)

    return psics
