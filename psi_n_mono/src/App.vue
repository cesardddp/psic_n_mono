<script setup lang="ts">
import { ref } from "vue";
import DataView from "openvue/dataview";
import Card from "./components/card.vue";
// import psi_list_mock from "./mock.json";
import { consolePresentation } from "./composables/console_presentation";
import { usePsiQuery } from "./composables/usePsiQuery";

consolePresentation(false);

const layout = ref<"grid" | "list">("grid");
const layoutOptions = [
  { value: "grid", label: "Cards", icon: "bi-grid-3x3-gap" },
  { value: "list", label: "Tabela", icon: "bi-table" },
] as const;

const {
  busca_,
  filtroConvenio,
  filtroOnline,
  filtroSocial,
  lista_de_psis,
  carregando,
  erro,
  carregarLista,
} = usePsiQuery();
</script>

<template>
  <header class="page-heading">
    <h1>Lista de Indicações - Psicólogues Não-Mono:</h1>
    <h2>Terapeutas, Psicólogues e Psicanalistas</h2>
  </header>

  <div class="app-shell">
    <section class="toolbar panel">
      <div class="search-wrap">
        <input
          v-model="busca_"
          class="search-input"
          type="text"
          placeholder="Buscar profissional..."
        />
        <button
          v-if="busca_"
          @click="busca_ = ''"
          type="button"
          class="clear-btn"
          aria-label="Limpar busca"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="filters-panel">
        <span class="filters-title">Filtrar por:</span>

        <label class="switch-field">
          <input v-model="filtroConvenio" type="checkbox" />
          <span>Atende convênio</span>
        </label>

        <label class="switch-field">
          <input v-model="filtroOnline" type="checkbox" />
          <span>Atende online</span>
        </label>

        <label class="switch-field">
          <input v-model="filtroSocial" type="checkbox" />
          <span>Valor social</span>
        </label>
      </div>

      <div class="layout-controls">
        <button
          v-for="option in layoutOptions"
          :key="option.value"
          type="button"
          class="layout-btn"
          :class="{ active: layout === option.value }"
          @click="layout = option.value"
        >
          <i :class="option.icon"></i>
          {{ option.label }}
        </button>
      </div>

      <button @click="carregarLista()" type="button" class="search-btn">
        <i class="bi bi-funnel"></i>
        Buscar
      </button>
    </section>

    <main class="dataview-shell">
      <div v-if="carregando" class="loading-state">
        <div
          class="spinner-border"
          role="status"
          style="width: 3rem; height: 3rem"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="erro" class="empty-state">
        <i class="bi bi-exclamation-triangle"></i>
        <p>Não foi possível carregar os profissionais.</p>
      </div>

      <DataView
        :value="lista_de_psis"
        :layout="layout"
        :rows="6"
        :paginator="true"
        :paginator-position="'bottom'"
        class="psi-dataview"
      >
        <template #grid="slotProps">
          <div class="cards-grid">
            <Card
              v-for="psi in slotProps.items"
              :key="psi.col_posicao"
              :psi_info="psi"
            />
          </div>
        </template>

        <template #list="slotProps">
          <div class="table-wrap">
            <table class="psi-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Convênio</th>
                  <th>Online</th>
                  <th>Valor social</th>
                  <th>Contato</th>
                  <th>Local</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="psi in slotProps.items" :key="psi.col_posicao">
                  <td>{{ psi.nome }}</td>
                  <td>{{ psi.atendeConvenio }}</td>
                  <td>{{ psi.atendeADistancia }}</td>
                  <td>{{ psi.possibilidadeAtendimentoSocial }}</td>
                  <td>{{ psi.telefoneCelular }}</td>
                  <td>{{ psi.cidadeRegiaoAtendimento }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <template #empty>
          <div class="empty-state">
            <i class="bi bi-search"></i>
            <p>Nenhum profissional encontrado.</p>
          </div>
        </template>
      </DataView>
    </main>
  </div>

  <footer class="source-footer">
    Lista original mantida por
    <a href="https://linktr.ee/artistadesconhecida">artistadesconhecida</a> em
    <cite><a href="https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBCl7flmc6Q4-JI6L4RhcdQZquIh-qlKr8oGF_YDKELDBlOqve3vyv2fqGBeOQVhuVBGYu1ijAUMha/pubhtml?gid=453695488&single=true" target="_blank">docs.google</a></cite>.
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

.page-heading h1 {
  color: #1e293b;
  margin-bottom: 12px;
  line-height: 1.15;
}

.page-heading h2 {
  color: #334155;
  line-height: 1.5;
}

.panel {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 1fr) auto;
  gap: 18px;
  align-items: center;
  padding: 18px 20px;
  margin-bottom: 28px;
}

.layout-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.layout-btn {
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: #f8fafc;
  color: #334155;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.layout-btn.active {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  border-color: transparent;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.22);
}

.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  height: 52px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: #f8fafc;
  color: #0f172a;
  border-radius: 999px;
  padding: 0 52px 0 18px;
  font-size: 1rem;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.12);
}

.clear-btn {
  position: absolute;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.16);
  color: #475569;
  cursor: pointer;
}

.filters-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  justify-content: center;
  padding: 0 8px;
}

.filters-title {
  width: 100%;
  font-weight: 700;
  color: #334155;
  font-size: 0.95rem;
}

.switch-field {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-size: 0.92rem;
  cursor: pointer;
}

.switch-field input {
  width: 16px;
  height: 16px;
  accent-color: #2563eb;
}

.search-btn {
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  padding: 14px 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 22px rgba(37, 99, 235, 0.26);
}

.dataview-shell {
  position: relative;
}

.loading-state {
  display: grid;
  place-items: center;
  min-height: 220px;
}

.psi-dataview {
  width: 100%;
}

:deep(.p-dataview) {
  border: none;
  background: transparent;
  box-shadow: none;
}

:deep(.p-dataview-content) {
  padding: 0;
  border: none;
  background: transparent;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
  align-items: stretch;
}

.table-wrap {
  overflow-x: auto;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 18px;
}

.psi-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

.psi-table th,
.psi-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  color: #334155;
}

.psi-table thead th {
  background: rgba(37, 99, 235, 0.06);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.psi-table tbody tr:hover {
  background: rgba(59, 130, 246, 0.04);
}

.empty-state {
  display: grid;
  place-items: center;
  gap: 8px;
  min-height: 220px;
  text-align: center;
  color: #475569;
  background: rgba(255, 255, 255, 0.72);
  border: 1px dashed rgba(148, 163, 184, 0.9);
  border-radius: 18px;
}

.empty-state i {
  font-size: 2rem;
}

:deep(.p-paginator) {
  background: transparent;
  border: none;
  padding-top: 24px;
}

:deep(.p-paginator-page.p-highlight) {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border-color: transparent;
  color: white;
}

@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }

  .filters-panel {
    justify-content: flex-start;
  }
}
</style>
