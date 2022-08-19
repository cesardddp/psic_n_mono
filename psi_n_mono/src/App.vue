<script setup lang="ts">
import {
  ref,
  computed,
} from "vue";
import Card from "./components/card.vue";
import { Psi } from "./psi_model";
const filtro = ref("")
let raw_list_psi = ref([])

fetch('http://testepsinm.pythonanywhere.com/api')
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    raw_list_psi.value = response
  });

const lista_de_psis = computed(() => raw_list_psi.value.splice(3).map((psi: any) => new Psi(psi)))

const filtreMe = (psi: Psi) => {
  return (
    psi.all_as_string().includes(filtro.value.trim().toLowerCase())
    && (filtroOnline.value ? psi.atendeADistancia === "Sim" : true)
    && (filtroConvenio.value ? psi.atendeConvenio === "Sim" : true)
    && (filtroSocial.value ? psi.possibilidadeAtendimentoSocial === "Valor Social" : true)
  )
}
const filtroConvenio = ref(false)
const filtroOnline = ref(false)
const filtroSocial = ref(false)
</script>

<template>
  <div class="container row my-4 mx-auto">
    <label for="" class="col-md-6 d-flex">

      <input v-model="filtro" class="form-control border-end-0 border rounded-pill " type="text"
        placeholder="Busca..." />
      <button @click="filtro = ''" type="button" class="btn-close border align-self-center m-1"
        aria-label="Close"></button>
    </label>
    <div class="col-md-6 ">
      <span class="fs-4 mx-1"> Filtros: </span>
      <div class="btn-group btn-group-md-sm" role="group" aria-label="Basic checkbox toggle button group">
        <input v-model="filtroConvenio" type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
        <label class="btn" :class="filtroConvenio ? 'btn-outline-success' : 'btn-outline-danger'" for="btncheck1">
          Atende convênio</label>

        <input v-model="filtroOnline" type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
        <label class="btn" :class="filtroOnline ? 'btn-outline-success' : 'btn-outline-danger'"
          for="btncheck2">Atendimento online</label>

        <input v-model="filtroSocial" type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
        <label class="btn" :class="filtroSocial ? 'btn-outline-success' : 'btn-outline-danger'" for="btncheck3">
          Valor Social</label>
      </div>
    </div>
    <p class="text-center align-middle m-0">
      Compartilhe essa lista!!!

      <p>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large"
          data-text="Oi! Dá uma olhada nessa Lista de Indicações - Psicólogues Não-Mono : Terapeutas, Psicólogues e Psicanalistas!"
          data-url="http://testepsinm.pythonanywhere.com/" data-hashtags="psicologuesNaoMono" data-lang="pt"
          data-show-count="false"></a>
      </p>
    </p>
  </div>
  <!-- <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->
  <main class=" container d-flex flex-wrap p-0  mx-auto align-items-center justify-content-center">
    <div v-if="lista_de_psis.length <= 0" class="text-center position-absolute top-50 start-50 translate-middle">
      <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <Card v-show="filtreMe(psi)" class="col-md-4 col-lg-3 m-1" v-for="psi in lista_de_psis" :psi_info="psi" />
  </main>

</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");
</style>
