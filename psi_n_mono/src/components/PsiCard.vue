<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PsiType } from "../psi_model";
import { parseRedesSociais } from "../composables/parseRedesSociais";

const props = defineProps<{ professional: PsiType }>()
const isExpanded = ref(false)

const redesSociais = computed(() => parseRedesSociais(props.professional.redesSociais))

const showBadgeConvenio = computed(() => props.professional.atendeConvenio?.trim().toLowerCase() === 'sim')
const showBadgeOnline = computed(() => props.professional.atendeADistancia?.trim().toLowerCase() === 'sim')
const showBadgeValorSocial = computed(() => props.professional.possibilidadeAtendimentoSocial?.toLowerCase().includes('valor social'))
const resumoEspecialidades = computed(() => props.professional.abordagemEspecialidades || '')
const descriptionIsExpandable = computed(() => resumoEspecialidades.value.length > 150)
const shortDescription = computed(() => {
  return descriptionIsExpandable.value
    ? `${resumoEspecialidades.value.substring(0, 150).trim()}...`
    : resumoEspecialidades.value
})
</script>

<template>
  <article class="psi-card">
    <header class="psi-card__header">
      <span class="psi-card__badge" :class="showBadgeConvenio ? 'is-success' : 'is-danger'">
        Convênio: {{ professional.atendeConvenio }}
      </span>
      <span v-if="professional.atendeADistancia" class="psi-card__badge" :class="showBadgeOnline ? 'is-success' : 'is-danger'">
        Online: {{ professional.atendeADistancia }}
      </span>
      <span v-if="professional.possibilidadeAtendimentoSocial" class="psi-card__badge" :class="showBadgeValorSocial ? 'is-success' : 'is-neutral'">
        {{ professional.possibilidadeAtendimentoSocial }}
      </span>
    </header>

    <div class="psi-card__body">
      <div class="psi-card__title-row">
        <div>
          <h3 class="psi-card__title">{{ professional.nome }}</h3>
          <div class="psi-card__meta" v-if="professional.pronomes || professional.cidadeRegiaoAtendimento">
            <span v-if="professional.pronomes">{{ professional.pronomes }}</span>
            <span v-if="professional.cidadeRegiaoAtendimento">{{ professional.cidadeRegiaoAtendimento }}</span>
          </div>
        </div>
      </div>

      <div class="psi-card__info">
        <span class="psi-card__info-item">
          <i class="bi bi-telephone"></i>
          {{ professional.telefoneCelular }}
        </span>
        <span v-if="professional.temWhatsapp?.trim().toLowerCase() === 'sim'" class="psi-card__info-item psi-card__info-item--whatsapp">
          <i class="bi bi-whatsapp"></i>
          WhatsApp
        </span>
      </div>

      <div class="psi-card__description">
        <p>{{ isExpanded ? resumoEspecialidades : shortDescription }}</p>
        <button
          v-if="descriptionIsExpandable"
          type="button"
          class="psi-card__toggle"
          :aria-expanded="isExpanded"
          @click="isExpanded = !isExpanded"
        >
          {{ isExpanded ? 'ver menos' : 'ver mais' }}
        </button>
      </div>
    </div>

    <footer class="psi-card__footer">
      <span v-if="professional.cidadeRegiaoAtendimento" class="psi-card__location">
        <i class="bi bi-pin-map"></i>
        {{ professional.cidadeRegiaoAtendimento }}
      </span>

      <a
        v-for="link in redesSociais"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="psi-card__social"
        :class="`psi-card__social--${link.rede}`"
      >
        <i :class="link.rede === 'instagram' ? 'bi bi-instagram' : 'bi bi-globe'"></i>
        {{ link.nick }}
      </a>

      <span v-if="!redesSociais.length" class="psi-card__empty-social">
        {{ professional.redesSociais || 'Sem rede social informada' }}
      </span>
    </footer>
  </article>
</template>

<style scoped>
.psi-card {
  width: 100%;
  max-width: 360px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,255,0.96));
  border: 1px solid rgba(123, 142, 169, 0.2);
  border-radius: 22px;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.psi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 38px rgba(15, 23, 42, 0.18);
}

.psi-card__header {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 18px 12px;
  background: rgba(111, 133, 194, 0.06);
  border-bottom: 1px solid rgba(123, 142, 169, 0.14);
}

.psi-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
}

.psi-card__badge.is-success {
  background: linear-gradient(135deg, #10b981, #059669);
}

.psi-card__badge.is-danger {
  background: linear-gradient(135deg, #f97316, #ef4444);
}

.psi-card__badge.is-neutral {
  background: linear-gradient(135deg, #64748b, #475569);
}

.psi-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 18px;
  padding: 18px 18px 14px;
}

.psi-card__title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.psi-card__title {
  margin: 0;
  font-size: 1.45rem;
  line-height: 1.2;
  color: #1f2937;
}

.psi-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  color: #64748b;
  font-size: 0.78rem;
}

.psi-card__meta span + span::before {
  content: '•';
  margin-right: 8px;
  color: #94a3b8;
}

.psi-card__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #475569;
  font-size: 0.92rem;
}

.psi-card__info-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.psi-card__info-item--whatsapp {
  color: #0f766e;
  font-weight: 600;
}

.psi-card__description {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.psi-card__description p {
  margin: 0;
  color: #475569;
  line-height: 1.65;
  font-size: 0.95rem;
}

.psi-card__toggle {
  align-self: flex-start;
  border: none;
  background: transparent;
  color: #2563eb;
  font-weight: 700;
  padding: 0;
  cursor: pointer;
}

.psi-card__footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 18px 18px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(241, 245, 249, 0.8);
}

.psi-card__location {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-size: 0.82rem;
}

.psi-card__social,
.psi-card__empty-social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 700;
  transition: opacity 0.2s ease;
}

.psi-card__social:hover,
.psi-card__empty-social:hover {
  opacity: 0.92;
}

.psi-card__social--instagram {
  color: white;
  background: linear-gradient(135deg, #f9a43b, #e1306c 45%, #833ab4 100%);
}

.psi-card__social--site {
  color: #0f172a;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
}

.psi-card__empty-social {
  color: #475569;
  background: rgba(148, 163, 184, 0.12);
}

@media (max-width: 576px) {
  .psi-card {
    min-height: auto;
  }
}
</style>
