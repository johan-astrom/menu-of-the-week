<template>
  <article id="recipe-info">
    <div id="recipe-header">
      <h3
        @click="setCurrentRecipe(recipe)"
        :class="{ 'active-title': currentRecipe === recipe }"
      >
        {{ recipe.title }}
      </h3>
      <i
        class="far fa-trash-alt"
        title="delete recipe"
        v-show="currentRecipe === recipe"
        @click="deleteRecipe"
      ></i>
    </div>
    <div v-show="currentRecipe === recipe">
      <ul>
        <li
          id="ingredient-list"
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
        >
          {{ ingredient.ingredientName }} : {{ ingredient.ingredientQty }}
          {{ ingredient.ingredientWeight }}
        </li>
      </ul>
      <change-weekday></change-weekday>
      <button id="update-button" @click="updateRecipe">
        Update recipe info
      </button>
    </div>
  </article>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import changeWeekday from "./ChangeWeekday";

export default {
  name: "RecipeInfo",
  components: {
    "change-weekday": changeWeekday,
  },
  props: {
    recipe: {
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["removeDuplicates"]),
    ...mapActions(["deleteRecipe"]),
    updateRecipe() {
      this.$store.dispatch("setToCurrent");
      this.$store.dispatch("updateRecipe");
    },
    setCurrentRecipe(recipe) {
      this.$store.commit("setCurrentRecipe", recipe);
    },
  },
  computed: mapState(["recipes", "currentRecipe", "weekdays"]),
};
</script>
