<template>
  <article v-show="showTodaysRecipe" id="todays-recipe">
    <recipe-info :recipe="currentRecipe"></recipe-info>
  </article>
</template>

<script>
export default {
  name: "TodaysRecipe"
};
</script>

<style scoped>

</style>