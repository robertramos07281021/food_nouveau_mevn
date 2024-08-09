<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import axios from "axios";
import MealCard from "../MealCard.vue";
import UpButton from "../UpButton.vue";
import BackButton from "../BackButton.vue";

const route = useRoute();
const categoryQuery = route.query.c;
const categoryId = route.query.id;
const backButton = `backToCategory=category?c=${categoryQuery}&id=${categoryId}`;

const selectedCategory = reactive({
  meals: [],
});

const isQuery = ref(false);
if (categoryQuery && categoryId) {
  isQuery.value = true;
}

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://themealdb.com/api/json/v1/1/filter.php?c=${categoryQuery}`
    );
    selectedCategory.meals = res.data.meals;
  } catch (error) {
    console.error("Error: ", error);
  }
});

const category = reactive({
  category: {},
});

onMounted(async () => {
  try {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const selectedCat = res.data.categories.filter(
      (dataId) => dataId.idCategory === categoryId
    );
    category.category = selectedCat[0];
  } catch (error) {
    console.error("Error: ", error);
  }
});
</script>

<template>
  <div
    class="flex w-full flex-col items-center justify-center bg-orange-200/60 pb-10 pt-28 shadow-[0px_0px_4px_4px_rgba(212,212,216,0.5)]"
    v-if="isQuery"
    id="Home"
    @scroll="handleScrollTop"
  >
    <div class="mb-10 text-center">
      <img
        :src="`https://www.themealdb.com/images/category/${categoryQuery.toLowerCase()}.png`"
        alt="hello"
        class="mb-10 rounded-xl bg-white shadow-2xl"
        id="categoryViewImg"
      />
      <h1 class="sectorTitle font-black">
        {{ category.category.strCategory }}
      </h1>
    </div>
    <div class="absolute mb-5 pl-8" id="back_button">
      <BackButton to="/" />
    </div>
    <div class="homeSection rounded-xl bg-white shadow-xl">
      <p class="homeDescription px-10 pb-10 text-justify indent-6">
        {{ category.category.strCategoryDescription }}
      </p>
      <div class="randomMenuDiv flex flex-wrap justify-center">
        <MealCard
          v-for="meal in selectedCategory.meals"
          :key="meal.idMeal"
          :meal="meal"
          :forBack="backButton"
        />
      </div>
    </div>

    <UpButton />
  </div>

  <div
    v-else
    class="-z-10 flex h-screen flex-col items-center justify-center text-center"
  >
    <i class="pi pi-arrow-up mb-5 text-7xl text-yellow-500"></i>
    <h1 class="mb-4 text-6xl font-bold">404 Not Found</h1>
    <p class="mb-5 text-xl">This page does not exist</p>
    <RouterLink
      to="/"
      class="mt-4 rounded-md bg-green-700 px-3 py-2 text-white hover:bg-green-900"
      >Go Back</RouterLink
    >
  </div>
</template>
