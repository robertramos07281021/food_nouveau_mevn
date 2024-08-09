<script setup>
import MealCard from "../../MealCard.vue";
import { onMounted, reactive } from "vue";
import axios from "axios";

const randomMeal = reactive({
  meals: [],
});

onMounted(async () => {
  try {
    for (let i = 0; i < 4; i++) {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/random.php"
      );
      randomMeal.meals.push(response.data.meals[0]);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
});
function favorites(id) {
  if (localStorage.getItem("favorites") !== null) {
    const arrayFavorite = JSON.parse(localStorage.getItem("favorites"));
    return arrayFavorite.includes(id);
  }
}
</script>

<template>
  <div class="randomMenuDiv my-5 flex w-full flex-wrap justify-center">
    <MealCard
      v-for="meal in randomMeal.meals"
      :key="meal.idMeal"
      :meal="meal"
      :favorite="favorites(meal.idMeal)"
    />
  </div>
</template>
