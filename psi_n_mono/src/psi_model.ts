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
  // to_search:string;

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
    // this.to_search = this.all_as_string()
  }

  // all_as_string() {
  //   return (
  //     this.abordagemEspecialidades.split(' ').filter((palavra)=>(palavra.length>3)).join(' ') +
  //     this.cidadeRegiaoAtendimento.split(' ').filter((palavra)=>(palavra.length>3)).join(' ') +
  //     this.nome.split(' ').filter((palavra)=>(palavra.length>2)).join(' ')
  //     // this.atendeConvenio +
  //     // this.atendeADistancia +
  //     // this.possibilidadeAtendimentoSocial +
  //     // this.pronomes +
  //     // this.redesSociais +
  //     // this.telefoneCelular +
  //     // this.temWhatsapp +
  //     // this.col_posicao
  //   ).toLowerCase();
  // }
}
