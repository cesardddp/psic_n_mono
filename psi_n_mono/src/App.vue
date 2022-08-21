<script setup lang="ts">
import {
  ref,
  computed,
  ComputedRef,
} from "vue";
import Card from "./components/card.vue";
import { Psi } from "./psi_model";
// import psi_list_mock from "./mock.json";

console.log("Sinta-se livre pra replicar, reutilizar e contribuir com código.");
console.log("App mantido por cesardddp");
console.log("Infelizmente o software não é 100% livre pois faz uso de Vue3 e Boostrap5 e outras que não verifiquei as licensas :´(");
console.log("Me ajude a melhora-lo, deixa-lo mais acessivel e mais livre!");
console.log("https://github.com/cesardddp/psic_n_mono");
console.log(
  `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#%%&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#%#%%%%##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#%/    (@&&&&&&&&&&&,    %%#%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%##&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%###  *&&&&. ,&& ,&(&@ && &@ &&&&&&&&  /%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% /@&&&  &&&   %& &&&&& && &@ &&  &&&  *&&@  #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#  &&& /&&& @. @(  %@&&&&&&&&&&&@&&.* #&& @&& @&&&& (%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%* @&@&  &# &&.(&@&&                    &&&%&& .@& &@.&&& %#%%%%%%%%%%%%%%%%%#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%# .&& * @&& /&&&                               @&@ (& &@   &@  %%%%%%%%%%%%#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%.*&&, &&&& #&@                                      @&&.,&&&&&&& /%%%%%%#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  &%       &@                                   .        &&*&&  &&&& %#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#% &&&&&&@ .&& #####.                      ###############    &&&&&  &&&#.&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#% &&% @,  && ###############,.   .*##########################   &@&&&   @& &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%# @&&&&& #&& ###################################################% @& &#&&&&& &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%# &&&&&&&&&% #####################################################  &&&&&&&&&@ &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%.,&&&&&&&&@ ####################################################(    &&&&&&&&&* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% &&&&&&&&& #####################################################      &&&&&&&&& &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% &&&&&&&&& ####################################################       &&&&&&&&& @&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% &&&&&&&&&  ##################################################         &&&&&&&&(.&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% &&&&&&&&@ &&& ,#############################################*         &&&&&&&&# &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%# &&&&&&&&&  &&&&&@  ,#################*        #############%         #&&&&&&&&,.&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% &&&&&&&&&,  @&&&&&&&&&&&(,     *@&&&&&&&&&&&&&     #######%          &&&&&&&&& &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% &&&&&&&&@    &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&         ####          #&&&&&&&&& &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% /&&&&&&&&&      /&&&&&&&&&&&&&&&&&&&&&&&&&&.        ####          ,&&&&&&&&& &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% &&&&&&&&&&           #&&&&&&&&@@&&&&&&&&&#        ,###          #&&&&&&&&& %&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% #&&&&&&&&&&                         &&&&         ###          &&&&&&&&&& &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#, &&&&&&&&&&*                      &&&@         ###         &&&&&&&&&&@ &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%# @&&&&&&&&&&&                   *&&@         ###,       &&&&&&&&&&&# &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% @&&&&&&&&&&&,                &&&         (##(     &&&&&&&&&&&&& @&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&& &&&&&&&&&&&&&&            &&&         *###  .&&&&&&&&&&&&&& %&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&& .&&&&&&&&&&&& &&&@     &&&           @&&&&* &&&&&&&&@&, &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%%#%%&&&&&&&&&&&&&&&&&&  &&&&&&* & &&&, &  &&@&&&&&&&&&  #&&.   & &&&&&&  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&( %&@@&& &&&  (&&&&/ &&& &&..&&@ &&@ &&&&@@  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  (&&@&&@ .&&& %&&& @&&.   /&&&&#  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%%%#%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&/    %&&&&&&&&&&&%     &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%%%%#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
%%#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
`
);


const busca_ = ref("")
const busca = computed(() => busca_.value.trim().toLowerCase())
const carregando = ref(true)
const filtroConvenio = ref(false)
const filtroOnline = ref(false)
const filtroSocial = ref(false)
const list_psi = ref<Psi[]>()

enum filtrcosEnum {
  convenio = "Sim",
  online = "Sim",
  social = "Valor Social"
}

const carregarLista = () => {
  let filtrosLista = Array<string>()
  if (filtroConvenio.value) filtrosLista.push("convenio=" + filtrcosEnum.convenio);
  if (filtroSocial.value) filtrosLista.push("social=" + filtrcosEnum.social);
  if (filtroOnline.value) filtrosLista.push("online=" + filtrcosEnum.online);

  const filtros_ = filtrosLista.length > 0 ? ("?" + filtrosLista.join('&')) : '';

  carregando.value = true
  // fetch('http://localhost:5000/api/' + busca.value + filtros_)
  fetch('http://testepsinm.pythonanywhere.com/api/' + busca.value + filtros_)
    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      list_psi.value = response.splice(busca.value ? 0 : 3).map((psi: any) => new Psi(psi))
    }).catch((e) => {
      // raw_list_psi.value = psi_list_mock
      // console.log(e);
      // list_psi.value = psi_list_mock.splice(3).map((psi: any) => new Psi(psi))

      // debugger
    })
    .finally(() => {
      carregando.value = false
    })
    ;
}

const lista_de_psis: ComputedRef<Psi[] | undefined> = computed(() => {
  // debugger
  return list_psi.value

})



carregarLista()
</script>

<template>

  <div class="container row my-4 mx-auto">
    <label for="" class="col-md-6 d-flex">

      <input v-model="busca_" class="form-control border-end-0 border rounded-pill my-5" type="text"
        placeholder="Busca..." />
      <button @click="busca_ = ''" type="button" class="btn-close border align-self-center m-1"
        aria-label="Close"></button>
    </label>
    <div class="col-md-6 ">
      <span class="fs-4 mx-1"> Filtrar por: </span>
      <!-- <div class="btn-group btn-group-md-sm" role="group" aria-label="Basic checkbox toggle button group"> -->
      <!-- <input v-model="filtroConvenio" type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
        <label class="btn" :class="filtroConvenio ? 'btn-outline-success' : 'btn-outline-danger'" for="btncheck1">
          Atende convênio</label> -->
      <div class="form-check form-switch">
        <input class="form-check-input" v-model="filtroConvenio" type="checkbox" id="filtroConvenio">
        <label class="form-check-label" for="filtroConvenio">Atende convênio</label>
      </div>
      <div class="form-check form-switch">
        <input class="form-check-input" v-model="filtroOnline" type="checkbox" id="filtroOnline">
        <label class="form-check-label" for="filtroOnline">Atende online</label>
      </div>
      <div class="form-check form-switch">
        <input class="form-check-input" v-model="filtroSocial" type="checkbox" id="filtroSocial">
        <label class="form-check-label" for="filtroSocial">Possibilidade atendimento Social </label>
      </div>

      <!-- <input v-model="filtroOnline" type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
        <label class="btn" :class="filtroOnline ? 'btn-outline-success' : 'btn-outline-danger'"
          for="btncheck2">Atendimento online</label>

        <input v-model="filtroSocial" type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
        <label class="btn" :class="filtroSocial ? 'btn-outline-success' : 'btn-outline-danger'" for="btncheck3">
          Valor Social</label>
 -->
      <!-- </div> -->
    </div>
    <button @click="carregarLista()" type="button"
      class="btn btn-info border align-self-center m-1">Buscar/FIltrar</button>

  </div>
  <!-- <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->
  <main class=" container d-flex flex-wrap p-0  mx-auto align-items-center justify-content-center">
    <div v-if="carregando" class="text-center position-absolute top-50 start-50 translate-middle" style="z-index: 9;">
      <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <Card class="col-md-4 col-lg-3 m-1" v-for="psi in lista_de_psis" :psi_info="psi" :key="psi.col_posicao" />
  </main>

</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");
</style>
