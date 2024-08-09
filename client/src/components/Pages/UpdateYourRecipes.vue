<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { reactive, onMounted, ref } from "vue";
import UpButton from "../UpButton.vue";
import BackButton from "../BackButton.vue";

const route = useRoute();
const router = useRouter();
const recipeId = route.query.id;

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

const form = reactive({
  name: "",
  country: "",
  category: "",
  ingredients: "",
  instructions: "",
  image: "",
  poster: "",
});

const categories = [
  "beef",
  "chicken",
  "dessert",
  "lamb",
  "miscellaneous",
  "pasta",
  "pork",
  "seafood",
  "side",
  "starter",
  "vegan",
  "vegetarian",
  "breakfast",
  "goat",
];

onMounted(async () => {
  try {
    const res = await axios.get(`/foodnouvaeu/api/${recipeId}`);
    meal.meal = res.data;
    form.name = meal.meal.name;
    form.country = meal.meal.country;
    form.category = meal.meal.category;
    form.ingredients = meal.meal.ingredients;
    form.instructions = meal.meal.instructions;
    form.image = meal.meal.image;
    form.poster = meal.meal.poster;
  } catch (error) {
    console.log(error);
  }
  if (codename != form.poster) {
    router.push("/");
  }
});

const formImage = ref(null);

function uploadFile(event) {
  formImage.value = event.target.files[0];
}
const codename = localStorage.getItem("codename");
const required = ref(false);

const handleUpdate = async () => {
  const updateRecipe = {
    name: form.name,
    country: form.country,
    category: form.category,
    ingredients: form.ingredients,
    instructions: form.instructions,
    image: formImage.value,
    poster: form.poster,
  };

  if (
    !form.name ||
    !form.country ||
    !form.category ||
    !form.ingredients ||
    !form.instructions ||
    !form.image
  ) {
    required.value = true;
  } else {
    required.value = false;
    if (Boolean(codename) && codename == form.poster) {
      try {
        const update = await axios.patch(
          `/foodnouvaeu/api/update/${recipeId}`,
          updateRecipe,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        router.push(`/yourrecipe/${recipeId}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/features?error=true");
    }
  }
};
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-orange-100">
    <div class="updateBackButton z-10 mb-5 pl-8">
      <BackButton :to="`/yourrecipe?id=${recipeId}?${query.backTo()}`" />
    </div>
    <section
      class="mb-4 mt-20 min-h-[600px] rounded-xl bg-white shadow-xl"
      id="addRecipes"
    >
      <form class="p-5" @submit.prevent="handleUpdate">
        <fieldset
          class="flex flex-col gap-2 rounded-md border-2 border-orange-500 px-3 py-5"
        >
          <legend class="welcomeMessage">Your Recipe</legend>
          <p class="text-end text-red-500" v-if="required">
            All fields are required.
          </p>
          <label>
            <p>Recipe Name:</p>
            <input type="text" required v-model="form.name" />
          </label>
          <label>
            <p>Country:</p>
            <input type="text" required v-model="form.country" />
          </label>
          <label>
            <p>Category:</p>
            <select required v-model="form.category">
              <option value="">Select categories</option>
              <option
                :value="category"
                v-for="category in categories"
                :key="category"
              >
                {{ category.toUpperCase() }}
              </option>
            </select>
          </label>
          <label>
            <p>Ingredients:</p>
            <textarea
              rows="5"
              cols="50"
              required
              v-model="form.ingredients"
            ></textarea>
          </label>
          <label>
            <p>Instructions:</p>
            <textarea
              rows="5"
              cols="50"
              required
              v-model="form.instructions"
            ></textarea>
          </label>

          <label>
            <p>Image URL:</p>

            <pre class="border-2 border-black p-2 rounded-md mb-2">{{
              form.image
            }}</pre>
            <input type="file" @input="uploadFile" />
          </label>
          <button
            class="mt-5 w-full rounded-md border-2 border-orange-500 bg-orange-500 py-3 font-bold text-white transition duration-200 ease-in hover:bg-orange-200 hover:text-orange-500"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </section>
    <UpButton />
  </main>
</template>
