<script setup lang="ts">
import { ref } from "vue";
import { consolePresentation } from "./composables/console_presentation";
import { usePsiQuery } from "./composables/usePsiQuery";
import PsiSearchToolbar from "./components/PsiSearchToolbar.vue";
import PsiDataView from "./components/PsiDataView.vue";
import "bootstrap-icons/font/bootstrap-icons.css";

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
  sourceNotice,
  professionals,
  isLoading,
  error,
  applyFilters,
} = usePsiQuery();
</script>

<template>
  <header class="page-heading">
    <h1>Lista de Indicações - Psicólogues Não-Mono</h1>
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

    <aside
      v-if="sourceNotice"
      class="source-notice"
      role="note"
      aria-label="Aviso da planilha"
    >
      <i class="bi bi-info-circle" aria-hidden="true"></i>
      <p>{{ sourceNotice }}</p>
    </aside>

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
          >docs.google</a
        > </cite
      >.
    </p>
    <p>
      Visualizador mantido por
      <a href="mailto:cesardddp@hotmail.com">cesardddp</a> como um projeto
      pessoal.
    </p>
  </footer>
</template>

<style scoped>
:global(body) {
  background: whitesmoke;
  color: #1e293b;
}

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px 56px;
}

.source-notice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 24px;
  padding: 14px 18px;
  color: #9a3412;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 12px;
  text-align: left;
}

.source-notice i {
  flex: 0 0 auto;
  margin-top: 3px;
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
