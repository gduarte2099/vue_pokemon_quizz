<template>
  <div class="sm:flex justify-center">
    <div class="pokemon-wrapper">
      <img v-if="imgHidden" class="poke-img img-hidden" :src="imgUrl" alt="" />

      <img v-else class="poke-img" :src="imgUrl" alt="" />
      <img
        class="poke-bg-sparks"
        src="../assets/img/circle-spikes.8b29c12a.png"
        alt=""
      />
    </div>

    <img
      class="pokemon-question"
      src="../assets/img/qssp.aa4be5dd.png"
      alt=""
    />
  </div>
</template>

<script>
//import { ref } from "vue";
//import PokeService from "../services/PokeService.js";

export default {
  name: "PokeImg",
  props: { pokeIndex: Number, imgHidden: Boolean },
  //usar metodos para links de imagenes puede tardar mucho tiempo, asi que usamos computed que es mas rapido
  computed: {
    imgUrl() {
      return (
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +
        this.pokeIndex +
        ".svg"
      );
    },

    //console.log(this.pokeIndex);
  },
  /*beforeMount() {
    //await this.service.fetchDataByIndex(this.pokeIndex);
    this.url =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +
      this.pokeIndex +
      ".svg";
    console.log("el valor recibido es: " + this.pokeIndex);
  },*/
};
</script>

<style scoped>
.pokemon-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
}

.poke-img {
  width: 200px;
  max-height: 200px;
  z-index: 2;
}

.poke-bg-sparks {
  width: 420px;
  margin-left: -270px;
  z-index: 1;
}

.pokemon-question {
  width: 380px;
  object-fit: contain;
}

.img-hidden {
  filter: invert(90%) sepia(45%) saturate(981%) hue-rotate(359deg)
    brightness(5%) contrast(104%);
}

@media screen and (max-width: 400px) {

  .poke-img {
    max-width: 125px;
  }

  .poke-bg-sparks {
    margin-left: -200px;
  }

  .pokemon-question {
    width: 200px;
    justify-self: center;
  }
}
</style>
