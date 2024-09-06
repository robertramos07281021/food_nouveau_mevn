<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isFeatures = ref(false);

onMounted(() => {
  if (route.path === "/features") isFeatures.value = !isFeatures.true;
});

const props = defineProps({
  meal: Object,
  forBack: String,
});

function favorites(id) {
  if (localStorage.getItem("favorites") !== null) {
    const arrayFavorite = JSON.parse(localStorage.getItem("favorites"));
    return arrayFavorite.includes(id);
  }
}
</script>

<template>
  <div
    class="xs:w-44 xs:h-72 md:w-80 md:h-[450px] lg:h-[350px] lg:w-56 relative flex flex-col justify-between rounded text-center shadow-[0px_0px_4px_4px_rgba(212,212,216,0.5)] lg:hover:scale-[1.01] duration-200 transition ease-out lg:hover:shadow-orange-500 lg:hover:shadow-xl lg:hover:skew-x-1 lg:hover:-skew-y-1"
  >
    <i
      class="pi pi-bookmark-fill absolute right-2 top-2 text-4xl text-orange-600"
      v-show="favorites(meal._id) && !isFeatures"
    ></i>
    <img :src="meal.image" alt="mealImage" class="rounded-t border-b h-full" />
    <p class="flex items-center h-28 justify-center px-3 font-semibold">
      {{ meal.name }}
    </p>
    <RouterLink :to="`/yourrecipe?id=${meal._id}&${forBack}`">
      <button
        class="easy-in randomMenuButton w-full rounded-md border-2 border-white bg-orange-500 font-bold text-white shadow-md transition duration-300 hover:border-orange-500 hover:bg-white hover:text-orange-500 py-3"
      >
        Read More
      </button>
    </RouterLink>
  </div>
</template>
