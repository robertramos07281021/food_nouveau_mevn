<template>
  <section class="paddingSize rounded-t-xl bg-white py-10 shadow-xl">
    <h1 class="sectorTitle pb-5 text-center">Favorites</h1>
    <div class="gapSize flex flex-wrap justify-center">
      <MealCard
        v-for="meal in meals.meals"
        :key="meal.idMeal"
        :meal="meal"
        :forBack="'features=true'"
      />
      <YourRecipeCard
        v-for="meal in mealsApi.mealApi"
        :key="meal._id"
        :meal="meal"
        forBack="features=true"
      />
    </div>
    <div v-if="empty" class="flex min-h-[50vh] items-center justify-center">
      <p class="text-center text-3xl">No favorites added.</p>
    </div>
  </section>
</template>

<script setup>
import MealCard from "../../MealCard.vue";
import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import YourRecipeCard from "../../YourRecipeCard.vue";
const meals = reactive({
  meals: [],
});

const mealsApi = reactive({
  mealApi: [],
});

const empty = ref(true);

const favorites = JSON.parse(localStorage.getItem("favorites"));
onMounted(() => {
  try {
    Array.from(favorites).forEach(async (element) => {
      if (element.length <= 5) {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element}`
        );
        meals.meals.push(res.data.meals[0]);
      } else {
        const res = await axios.get(`/foodnouvaeu/api/${element}`);
        mealsApi.mealApi.push(res.data);
      }
    });
    if (favorites.length > 0) {
      empty.value = !empty.value;
    }
  } catch (error) {
    console.error("Error", error);
  }
});
</script>
