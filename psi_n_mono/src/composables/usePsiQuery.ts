import { computed, ref } from "vue";
import { useQuery } from "@pinia/colada";
import { Psi } from "../psi_model";

const FiltrosPsi = {
  convenio: "Sim",
  online: "Sim",
  social: "Valor Social",
} as const;

const filtrosAplicadosInicial = {
  busca: "",
  convenio: false,
  online: false,
  social: false,
};

export function usePsiQuery() {
  const busca_ = ref("");
  const filtroConvenio = ref(false);
  const filtroOnline = ref(false);
  const filtroSocial = ref(false);
  const filtrosAplicados = ref({ ...filtrosAplicadosInicial });

  const buscarPsis = async () => {
    const resposta = await fetch(`${window.location.origin}/api/`);
    // const resposta = await fetch("/mock/psis.json");

    if (!resposta.ok) {
      throw new Error(`Falha ao carregar profissionais (${resposta.status})`);
    }

    const respostaJson: unknown = await resposta.json();

    if (!Array.isArray(respostaJson)) {
      throw new Error("A API retornou um formato inválido");
    }

    // Filtros no servidor mantidos para referência, mas desativados:
    // const { busca, convenio, online, social } = filtrosAplicados.value;
    // const parametros = new URLSearchParams();
    // if (convenio) parametros.set("convenio", FiltrosPsi.convenio);
    // if (social) parametros.set("social", FiltrosPsi.social);
    // if (online) parametros.set("online", FiltrosPsi.online);
    // const filtros = parametros.toString() ? `?${parametros}` : "";
    // fetch(`/api/${encodeURIComponent(busca)}${filtros}`);

    return respostaJson.map((psi) => new Psi(psi));
  };

  const queryPsis = useQuery({
    key: ["psis"],
    query: buscarPsis,
  });

  const busca = computed(() => busca_.value.trim().toLowerCase());
  const lista_de_psis = computed<Psi[]>(() => {
    const { convenio, online, social } = filtrosAplicados.value;
    const listaBase = queryPsis.data.value ?? [];
    const filtrada = listaBase.filter((psi) => {
      const texto = Object.values(psi).join(" ").toLowerCase();
      const correspondeBusca = !filtrosAplicados.value.busca ||
        texto.includes(filtrosAplicados.value.busca);
      const correspondeConvenio =
        !convenio || psi.atendeConvenio === FiltrosPsi.convenio;
      const correspondeOnline =
        !online || psi.atendeADistancia === FiltrosPsi.online;
      const correspondeSocial =
        !social || psi.possibilidadeAtendimentoSocial === FiltrosPsi.social;

      return (
        correspondeBusca &&
        correspondeConvenio &&
        correspondeOnline &&
        correspondeSocial
      );
    });

    return filtrada.slice(filtrosAplicados.value.busca ? 0 : 3);
  });
  const carregando = computed(() => queryPsis.asyncStatus.value === "loading");
  const erro = computed(() => queryPsis.error.value);

  const carregarLista = () => {
    filtrosAplicados.value = {
      busca: busca.value,
      convenio: filtroConvenio.value,
      online: filtroOnline.value,
      social: filtroSocial.value,
    };
  };

  return {
    busca_,
    filtroConvenio,
    filtroOnline,
    filtroSocial,
    lista_de_psis,
    carregando,
    erro,
    carregarLista,
  };
}
