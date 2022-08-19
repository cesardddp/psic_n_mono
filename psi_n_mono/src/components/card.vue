<script setup lang="ts">
import { ref, computed } from 'vue'
import { Psi } from "../psi_model";
import validUrl from "valid-url";

const props = defineProps<{ psi_info: Psi }>()
const redeSocial = computed(() => {

  if (validUrl.isUri(props.psi_info.redesSociais)) {
    if (props.psi_info.redesSociais.includes('instagram')) {
      let nick = props.psi_info.redesSociais.split('/')
      if (nick.at(-1) === "") nick.pop()
      return {
        rede: 'instagram',
        url: props.psi_info.redesSociais,
        nick: nick.at(-1)?.split('?').at(0)
      }
    }
    else if (props.psi_info.redesSociais.includes('facebook')) {
      return {
        rede: 'facebook',
        url: props.psi_info.redesSociais,

      }
    }
    else {
      return {
        rede: 'site',
        url: props.psi_info.redesSociais,
        nick: props.psi_info.redesSociais.split('.')[1]
      }
    }
  }
  else {
    let nick = props.psi_info.redesSociais
    nick = nick.substring(nick.indexOf('@') + 1).trim().split(" ")[0]
    if (nick.includes('/')) { nick = nick.split('/').at(-1) || nick }

    return {
      rede: 'instagram',
      url: 'https://instagram.com/' + nick,
      nick: nick
    }
    // }
  }
})
const ver_mais = ref(false)

// https://avatars.dicebear.com/api/:sprites/:seed.svg
// Replace :sprites with male, female, human, identicon, initials, bottts, avataaars, jdenticon, gridy or micah.
// The value of :seed can be anything you like - but don't use any sensitive or personal data here!
</script>

<template>
  <div class="card mb-3 p-0">
    <div class="row g-0">
      <div class="card-header d-flex mb-1 justify-content-between">
        <span class="card-text m-0">
          <small class="text-muted">Atende convênio?
            <p class="text-danger">{{ psi_info.atendeConvenio }}</p>
          </small>
        </span>


        <span v-if="psi_info.atendeADistancia" class="card-text m-0"><small class="text-info">Faz atendimento à
            distância
            (online)?
            <p class="bi bi-check-circle-fill text-success" v-if="psi_info.atendeADistancia === 'Sim'"> Sim</p>
            <p v-else class=" text-danger bi bi-x-circle-fill"> Não</p>
          </small></span>
        <span class="card-text m-0">
          <small
            :class="psi_info.possibilidadeAtendimentoSocial?.includes('Valor Social') ? 'text-success' : 'text-danger'">
            {{ psi_info.possibilidadeAtendimentoSocial }}
          </small>
        </span>
      </div>
      <!-- <div class="col-md-2">
        <img :src="`https://avatars.dicebear.com/api/gridy/${psi_info.nome}.svg`" width=50
          class="card-img-top img-fluid" alt="...">
      </div> -->
      <div class="col-md">
        <div class="card-body row">

          <h5 class="card-title">{{ psi_info.nome }}
            <p class="card-text fs-6"><small class="text-muted"><i class="bi bi-telephone"></i> {{
                psi_info.telefoneCelular
            }}</small> -
              <span v-if="psi_info.temWhatsapp?.toLowerCase() === 'sim'" class="card-text mx-1"><small
                  class="text-muted"><i class="bi bi-whatsapp text-success"></i>?
                  {{ psi_info.temWhatsapp }}</small></span>
            </p>
          </h5>
          <span v-show="!ver_mais" class="card-text">{{ psi_info.abordagemEspecialidades.substring(0, 150) }}...</span>
          <span v-show="ver_mais" class="card-text">{{ psi_info.abordagemEspecialidades }}</span>
          <span @click="ver_mais = !ver_mais" class="btn text-primary">{{ !ver_mais ? 'ver mais' : 'ver menos'
          }}</span>
          <!-- <p class="card-text text-truncate">{{ psi_info.abordagemEspecialidades }}</p> -->
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center card-footer text-muted">

        <p class="card-text my-0 mx-auto"><small class="text-muted">{{ psi_info.pronomes }}</small></p>

        <p v-if="psi_info.cidadeRegiaoAtendimento" class="card-text my-0 mx-auto"><small class="text-muted"><i
              class="bi bi-pin-map"> </i> {{ psi_info.cidadeRegiaoAtendimento }}</small></p>
        
        <!-- {{ psi_info.redesSociais || 'vazio' }} TESTE -->
        <p v-if="redeSocial?.rede === 'instagram' && psi_info.redesSociais" class="card-text my-0 mx-auto"><small
            class="text-muted">
            <a :href="redeSocial.url" class="btn btn-small fs-6 btn-instagram m-0 text-white">
              <i class="bi bi-instagram"></i>
              {{ redeSocial.nick }}
            </a>
          </small></p>

        <p v-else-if="redeSocial?.rede === 'site'" class="card-text mx-auto my-0"><small class="text-muted">
            <i class="bi bi-globe"></i>
            <a class="mx-1" :href="redeSocial.url"> {{ redeSocial.url }}</a>

          </small></p>
        <p v-else class="card-text mx-auto my-0"><small class="text-muted">
            {{ psi_info.redesSociais }}
          </small></p>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn-instagram {
  color: white;
  /* border-color: white; */
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  align-items: center;
  display: inline-block;
  /* transition-duration: 0.4s; */
  background: #f09433;
  background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
}
</style>
