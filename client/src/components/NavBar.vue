<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";

const menuBar = ref(false);
const menuBarBotton = ref(false);

const handleMenuBarToggle = () => {
  menuBar.value = !menuBar.value;
};

if (window.innerWidth <= 767) {
  menuBarBotton.value = !menuBar.value;
}
window.addEventListener("resize", function () {
  if (window.innerWidth <= 767) {
    menuBarBotton.value = true;
  } else {
    menuBarBotton.value = false;
  }
});
</script>

<template>
  <nav :class="[`navBar`, 'w-full']">
    <div class="navMenu z-50 w-full">
      <div class="navBarLogo z-50">
        <RouterLink to="/" class="myLogo">
          <span class="pr-2">Food</span>
          <span class="text-white">Nouveau</span>
        </RouterLink>
        <button v-if="menuBarBotton" @click="handleMenuBarToggle">
          <i v-if="!menuBar" class="pi pi-bars text-4xl"></i>
          <i v-else class="pi pi-times text-4xl"></i>
        </button>
      </div>
      <ul
        :class="[
          menuBar ? `max-[767px]:top-14` : `max-[767px]:-top-36`,
          `navUl`,
        ]"
      >
        <a href="/">
          <li>Home</li>
        </a>
        <a href="/recipes">
          <li>Recipes</li>
        </a>
        <a href="/features">
          <li>Features</li>
        </a>
        <a href="/addrecipes">
          <li>Add Recipes</li>
        </a>
      </ul>
    </div>
  </nav>
</template>
