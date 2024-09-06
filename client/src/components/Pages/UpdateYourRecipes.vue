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

const isUpdate = ref(false);

const handleUpdate = async () => {
  const newImage = ref(null);
  if (!formImage) {
    newImage.value = form.image;
  } else {
    newImage.value = formImage.value;
  }
  const updateRecipe = {
    name: form.name,
    country: form.country,
    category: form.category,
    ingredients: form.ingredients,
    instructions: form.instructions,
    image: newImage.value,
    poster: form.poster,
  };
  if (
    !form.name ||
    !form.country ||
    !form.category ||
    !form.ingredients ||
    !form.instructions
  ) {
    required.value = true;
  } else {
    required.value = false;
    if (Boolean(codename) && codename == form.poster) {
      try {
        isUpdate.value = true;
        const update = await axios.patch(
          `/foodnouvaeu/api/update/${recipeId}`,
          updateRecipe,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        router.push(`/yourrecipe?id=${recipeId}&${query.backTo()}`);
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
  <div
    class="fixed w-screen h-screen bg-white top-0 left-0 flex items-center justify-center"
    v-show="isUpdate"
  >
    <i
      class="bi bi-egg-fried text-5xl absolute text-orange-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 after:animate-spin-slow after:absolute after:border-8 after:w-20 after:h-20 after:left-0 after:top-0 px-4 pt-3 after:rounded-full after:border-dotted after:border-orange-500"
    ></i>
  </div>

  <main
    class="flex lg:min-h-screen w-full xs:pt-28 m:pt-0 items-center justify-center bg-orange-100"
  >
    <div class="fixed z-10 xs:left-5 xs:top-20 md:top-1 md:left-0 lg:left-4">
      <BackButton :to="`/yourrecipe?id=${recipeId}&${query.backTo()}`" />
    </div>
    <section
      class="xs:my-10 md:my-16 lg:my-0 lg:mb-10 rounded-xl xs:w-full lg:w-5/12 2xl:w-4/12 bg-white shadow-xl"
    >
      <form class="p-5 w-full" @submit.prevent="handleUpdate" novalidate>
        <fieldset
          class="flex flex-col w-full gap-2 rounded-md border-2 border-orange-500 px-3 py-5"
        >
          <legend class="welcomeMessage">Your Recipe</legend>
          <p v-show="required" class="text-end text-xs text-red-500">
            All fields are required. Except image.
          </p>
          <label class="w-full">
            <p>Recipe Name:</p>
            <input type="text" required v-model="form.name" />
          </label>
          <label class="w-full">
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

          <label class="w-full">
            <p>Image URL:</p>

            <p
              class="border-2 rounded border-black p-2 mb-2 xs:w-[322px] md:w-full lg:w-[466px] 2xl:w-[459px] overflow-hidden text-wrap truncate"
            >
              {{ form.image }}
            </p>
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
