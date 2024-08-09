<script setup>
import { ref } from "vue";
const upMe = () => {
  window.scrollTo(0, 0);
};

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    scrollUp.value = true;
  } else {
    scrollUp.value = false;
  }
}

const scrollUp = ref(false);
</script>

<template>
  <button @click="upMe" v-if="scrollUp">
    <div
      class="upButton fixed flex items-center justify-center rounded-full bg-orange-500 shadow-[0px_0px_4px_4px_rgba(0,0,0,0.3)] transition duration-200 ease-in hover:scale-125"
    >
      <i class="pi pi-arrow-up"></i>
    </div>
  </button>
</template>
