<script setup lang="ts">
import { computed } from "vue";
import DataView from "openvue/dataview";
import PsiCard from "./PsiCard.vue";
import { Psi } from "../psi_model.ts";

const props = defineProps<{
  professionals: Psi[];
  layout: "grid" | "list";
  loading: boolean;
  error: unknown;
}>();

const rows = defineModel<number>("rows", { required: true });
const rowsPerPageOptions = [1, 5, 10, 25, 50, 90];
const errorMessage = computed(() =>
  props.error instanceof Error
    ? props.error.message
    : "Não foi possível carregar os profissionais.",
);
</script>

<template>
  <section class="dataview-shell" aria-label="Resultados da busca">
    <div v-if="loading" class="loading-state" role="status">
      <div class="spinner-border" style="width: 3rem; height: 3rem">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-else-if="error" class="empty-state" role="alert">
      <i class="bi bi-exclamation-triangle"></i>
      <p>{{ errorMessage }}</p>
    </div>

    <DataView
      v-else
      :value="professionals"
      :layout="layout"
      :rows="rows"
      :paginator="true"
      :paginator-position="'bottom'"
      class="psi-dataview"
    >
      <template #grid="slotProps">
        <div class="cards-grid">
          <PsiCard
            v-for="professional in slotProps.items"
            :key="professional.col_posicao"
            :professional="professional"
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
              <tr
                v-for="professional in slotProps.items"
                :key="professional.col_posicao"
              >
                <td>{{ professional.nome }}</td>
                <td>{{ professional.atendeConvenio }}</td>
                <td>{{ professional.atendeADistancia }}</td>
                <td>{{ professional.possibilidadeAtendimentoSocial }}</td>
                <td>{{ professional.telefoneCelular }}</td>
                <td>{{ professional.cidadeRegiaoAtendimento }}</td>
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

    <label class="page-size-control">
      <span>Itens por página</span>
      <select v-model.number="rows" aria-label="Itens por página">
        <option v-for="option in rowsPerPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>
  </section>
</template>

<style scoped>
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

.page-size-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  color: #475569;
  font-size: 0.9rem;
}

.page-size-control select {
  min-width: 64px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  border-radius: 6px;
  padding: 6px 8px;
  background: white;
  color: #334155;
}
</style>
