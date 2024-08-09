<template>
  <main class="w-full flex flex-col items-center justify-center bg-orange-100" id="category" >
    <div class=" mb-5 pl-8 absolute z-10" id="back_button">
      <BackButton v-if="backToCategory && !backToRecipe && !backToFeatures" :to="`${backToCategory}&id=${categoryId}`"/>
      <BackButton v-if="!backToCategory && !backToRecipe && !backToFeatures" :to="`/`"/>
      <BackButton v-if="!backToCategory && backToRecipe && !backToFeatures" :to="`/recipes`"/>
      <BackButton v-if="!backToCategory && !backToRecipe && backToFeatures" :to="`/features`"/>
    </div>
    <div class=" mt-24 mb-8 rounded-xl flex flex-col gap-2 shadow-xl" id="mainDiv">
   
      <!----------------------------------------------------------- bun -->
      <header class="grid gap-2" id="mealHeader">
        <div id="headerFirstDiv" class="relative">
          <img :src="meal.meal.strMealThumb" alt="Meal Picture" class=" w-full " id="headerImg">
          <i v-if="!addedToFavorites" class="pi pi-bookmark absolute top-5 right-5 text-orange-500 text-6xl hover:scale-110 duration-200 transition ease-in " @click="addToFavorite"></i>
          <i v-else class="pi pi-bookmark-fill absolute top-5 right-5 text-orange-500 text-6xl hover:scale-110 duration-200 transition ease-in  " @click="deleteToFavorite"></i>
        </div>
        <div class="flex items-center flex-col justify-center px-5 text-center bg-white py-5 " id="headerSecondDiv">
          <p class="mb-2 font-bold mealHeaderTitle">{{ meal.meal.strMeal }}</p>
          <p class="font-semibold mealHeaderSubtitle">Style: <span class="italic">{{ meal.meal.strArea }}</span></p>
          <p class="font-semibold mealHeaderSubtitle">Category: <span class="italic category" id="categoryId">{{ meal.meal.strCategory }}</span></p>
        </div>
      </header>

      <section class=" w-full grid gap-2" id="mealSection"> 
        <article class=" bg-white p-5 row-span-1">
          <p class="text-3xl text-center font-semibold">
            Ingredients
          </p>
          <ul class="pl-10 pt-2 ">
            <li v-for="(ingredient, index) in ingredients.ingredient" :key="index">
              <i v-if="meal.meal[ingredient] !== '' && meal.meal[ingredient] !== null" class="pi pi-circle-fill text-[10px] pr-2"></i>
              {{ meal.meal[ingredient] }} <span v-if="meal.meal[ingredient] !== '' && meal.meal[ingredient] !== null ">-</span> {{ meal.meal[measures.measure[index]] }}
              </li>
          </ul>
        </article>
        <article class="text-justify p-5 bg-white  ">
          <p class="text-3xl text-center font-semibold ">
            Instruction
          </p>
          <p class="indent-10 pt-2">{{ meal.meal.strInstructions }}
          </p>
        </article>
      </section>
      <section class="bg-white p-5 flex flex-wrap">
        <p id="sourceLink">
          <span class="font-bold">Source: </span>
          <p v-if="!Boolean(meal.meal.strSource)">Not Available</p>
          <a v-else :href="meal.meal.strSource" class="hover:text-blue-500 italic text-justify" target="_blank">
            {{meal.meal.strSource}}
          </a>
        </p>
      </section>
      <section class="bg-white p-5 rounded-b-xl ">
        <iframe class="w-full h-[500px]" :src="`https://www.youtube.com/embed/${youtube}`"  allowfullscreen></iframe>
      </section>
      <!----------------------------------------------------------- bun -->
      
    </div>
    <UpButton/>
  </main>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue'
import {useRoute} from 'vue-router'
import BackButton from '../BackButton.vue'
import UpButton from '../UpButton.vue';

const route = useRoute();
const queryMeal = route.query.meal
const backToCategory = route.query.backToCategory
const categoryId = route.fullPath.slice(route.fullPath.indexOf('d=')+2,route.fullPath.length)
const backToRecipe = route.query.back
const backToFeatures = route.query.features

const meal = reactive({
  meal: {}
})
const ingredients = reactive({
  ingredient: []
})
const measures = reactive({
  measure: []
})

const addedToFavorites = ref(false)
const youtube = ref('')


onMounted(async() => {
  try {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queryMeal}`)
    meal.meal = res.data.meals[0]
    youtube.value = res.data.meals[0].strYoutube.slice(res.data.meals[0].strYoutube.indexOf('v=')+2, res.data.meals[0].strYoutube.length)
  } catch (error) {
    console.error('Error: ', error)
  } 
  const keysIngredients = Object.keys(meal.meal)
  Array.from(keysIngredients).forEach(ingredient => {
    if(ingredient.includes('strIngredient')) {
      ingredients.ingredient.push(ingredient)
    }
    if(ingredient.includes('strMeasure')) {
      measures.measure.push(ingredient)
    }
  })

  window.scrollTo(0,0)
  const favoritesData =  JSON.parse(localStorage.getItem('favorites'))
  if(favoritesData.includes(meal.meal.idMeal)) {
    addedToFavorites.value = !addedToFavorites.value
  }
})

const addToFavorite = () => {
  const newArrayOfFavorites = [];
  newArrayOfFavorites.push(meal.meal.idMeal)
  const oldArrayOfFavorites = JSON.parse(localStorage.getItem('favorites'))
  if(oldArrayOfFavorites === null) {
  localStorage.setItem('favorites',JSON.stringify(newArrayOfFavorites))
  } else {
    Array.from(oldArrayOfFavorites).forEach(element => {
      newArrayOfFavorites.push(element)
    })
    localStorage.setItem('favorites',JSON.stringify(newArrayOfFavorites))
  }
  location.reload()
}

const deleteToFavorite = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  const newFavorites = favorites.filter((id) => id != meal.meal.idMeal)
  localStorage.setItem('favorites',JSON.stringify(newFavorites))
  location.reload()
}
</script>
