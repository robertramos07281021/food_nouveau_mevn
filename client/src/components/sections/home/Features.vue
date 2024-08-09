<template>
  <div class="randomMenuDiv my-5 flex w-full flex-wrap justify-center">
    <YourRecipeCard
      v-for="meal in features.meals.slice(0, limit || features.meals.length)"
      :key="meal"
      :meal="meal"
    />
  </div>
  <RouterLink
    :to="`/allfeatures`"
    v-if="showButton"
    class="mt-2 rounded-xl border-2 border-orange-500 bg-white px-4 py-2 font-semibold text-orange-500 shadow-lg transition duration-200 hover:scale-105 hover:bg-orange-500 hover:text-white"
  >
    All Features Recipes
  </RouterLink>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted, ref, watch } from "vue";
import YourRecipeCard from "../../YourRecipeCard.vue";
import { RouterLink } from "vue-router";

defineProps({
  limit: Number,
});

const showButton = ref(false);

const features = reactive({
  meals: [],
});

onMounted(async () => {
  try {
    const res = await axios.get("/foodnouvaeu/api");
    features.meals = res.data.recipes;
  } catch (error) {
    console.error("Error: ", error);
  }
  if (features.meals.length > 4) {
    showButton.value = !showButton.value;
  }
});
</script>
