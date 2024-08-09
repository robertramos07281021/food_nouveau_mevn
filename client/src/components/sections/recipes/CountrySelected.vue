<template>
  <div>
    <div class="flex flex-col items-center gap-5">
      <p class="welcomeMessage text-4xl">{{ countrySelected }}</p>
      <img
        :src="`/assets/${countryImg}.png`"
        alt="Country Image"
        class="h-32 w-52"
      />
    </div>
    <div class="gapSize flex flex-wrap justify-center pt-10">
      <MealCard
        v-for="meal in selected.country"
        :key="meal.idMeal"
        :meal="meal"
        for-back="back=true"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import axios from "axios";
import MealCard from "../../MealCard.vue";

const selected = reactive({
  country: [],
});

onMounted(async () => {
  try {
    if (countrySelected === "Philippines") {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=Filipino`
      );
      selected.country = res.data.meals;
    } else if (countrySelected === "Canada") {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=canadian`
      );
      selected.country = res.data.meals;
    } else if (countrySelected === "Italian") {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=italian`
      );
      selected.country = res.data.meals;
    } else {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countrySelected}`
      );
      selected.country = res.data.meals;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
});
const route = useRoute();
const countrySelected = route.query.country;
const countryImg = route.query.img;
</script>
