type PsiType = {
  abordagemEspecialidades: string;
  atendeConvenio: string;
  cidadeRegiaoAtendimento: string;
  atendeADistancia: string;
  nome: string;
  possibilidadeAtendimentoSocial: string;
  pronomes: string;
  redesSociais: string;
  telefoneCelular: string;
  temWhatsapp: string;
  col_posicao: string;
};

export class Psi {
  abordagemEspecialidades: string;
  atendeConvenio: string;
  cidadeRegiaoAtendimento: string;
  atendeADistancia: string;
  nome: string;
  possibilidadeAtendimentoSocial: string;
  pronomes: string;
  redesSociais: string;
  telefoneCelular: string;
  temWhatsapp: string;
  col_posicao: string;

  constructor(psi: PsiType) {
    this.abordagemEspecialidades = psi.abordagemEspecialidades;
    this.atendeConvenio = psi.atendeConvenio;
    this.cidadeRegiaoAtendimento = psi.cidadeRegiaoAtendimento;
    this.atendeADistancia = psi.atendeADistancia;
    this.nome = psi.nome;
    this.possibilidadeAtendimentoSocial = psi.possibilidadeAtendimentoSocial;
    this.pronomes = psi.pronomes;
    this.redesSociais = psi.redesSociais;
    this.telefoneCelular = psi.telefoneCelular;
    this.temWhatsapp = psi.temWhatsapp;
    this.col_posicao = psi.col_posicao;
  }

  all_as_string() {
    return (
      this.abordagemEspecialidades +
      this.atendeConvenio +
      this.cidadeRegiaoAtendimento +
      this.atendeADistancia +
      this.nome +
      this.possibilidadeAtendimentoSocial +
      this.pronomes +
      this.redesSociais +
      this.telefoneCelular +
      this.temWhatsapp +
      this.col_posicao
    ).toLowerCase();
  }
}
