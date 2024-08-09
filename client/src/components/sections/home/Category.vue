<script setup>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';

const categories = reactive({
  category: []
})
onMounted(async()=> {
  try {
    const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
    Array.from(response.data.categories).forEach((category)=> {
      categories.category.push(category);
    })
  } catch(error) {
    console.error('Error: ', error)
  }
})

</script>

<template>
 <div class="flex w-full justify-center mt-5 randomMenuDiv gap-5 flex-wrap" id="category">
  <div v-for="category in categories.category" :key="category.idCategory" class="hover:scale-110">
    <RouterLink :to="`/category?c=${category.strCategory}&id=${category.idCategory}`">
      <img :src="category.strCategoryThumb" alt="Category thumb" class=" border cursor-pointer rounded-md shadow-md bg-orange-300/50 hover:bg-orange-400 categoryThumb">
      <p class="text-center font-semibold categoryTitle">
        {{ category.strCategory }}
      </p>
    </RouterLink>
  </div>
</div>
</template>