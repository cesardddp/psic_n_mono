import requests
from bs4 import BeautifulSoup

URL = "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBCl7flmc6Q4-JI6L4RhcdQZquIh-qlKr8oGF_YDKELDBlOqve3vyv2fqGBeOQVhuVBGYu1ijAUMha/pubhtml?gid=453695488&single=true"


def main(search_term,filtros):

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
    
    # (0, '1'),
    # (1, 'Nome'),
    # (2, 'Pronomes'),
    # (3, 'Cidade ou região que atende'),
    # (4, 'Faz atendimento à distância (online)'),
    # (5, 'Telefone/Celular'),
    # (6, 'Tem whatsapp?'),
    # (7, 'Abordagem e Especialidades'),
    # (8, 'Possibilidade de atendimento social '),
    # (9, 'Atende convênio?'),
    # (10, 'Redes Sociais')
    # {'convenio': 'Sim', 'social': 'Valor Social', 'online': 'Sim'}
    def transforma_lina(row):
        colunas = [a.text for a in row.children]
        # a= "".join(colunas).lower().find('yla')
        return dict(zip(columns,colunas))
    
    def filtra_pelo_search_term(row):
        colunas = [a.text for a in row.children]
        busca_resultado = "".join(colunas).lower().find(search_term) != -1 if search_term else True
        # [0'1', 1'Nome', 2'Pronomes', 3'Cidade ou região que atende', 4'Faz atendimento à distância (online)', 5'Telefone/Celular', 'Tem whatsapp?', 'Abordagem e Especialidades', 'Possibilidade de atendimento social ', 'Atende convênio?', 'Redes Sociais']
        filtro_convenio = colunas[9] == filtros.get('convenio',colunas[9])
        filtro_social = colunas[4] == filtros.get('online',colunas[4])
        filtro_online = colunas[8] == filtros.get('social',colunas[8]) 

        return busca_resultado and filtro_convenio and filtro_social and filtro_online

    if (search_term is not None) or filtros:
        soup1 = filter(filtra_pelo_search_term,soup1)

    # psics = map(lambda row: dict(zip(columns, [a.text for a in row.children])) if , soup1)
    # a = list(filter(filtra_pelo_search_term,soup1))
    return map(transforma_lina,soup1)
