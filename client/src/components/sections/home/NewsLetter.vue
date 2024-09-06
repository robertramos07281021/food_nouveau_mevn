<template>
  <div
    v-if="newsletter"
    class="bg-whtie fixed left-0 top-0 flex h-screen w-full items-center justify-center backdrop-blur-[1px] z-50"
  >
    <div
      class="flex h-96 flex-col rounded-xl shadow-2xl min-[320px]:w-full sm:w-7/12 lg:w-6/12 xl:w-4/12"
    >
      <div
        class="flex h-36 items-center justify-center rounded-t-xl border-b-4 border-black/20 bg-orange-500"
      >
        <div
          class="flex items-center gap-2 rounded-full bg-orange-200 px-4 py-1"
        >
          <img
            :src="`/assets/logo-spoon.png`"
            alt="logopic"
            class="min-[320px]:w-10 lg:w-14 xl:w-16"
          />
          <p
            class="welcomeMessage font-black drop-shadow-lg min-[320px]:text-xl lg:text-2xl xl:text-3xl"
          >
            Food <span class="text-white">Nouveau</span>
          </p>
          <img
            :src="`/assets/logo-spoon.png`"
            alt="logopic"
            class="min-[320px]:w-10 lg:w-14 xl:w-16"
          />
        </div>
      </div>
      <div
        class="flex h-full flex-col items-center justify-center gap-5 rounded-b-xl bg-white"
      >
        <p
          class="font-semibold xs:text-sm lg:text-base xl:text-lg text-center lg:px-10"
        >
          An email will be sent to you everyweek for more updates.
        </p>
        <form
          class="flex flex-col gap-10"
          @submit.prevent="handleSubmitEmail"
          novalidate
        >
          <label>
            <p
              v-if="existingEmail"
              class="pb-2 text-xs font-semibold text-red-500"
            >
              Email is already exist
            </p>
            <p v-if="noEmail" class="pb-2 text-xs font-semibold text-red-500">
              Email is required
            </p>
            <input
              type="text"
              class="w-60 rounded p-1 ring ring-orange-500 focus:outline-none"
              placeholder="Enter email address"
              required
              v-model="email"
            />
          </label>
          <div class="flex justify-center gap-5">
            <button
              class="w-24 rounded-md border-2 border-orange-500 bg-orange-500 py-2 font-black text-white shadow-md transition duration-200 hover:scale-110 hover:bg-white hover:text-orange-500"
            >
              Submit
            </button>
            <div
              @click="handleCloseNewsLetter"
              class="flex w-24 items-center justify-center rounded-md border-2 cursor-pointer border-gray-600 bg-gray-600 py-2 font-black text-white shadow-md transition duration-200 hover:scale-110 hover:bg-white hover:text-gray-600"
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const newsletter = ref(true);
const noEmail = ref(false);
const existingEmail = ref(false);

const handleSubmitEmail = async () => {
  const newEmail = {
    email: email.value,
  };

  try {
    const addEmail = await axios.post("/foodnouvaeu/api/addemail", newEmail);
    window.location.assign("/?thankyou=true&newsletter=false");
  } catch (error) {
    if (error.response.data.message == "no email") {
      noEmail.value = true;
      email.value = "";
    } else {
      noEmail.value = false;
    }
    if (error.response.data.message == "email exists.") {
      existingEmail.value = true;
      email.value = "";
    } else {
      existingEmail.value = false;
    }
  }
};
const handleCloseNewsLetter = () => {
  newsletter.value = !newsletter.value;
};
</script>
