<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import UpButton from "../UpButton.vue";

const router = useRouter();

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
const codename = ref(false);
const poster = ref("");

onMounted(() => {
  if (Boolean(localStorage.getItem("codename"))) {
    poster.value = localStorage.getItem("codename");
    codename.value = true;
  } else {
    codename.value = false;
  }
});

const formData = reactive({
  name: "",
  country: "",
  categories: "",
  ingredients: "",
  instructions: "",
  image: "",
  poster: "",
});

const allRequired = ref(false);

function uploadFile(event) {
  formData.image = event.target.files[0];
}

const handleSubmit = async () => {
  if (
    !formData.name ||
    !formData.country ||
    !formData.categories ||
    !formData.ingredients ||
    !formData.instructions ||
    !formData.image ||
    !formData.poster
  ) {
    allRequired.value = true;
  } else {
    allRequired.value = false;
  }

  if (!codename.value) {
    try {
      const res = await axios
        .post(
          "/foodnouvaeu/api/add",
          {
            name: formData.name,
            country: formData.country,
            category: formData.categories,
            ingredients: formData.ingredients,
            instructions: formData.instructions,
            image: formData.image,
            poster: formData.poster,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      localStorage.setItem("codename", formData.poster);
      router.push("/features");
    } catch (error) {
      console.error("Error: ", error);
    }
  } else {
    try {
      const res = await axios
        .post(
          "/foodnouvaeu/api/add",
          {
            name: formData.name,
            country: formData.country,
            category: formData.categories,
            ingredients: formData.ingredients,
            instructions: formData.instructions,
            image: formData.image,
            poster: poster.value,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      router.push("/features");
    } catch (error) {
      console.error("Error: ", error);
    }
  }
};
</script>

<template>
  <main
    class="flex min-[320px]:pt-20 md:h-screen lg:h-auto items-center justify-center bg-orange-100"
  >
    <section class="mb-4 rounded-xl bg-white shadow-xl" id="addRecipes">
      <form
        class="p-5"
        @submit.prevent="handleSubmit"
        enctype="multipart/form-data"
      >
        <fieldset
          class="flex flex-col gap-2 rounded-md border-2 border-orange-500 px-3 py-5"
        >
          <legend class="welcomeMessage min-[320px]:text-3xl">
            Your Recipe
          </legend>
          <p class="text-end text-red-500" v-if="allRequired">
            All fields are required.
          </p>
          <label>
            <p>Recipe Name:</p>
            <input type="text" required v-model="formData.name" />
          </label>
          <label>
            <p>Country:</p>
            <input type="text" required v-model="formData.country" />
          </label>
          <label>
            <p>Category:</p>
            <select required v-model="formData.categories">
              <option value="">Select categories</option>
              <option
                :value="category"
                v-for="category in categories"
                :key="category"
              >
                {{ category }}
              </option>
            </select>
          </label>
          <label>
            <p>Ingredients:</p>
            <textarea
              rows="5"
              cols="50"
              required
              v-model="formData.ingredients"
            ></textarea>
          </label>
          <label>
            <p>Instructions:</p>
            <textarea
              rows="5"
              cols="50"
              required
              v-model="formData.instructions"
            ></textarea>
          </label>
          <label v-if="!codename">
            <p>Your Codename:</p>
            <input type="text" required v-model="formData.poster" />
          </label>
          <label>
            <p>Image URL:</p>
            <input type="file" accept="image/*" required @input="uploadFile" />
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
