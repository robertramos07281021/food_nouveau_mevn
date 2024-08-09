<template>
  <div class="fixed left-0 top-14 flex h-20 w-full justify-end p-3">
    <div
      class="flex h-full w-full items-center justify-between rounded-md bg-orange-300 p-4 font-bold ring-4 ring-inset ring-orange-500 min-[320px]:w-full lg:w-3/12"
    >
      <p class="">Email is already exist!</p>
      <i
        @click="close"
        class="pi pi-times rounded-xl border-2 border-orange-500 bg-orange-200 p-2 font-bold"
      ></i>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  close: Function,
});
</script>
