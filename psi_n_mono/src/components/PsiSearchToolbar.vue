<script setup lang="ts">
const search = defineModel<string>("search", { required: true });
const insurance = defineModel<boolean>("insurance", { required: true });
const online = defineModel<boolean>("online", { required: true });
const social = defineModel<boolean>("social", { required: true });
const layout = defineModel<"grid" | "list">("layout", { required: true });

const layoutOptions = [
  { value: "grid", label: "Cards", icon: "bi-grid-3x3-gap" },
  { value: "list", label: "Tabela", icon: "bi-table" },
] as const;

const emit = defineEmits<{
  search: [];
}>();
</script>

<template>
  <form class="toolbar panel" @submit.prevent="emit('search')">
    <div class="search-wrap">
      <input
        v-model="search"
        class="search-input"
        type="text"
        placeholder="Buscar profissional..."
        aria-label="Buscar profissional"
      />
      <button
        v-if="search"
        type="button"
        class="clear-btn"
        aria-label="Limpar busca"
        @click="search = ''"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <fieldset class="filters-panel">
      <legend class="filters-title">Filtrar por:</legend>

      <label class="switch-field">
        <input v-model="insurance" type="checkbox" />
        <span>Atende convênio</span>
      </label>

      <label class="switch-field">
        <input v-model="online" type="checkbox" />
        <span>Atende online</span>
      </label>

      <label class="switch-field">
        <input v-model="social" type="checkbox" />
        <span>Valor social</span>
      </label>
    </fieldset>

    <div class="layout-controls" aria-label="Modo de exibição">
      <button
        v-for="option in layoutOptions"
        :key="option.value"
        type="button"
        class="layout-btn"
        :class="{ active: layout === option.value }"
        :aria-pressed="layout === option.value"
        @click="layout = option.value"
      >
        <i :class="option.icon"></i>
        {{ option.label }}
      </button>
    </div>

    <button type="submit" class="search-btn">
      <i class="bi bi-funnel"></i>
      Buscar
    </button>
  </form>
</template>

<style scoped>
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
  min-width: 0;
  margin: 0;
  padding: 0 8px;
  border: 0;
}

.filters-title {
  width: 100%;
  padding: 0;
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

@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }

  .filters-panel {
    justify-content: flex-start;
  }
}
</style>
