<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import MenuSample from "../sections/recipes/MenuSample.vue";
import MealCard from "../MealCard.vue";
import Country from "../sections/recipes/Country.vue";
import CountrySelected from "../sections/recipes/CountrySelected.vue";
import { useRoute } from "vue-router";
import UpButton from "../UpButton.vue";

const route = useRoute();
const countryQuery = route.query.country;

const search = ref("");
const ifSearch = ref(false);
const searchMeal = reactive({
  meal: {},
});

const searchMenu = async () => {
  if (search.value !== "") {
    ifSearch.value = true;
  }
  if (ifSearch.value && search.value !== "") {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`
      );
      if (res.data.meals !== null) {
        searchMeal.meal = res.data.meals[0];
      } else {
        ifSearch.value = false;
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }
};

const cancelSearchMenu = () => {
  ifSearch.value = false;
  search.value = "";
};

const searchChange = () => {
  if (search.value === "") {
    ifSearch.value = false;
  }
};
</script>

<template>
  <main
    class="flex min-h-screen w-full flex-col items-center bg-orange-100 pt-16"
  >
    <header
      class="mt-5 flex flex-col items-center gap-5 p-5"
      id="recipesHeader"
    >
      <h1 class="welcomeMessage" id="recipesSearchMessage">
        Search Food Recipe
      </h1>
      <label class="relative flex rounded-xl shadow" id="headerLabel">
        <input
          type="text"
          name="search"
          id="search"
          class="h-10 w-full rounded-l-xl p-2"
          v-model="search"
          @change="searchChange"
        />
        <button
          @click="searchMenu"
          class="pi pi-search rounded-r-xl border bg-orange-500 px-3 text-lg hover:bg-orange-400"
        ></button>
        <a
          href="/recipes"
          v-if="search"
          @click="cancelSearchMenu"
          class="pi pi-times absolute right-12 top-2 rounded-r-xl px-3 text-base text-gray-500/50 hover:text-black"
        ></a>
      </label>
    </header>
    <hr class="my-5 border-2 border-black" />
    <section
      class="my-5 rounded-xl bg-white py-5 shadow-xl"
      id="recipesViewMainSection"
    >
      <MenuSample v-if="!ifSearch && !Boolean(countryQuery)" />
      <div v-if="ifSearch" class="flex w-full justify-center">
        <MealCard :meal="searchMeal.meal" :forBack="`back=true`" />
      </div>
      <CountrySelected v-if="Boolean(countryQuery) && !ifSearch" />
    </section>
    <Country />
    <UpButton />
  </main>
</template>

<script></script>
