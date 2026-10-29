import { computed, ref } from "vue";
import { useQuery } from "@pinia/colada";
import type { PsiType } from "../psi_model";

const FILTER_VALUES = {
  yes: "sim",
  social: "valor social",
} as const;

type AppliedFilters = {
  search: string;
  convenio: boolean;
  online: boolean;
  social: boolean;
};

const initialAppliedFilters: AppliedFilters = {
  search: "",
  convenio: false,
  online: false,
  social: false,
};

// function isPsiType(value: unknown): value is PsiType {
//   if (typeof value !== "object" || value === null || Array.isArray(value)) {
//     return false;
//   }

//   const record = value as Record<string, unknown>;
//   const requiredFields: (keyof PsiType)[] = [
//     "abordagemEspecialidades",
//     "atendeConvenio",
//     "cidadeRegiaoAtendimento",
//     "atendeADistancia",
//     "nome",
//     "possibilidadeAtendimentoSocial",
//     "pronomes",
//     "redesSociais",
//     "telefoneCelular",
//     "temWhatsapp",
//     "col_posicao",
//   ];

//   return requiredFields.every((field) => typeof record[field] === "string");
// }

async function fetchPsis(url: string): Promise<PsiType[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Resposta HTTP ${response.status}`);
  }

  const payload = await response.json() as PsiType[];
  // se isso se mostrar necessário, fazer essa checagem no backend
  // if (!Array.isArray(payload) || !payload.every(isPsiType)) {
  //   throw new Error("A resposta não contém uma lista válida de profissionais");
  // }

  return payload;
}

export function usePsiQuery() {
  const searchQuery = ref("");
  const filterByConvenio = ref(false);
  const filterOnline = ref(false);
  const filterSocial = ref(false);
  const appliedFilters = ref({ ...initialAppliedFilters });

  const fetchProfessionals = async () => {
    // const mockUrl = `${import.meta.env.BASE_URL}mock/psis.json`;
    let apiError: unknown;

    try {
      return await fetchPsis(import.meta.env.VITE_API_URL);
    } catch (error) {
      apiError = error;
    // }

    // try {
    //   return await fetchPsis(mockUrl);
    // } catch (fallbackError) {
      const apiMessage =
        apiError instanceof Error ? apiError.message : "erro de rede";
      const fallbackMessage =
        error instanceof Error
          ? error.message
          : "erro desconhecido";

      throw new Error(
        `Falha ao carregar profissionais. API: ${apiMessage}. ` +
          `Dados locais: ${fallbackMessage}.`,
        { cause: error },
      );
    }
  };

  const queryPsis = useQuery({
    key: ["psis"],
    query: fetchProfessionals,
  });

  const normalizedSearchQuery = computed(() =>
    searchQuery.value.trim().toLocaleLowerCase(),
  );
  const professionals = computed<
  PsiType[]
  >(() => {
    const { search, convenio, online, social } = appliedFilters.value;
    const professionals = queryPsis.data.value ?? [];

    return professionals.filter((professional) => {
      const searchableText = Object.values(professional)
        .join(" ")
        .toLocaleLowerCase();
      const matchesSearch = !search || searchableText.includes(search);
      const matchesInsurance =
        !convenio ||
        professional.atendeConvenio.trim().toLocaleLowerCase() ===
          FILTER_VALUES.yes;
      const matchesOnline =
        !online ||
        professional.atendeADistancia.trim().toLocaleLowerCase() ===
          FILTER_VALUES.yes;
      const matchesSocial =
        !social ||
        professional.possibilidadeAtendimentoSocial
          .trim()
          .toLocaleLowerCase()
          .includes(FILTER_VALUES.social);

      return (
        matchesSearch && matchesInsurance && matchesOnline && matchesSocial
      );
    });
  });
  const isLoading = computed(() => queryPsis.asyncStatus.value === "loading");
  const error = computed(() => queryPsis.error.value);

  const applyFilters = () => {
    appliedFilters.value = {
      search: normalizedSearchQuery.value,
      convenio: filterByConvenio.value,
      online: filterOnline.value,
      social: filterSocial.value,
    };
  };

  return {
    searchQuery,
    filterByInsurance: filterByConvenio,
    filterOnline,
    filterSocial,
    professionals,
    isLoading,
    error,
    applyFilters,
  };
}
