<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  to: {
    type: String,
    default: "/",
  },
});
</script>

<template>
  <RouterLink :to="to">
    <div
      class="backButton flex items-center justify-center rounded-full bg-orange-500 transition duration-200 ease-in hover:scale-125"
    >
      <i class="pi pi-arrow-left"></i>
    </div>
  </RouterLink>
</template>
