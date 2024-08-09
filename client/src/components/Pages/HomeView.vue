<template>
  <main class="flex flex-col items-center bg-orange-100 pt-16" id="Main">
    <section class="mt-10 flex flex-col text-center">
      <div class="flex flex-row items-center">
        <img
          :src="`/assets/logo-spoon.png`"
          alt="MyPicture"
          class="logoImage"
        />
        <p class="homeWelcome pt-5">
          Welcome to <span class="welcomeMessage font-black">Food</span>
          <span class="welcomeMessage text-orange-500">Nouveau</span>
        </p>
        <img
          :src="`/assets/logo-spoon.png`"
          alt="MyPicture"
          class="logoImage"
        />
      </div>
      <p class="homeDescription font-semibold">
        We serve you a lot of Recipe here at our website.
      </p>
      <p class="homeDescription font-semibold">
        We preferred also a lot of recipes around the world.
      </p>
    </section>
    <hr class="my-10 border-2 border-black" />

    <section
      class="homeSection mb-10 flex flex-col items-center rounded-xl bg-white shadow-xl"
    >
      <h1 class="sectorTitle text-center">Sample Recipe</h1>
      <SampleRecipe />

      <hr class="my-10 border-2 border-black" />

      <h1 class="sectorTitle text-center">Featured Recipes</h1>
      <Features :limit="4" />

      <hr class="my-10 border-2 border-black" />

      <h1 class="sectorTitle text-center">Categories</h1>
      <Category />
    </section>
  </main>
  <ThankYouMessage v-show="thankYouMessage" />
  <NewsLetter v-show="!newsletter" />
  <EmailError v-show="errorExist" :close="handleCloseError" />
</template>

<script setup>
import SampleRecipe from "../sections/home/SampleRecipe.vue";
import Category from "../sections/home/Category.vue";
import Features from "../sections/home/Features.vue";
import NewsLetter from "../sections/home/NewsLetter.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ThankYouMessage from "../sections/home/ThankYouMessage.vue";
import EmailError from "../sections/home/EmailError.vue";

const route = useRoute();
const router = useRouter();
const thankYouQuery = route.query.thankyou;
const newsletter = route.query.newsletter;
const error = route.query.error;

const thankYouMessage = ref(false);
const errorExist = ref(false);

const handleCloseError = () => {
  errorExist.value = false;
  router.push("/");
};

onMounted(() => {
  if (thankYouQuery) {
    thankYouMessage.value = !thankYouMessage.value;
  }
  if (error) {
    errorExist.value = !errorExist.value;
  }
});
</script>
