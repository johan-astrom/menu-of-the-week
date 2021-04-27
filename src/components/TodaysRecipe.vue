<template>
  <article v-show="showTodaysRecipe" id="todays-recipe">
    <recipe-info :recipe="currentRecipe"></recipe-info>
  </article>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import RecipeInfo from "@/components/RecipeInfo";

export default {
  name: "TodaysRecipe",
  components: {
    "recipe-info": RecipeInfo
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations([
      'removeDuplicates', 'hideAll'
    ])
  },
  computed: mapState([
    'recipes', 'weekdays', 'showTodaysRecipe', 'currentRecipe'
  ])
};
</script>

<style scoped>

</style>