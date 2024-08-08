<template>
  <div class="flex w-full h-screen justify-center items-center" id="main">
    <div class="w-full max-w-6xl">
<!--       <img class="pokemon-question" src="./assets/img/qssp.aa4be5dd.png" alt="">
 -->      <!-- <h1 class="font-bold text-5xl text-center text-indigo-700">
        Quien es ese pokemon?
      </h1> -->
      <QuestionComp></QuestionComp>
    </div>
  </div>
</template>

<script setup>
import QuestionComp from "./components/QuestionComp.vue";
</script>

<style>
body{
  background-color: #db222a;
}


</style>
