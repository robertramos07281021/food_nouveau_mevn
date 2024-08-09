<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import YourRecipeCard from "../../YourRecipeCard.vue";

const yourRecipes = reactive({
  meals: [],
});

const empty = ref(true);

onMounted(async () => {
  const poster = localStorage.getItem("codename");
  try {
    const res = await axios.get(`/foodnouvaeu/api?poster=${poster}`);
    yourRecipes.meals = res.data.recipes;
    if (res.data.recipes.length > 0) {
      empty.value = !empty.value;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});
</script>
<template>
  <section class="rounded-b-xl bg-white py-10 shadow-xl">
    <h1 class="sectorTitle pb-5 text-center">Your Recipes</h1>
    <div class="gapSize flex flex-wrap justify-center">
      <YourRecipeCard
        v-for="meal in yourRecipes.meals"
        :meal="meal"
        :keys="meal._id"
        forBack="features=true"
      />
    </div>
    <div v-if="empty" class="flex min-h-[50vh] items-center justify-center">
      <p class="text-center text-3xl">No new recipes added.</p>
    </div>
  </section>
</template>
