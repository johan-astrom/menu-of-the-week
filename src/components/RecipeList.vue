<template>
  <section id="recipe-list" v-show="showRecipes">
    <button id="hide-recipes" @click="hideRecipes">Hide recipes</button>
    <div id="no-recipes-header" v-if="!recipes.length">
      <h2>No recipes saved!</h2>
      <h4>Add one by clicking "Add a recipe" to the left.</h4>
    </div>
    <ul v-else id="recipe-parent-list">
      <li id="recipes-loop"
          v-for="(recipe, index) in recipes"
          :key="index">
        <recipe-info
          :recipe="recipe"
        ></recipe-info>

      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "RecipeList"
};
</script>

<style scoped>

</style>