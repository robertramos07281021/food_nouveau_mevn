import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/Pages/HomeView.vue";
import CategoryView from "../components/Pages/CategoryView.vue";
import MealView from "../components/Pages/MealView.vue";
import RecipesView from "../components/Pages/RecipesView.vue";
import FeaturesView from "../components/Pages/FeaturesView.vue";
import NotFoundView from "../components/Pages/NotFoundView.vue";
import AddRecipesView from "../components/Pages/AddRecipesView.vue";
import YourRecipesView from "../components/Pages/YourRecipesView.vue";
import AllFeaturesView from "../components/Pages/AllFeaturesView.vue";
import UpdateYourRecipes from "../components/Pages/UpdateYourRecipes.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/recipes",
      name: "recipes",
      component: RecipesView,
    },
    {
      path: "/features",
      name: "features",
      component: FeaturesView,
    },
    {
      path: "/addrecipes",
      name: "addrecipes",
      component: AddRecipesView,
    },
    {
      path: "/category",
      name: "category",
      component: CategoryView,
    },
    {
      path: "/meal",
      name: "meal",
      component: MealView,
    },
    {
      path: "/yourrecipe",
      name: "yourrecipe",
      component: YourRecipesView,
    },
    {
      path: "/allfeatures",
      name: "allfeatures",
      component: AllFeaturesView,
    },
    {
      path: "/updaterecipe",
      name: "updaterecipe",
      component: UpdateYourRecipes,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
