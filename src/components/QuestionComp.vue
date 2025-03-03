<template>
  <!--  <div v-for="(pokemon, index) in pokeList" :key="index">
    {{ pokemon.name }} <br>
  </div> -->
  <div class="bg-red p-12 rounded-lg shadow-md shadow-[#385aa7] w-full lg:mt-4">
    <div v-if="pokeIndex < pokeList.length">
      <template
        v-for="(answer, index) in pokeList[pokeIndex]['answers']"
        :key="index"
      >
        <PokeImgComp
          v-show="index === 0"
          :pokeIndex="
            pokeList[pokeIndex].answers[pokeList[pokeIndex].correctAnswer]
              .index + 1
          "
          :imgHidden="hideImage"
        ></PokeImgComp>
        <!-- SECCION DE PREGUNTAS -->
        <label
          :for="index"
          class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-2xl w-3/4 text-center mx-auto"
          :class="{
            'text-white': selectedAnswer == -1,
            'text-black': selectedAnswer != -1,
            'hover:bg-gray-100 hover:text-[#385aa7] cursor-pointer':
              selectedAnswer == -1,
            'bg-red-200 text-[#000]':
              selectedAnswer == index &&
              index != pokeList[pokeIndex]['correctAnswer'],
            'bg-green-200 text-[#000]':
              index == pokeList[pokeIndex]['correctAnswer'] &&
              selectedAnswer != -1,
          }"
        >
          <input
            type="radio"
            class="hidden"
            :id="index"
            :value="index"
            @change="answered($event)"
            :disabled="selectedAnswer != -1"
            :checked="selectedAnswer != -1"
          />
          {{ answer.name }} <br />
        </label>
      </template>
      <ButtonComp
        v-show="selectedAnswer != ''"
        v-if="pokeIndex == pokeList.length - 1"
        @click="showResults()"
        > <span class="text-white font-bold">Mostrar resultados</span>
      </ButtonComp>

      <!-- v-show="selectedAnswer != -1"-->
      <ButtonComp
        v-else
        @click="nextQuestion(selectedAnswer)"
        v-model="hideImage"
        :btnClass="selectedAnswer != -1 ? 'bg-green-500' : 'bg-red-500'"
        >{{
          selectedAnswer != -1
            ? "Siguiente &gt;"
            : "Elige una opción para seguir"
        }}
      </ButtonComp>
    </div>
    <div v-else class="bg-white p-10">
      <h1 class="text-2xl">Resultados</h1>
      <div class="flex justify-start space-x-4 mt-6">
        <p>
          Respuestas correctas:
          <span class="text-2xl text-green-700">{{ countCorrect }}</span> /<span
            class="text-2xl text-red-500"
            >{{ pokeList.length }}</span
          >
        </p>
      </div>
      <ButtonComp @click="resetQuiz()"><span class="text-blue-900 font-bold">Jugar de nuevo</span></ButtonComp>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import PokeService from "../services/PokeService";
import ButtonComp from "../components/ButtonComp.vue";
import PokeImgComp from "./PokeImgComp.vue";

export default {
  name: "QuestionComp",
  components: { ButtonComp, PokeImgComp },
  data() {
    const service = new PokeService();
    const pokeList = service.getPokeList();
    let pokeIndex = 0;
    let selectedAnswer = -1;
    let plusNext = ref(1);
    let hideImage = ref(true);
    let countCorrect = ref(0);

    return {
      service,
      pokeList,
      pokeIndex,
      selectedAnswer,
      plusNext,
      hideImage,
      countCorrect,
    };
  },
  methods: {
    answered(evt) {
      this.selectedAnswer = evt.target.value;
      evt.target.value = null; //debemos reiniciar el evento sino se guardan
      if (
        this.selectedAnswer == this.pokeList[this.pokeIndex]["correctAnswer"]
      ) {
        this.countCorrect++;
        //console.log("count", this.countCorrect);
      }
      //console.log("La respuesta seleccionada es: ", this.selectedAnswer);
      this.hideImage = false;
    },
    nextQuestion(selectedA) {
      if (selectedA != -1) {
        this.pokeIndex++;
        this.selectedAnswer = -1;
        this.plusNext = this.plusNext + 3;
        this.hideImage = true;
      }
    },
    resetQuiz() {
      this.pokeIndex = 0;
      this.selectedAnswer = -1;
      this.plusNext = ref(1);
      this.hideImage = ref(true);
      this.countCorrect = ref(0);
      window.location.reload();
    },
    showResults() {
      this.pokeIndex++;
    },
  },
  async beforeMount() {
    await this.service.fetchData();
  },
};
</script>

<style scoped>
.bg-questions {
  background-color: rgba(0, 0, 0, 0);
}
</style>
