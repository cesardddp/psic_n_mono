<script setup lang="ts">
import { ref } from "vue";
import { consolePresentation } from "./composables/console_presentation";
import { usePsiQuery } from "./composables/usePsiQuery";
import PsiSearchToolbar from "./components/PsiSearchToolbar.vue";
import PsiDataView from "./components/PsiDataView.vue";

const showConsolePresentation =
  import.meta.env.VITE_CONSOLE_PRESENTATION === "true";

consolePresentation(showConsolePresentation);

const layout = ref<"grid" | "list">("grid");
const rows = ref(10);

const {
  searchQuery,
  filterByInsurance,
  filterOnline,
  filterSocial,
  professionals,
  isLoading,
  error,
  applyFilters,
} = usePsiQuery();
</script>

<template>
  <header class="page-heading">
    <h1>Lista de Indicações - Psicólogues Não-Mono:</h1>
    <h2>Terapeutas, Psicólogues e Psicanalistas</h2>
  </header>

  <main class="app-shell">
    <PsiSearchToolbar
      v-model:search="searchQuery"
      v-model:insurance="filterByInsurance"
      v-model:online="filterOnline"
      v-model:social="filterSocial"
      v-model:layout="layout"
      @search="applyFilters"
    />

    <PsiDataView
      v-model:rows="rows"
      :professionals="professionals"
      :layout="layout"
      :loading="isLoading"
      :error="error"
    />
  </main>

  <footer class="source-footer">
    <p>
      Lista original mantida por
      <a href="https://linktr.ee/artistadesconhecida">artistadesconhecida</a>
      em
      <cite>
        <a
          href="https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBCl7flmc6Q4-JI6L4RhcdQZquIh-qlKr8oGF_YDKELDBlOqve3vyv2fqGBeOQVhuVBGYu1ijAUMha/pubhtml?gid=453695488&single=true"
          target="_blank"
          rel="noopener noreferrer"
        >docs.google</a>
      </cite>.
    </p>
    <p>
      Mantido por
      <a href="mailto:cesardddp@hotmail.com">cesardddp</a> como um projeto
      pessoal de utilidade pública.
    </p>
  </footer>
</template>

<style scoped>
:global(body) {
  background: linear-gradient(180deg, #f5f7fb 0%, #edf3ff 100%);
  color: #1e293b;
}

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px 56px;
}

.source-footer {
  font-size: 0.75rem;
  opacity: 0.6;
  text-align: center;
  padding: 0 16px 24px;
}

.source-footer p + p {
  margin-top: 4px;
}

.page-heading h1 {
  color: #1e293b;
  margin-bottom: 12px;
  line-height: 1.15;
}

.page-heading h2 {
  color: #334155;
  line-height: 1.5;
}
</style>
