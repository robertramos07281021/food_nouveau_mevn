<script setup>
import MealCard from "../../MealCard.vue";
import { onMounted, reactive } from "vue";
import axios from "axios";

const randomMeal = reactive({
  meals: [],
});

const forBack = `back=true`;

onMounted(async () => {
  try {
    for (let i = 0; i < 8; i++) {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/random.php"
      );
      randomMeal.meals.push(response.data.meals[0]);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
});
</script>

<template>
  <div class="randomMenuDiv my-5 flex w-full flex-wrap justify-center">
    <MealCard
      v-for="meal in randomMeal.meals"
      :key="meal.idMeal"
      :meal="meal"
      :forBack="forBack"
    />
  </div>
</template>
