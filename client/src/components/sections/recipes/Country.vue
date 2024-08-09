<template>
  <div class="lg:w-8/12 min-[320px]:w-full text-center">
    <div class="font-bold">
      <p>Here are some recipes from different countries around the world.</p>
      <p>Just click the flag below.</p>
    </div>

    <div class="flex w-full flex-wrap justify-center gap-4 py-5">
      <a
        :href="`/recipes?country=${country}&img=${country}`"
        v-for="(country, index) in countries"
        :key="index"
        class="countryFigure flex w-20 flex-col items-center hover:scale-125"
      >
        <img
          :src="`/assets/${country}.png`"
          :alt="`${country} Image`"
          class="h-8 w-12"
        />
        <p class="figCap"></p>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const countries = [
  "American",
  "British",
  "Canada",
  "Chinese",
  "Croatian",
  "Dutch",
  "Egyptian",
  "French",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Jamaican",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Philippines",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Tunisian",
  "Turkish",
  "Vietnamese",
];

onMounted(() => {
  const countryFigure = document.getElementsByClassName("countryFigure");
  const figCap = document.getElementsByClassName("figCap");
  Array.from(countryFigure).forEach((element, index) => {
    figCap[index].innerHTML = countries[index];
  });
});
</script>
