<template>
  <main
    class="flex min-h-screen w-full flex-col items-center justify-center bg-orange-100"
    id="category"
  >
    <div class="fixed z-10 xs:left-5 xs:top-20 md:top-1 md:left-0 lg:left-4">
      <BackButton v-if="!backToAllFeatures && !backToFeatures" :to="`/`" />
      <BackButton v-if="backToAllFeatures" :to="`/allfeatures`" />
      <BackButton v-if="backToFeatures" :to="`/features`" />
    </div>
    <div
      class="mb-8 mt-24 flex flex-col gap-2 rounded-xl shadow-xl"
      id="mainDiv"
    >
      <header class="grid gap-2" id="mealHeader">
        <div id="headerFirstDiv" class="relative">
          <img
            :src="meal.meal.image"
            alt="Meal Picture"
            class="w-full"
            id="headerImg"
          />
          <i
            v-if="!addedToFavorites && !yourRecipe"
            class="pi pi-bookmark absolute right-5 top-5 text-6xl text-orange-500 transition duration-200 ease-in hover:scale-110"
            @click="addToFavorite"
          ></i>
          <i
            v-if="addedToFavorites && !yourRecipe"
            class="pi pi-bookmark-fill absolute right-5 top-5 text-6xl text-orange-500 transition duration-200 ease-in hover:scale-110"
            @click="deleteToFavorite"
          ></i>
        </div>
        <div
          class="flex flex-col items-center justify-center bg-white px-5 py-5 text-center"
          id="headerSecondDiv"
        >
          <p class="mealHeaderTitle mb-2 font-bold">{{ meal.meal.name }}</p>

          <p class="mealHeaderSubtitle font-semibold">
            Category:
            <span class="category italic" id="categoryId">{{
              meal.meal.category
            }}</span>
          </p>
          <p class="mealHeaderSubtitle font-semibold">
            Country:
            <span class="category italic" id="categoryId">{{
              meal.meal.country
            }}</span>
          </p>
        </div>
      </header>

      <section class="grid w-full gap-2" id="yourRecipesDiv">
        <article class="row-span-1 bg-white p-5">
          <p class="text-center text-3xl font-semibold">Ingredients</p>

          <p class="pt-2 indent-10">{{ meal.meal.ingredients }}</p>
        </article>
        <article class="rounded-b-xl bg-white p-5 text-justify">
          <p class="text-center text-3xl font-semibold">Instruction</p>
          <p class="pt-2 indent-10">{{ meal.meal.instructions }}</p>
        </article>
      </section>
    </div>

    <div
      v-if="deleteModal"
      class="margin-0 fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-white/10 backdrop-blur-[1px]"
    >
      <div
        class="flex h-72 min-w-80 flex-col items-center justify-center gap-10 rounded-xl border border-slate-300 bg-white px-5 text-center shadow-xl"
      >
        <p class="w-10/12 text-2xl">Do you want to delete this recipe?</p>
        <hr class="border border-black" />
        <div class="flex gap-10">
          <button
            class="h-10 w-24 rounded-md border-2 border-green-500 bg-green-500 text-white shadow-md transition duration-200 ease-in hover:scale-105 hover:bg-white hover:text-green-500"
            @click="deleteRecipe(meal.meal._id)"
          >
            Yes
          </button>
          <button
            @click="closeModal"
            class="h-10 w-24 rounded-md border-2 border-red-500 bg-red-500 text-white shadow-md transition duration-200 ease-in hover:scale-105 hover:bg-white hover:text-red-500"
          >
            No
          </button>
        </div>
      </div>
    </div>

    <div
      class="fixed bottom-20 right-3 flex flex-col gap-5"
      v-if="thisIsYourRecipe"
    >
      <RouterLink :to="`/updaterecipe?id=${meal.meal._id}&${query.backTo()}`">
        <i
          class="pi pi-pen-to-square crudButton rounded-full bg-green-500 py-3 px-4 text-2xl shadow-[0px_0px_4px_4px_rgba(0,0,0,0.3)] transition duration-200 ease-in hover:scale-125"
        ></i>
      </RouterLink>
      <i
        class="pi pi-trash crudButton rounded-full bg-red-500 py-3 px-4 text-2xl shadow-[0px_0px_4px_4px_rgba(0,0,0,0.3)] transition duration-200 ease-in hover:scale-125"
        @click="handleDelete"
      ></i>
    </div>
    <UpButton />
  </main>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import BackButton from "../BackButton.vue";
import UpButton from "../UpButton.vue";

const route = useRoute();
const router = useRouter();

const id = route.query.id;
const backToFeatures = route.query.features;
const backToAllFeatures = route.query.allfeatures;

const query = {
  features: "features=true",
  allfeatures: "allfeatures=true",
  backTo: function () {
    if (!backToFeatures && !backToAllFeatures) {
      return;
    } else if (backToFeatures && !backToAllFeatures) {
      return this.features;
    } else {
      return this.allfeatures;
    }
  },
};

const meal = reactive({
  meal: {},
});

const thisIsYourRecipe = ref(false);

const codename = localStorage.getItem("codename");

onMounted(async () => {
  try {
    const res = await axios.get(`/foodnouvaeu/api/${id}`);
    meal.meal = res.data;
  } catch (error) {
    console.error("Error: ", error);
  }

  if (meal.meal.poster === codename) {
    yourRecipe.value = !yourRecipe.value;
  }
  const favoritesData = JSON.parse(localStorage.getItem("favorites"));
  if (favoritesData.includes(meal.meal._id)) {
    addedToFavorites.value = !addedToFavorites.value;
  }

  if (codename == meal.meal.poster) {
    thisIsYourRecipe.value = !thisIsYourRecipe.value;
  }
});

const addedToFavorites = ref(false);
const yourRecipe = ref(false);

const addToFavorite = () => {
  const newArrayOfFavorites = [];
  newArrayOfFavorites.push(meal.meal._id);
  const oldArrayOfFavorites = JSON.parse(localStorage.getItem("favorites"));
  if (oldArrayOfFavorites === null) {
    localStorage.setItem("favorites", JSON.stringify(newArrayOfFavorites));
  } else {
    Array.from(oldArrayOfFavorites).forEach((element) => {
      newArrayOfFavorites.push(element);
    });
    localStorage.setItem("favorites", JSON.stringify(newArrayOfFavorites));
  }
  location.reload();
};

const deleteToFavorite = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const newFavorites = favorites.filter((id) => id != meal.meal._id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  location.reload();
};

const deleteModal = ref(false);

const deleteRecipe = async (id) => {
  try {
    const deleteRecipe = await axios.delete(`/foodnouvaeu/api/delete/${id}`);
    router.push("/features");
  } catch (error) {
    console.log("Error: ", error);
  }
};

const closeModal = () => {
  deleteModal.value = false;
};

const handleDelete = () => {
  deleteModal.value = true;
};
</script>
