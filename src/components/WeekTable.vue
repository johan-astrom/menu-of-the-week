<template>
  <article id="week-grid">
    <h2 v-for="weekday in weekdays" :key="weekday">{{ weekday }}</h2>
    <figure
      v-for="(recipe, index) in recipes"
      v-if="recipe.weekday"
      :key="index"
      :style="{ gridArea: position(recipe) }"
      @mouseover="hoveredWeekday = recipe.weekday"
      @mouseleave="hoveredWeekday = ''"
      :class="{ 'hover-size': recipe.weekday === hoveredWeekday }"
      @click="showRecipe"
    >
      <img :src="recipe.image" :alt="recipe.alt" class="recipe-img" />
      <figcaption>{{ recipe.title }}</figcaption>
    </figure>
  </article>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "WeekTable",
  data() {
    return {
      hoveredWeekday: "",
    };
  },
  methods: {
    ...mapMutations(["hideAll"]),
    showRecipe() {
      this.hideAll();
      this.$store.commit("showRecipe", this.hoveredWeekday);
    },
    position(recipe) {
      switch (recipe.weekday) {
        case "monday":
          return "2 / 1 / 3 / 2";
        case "tuesday":
          return "2 / 2 / 3 / 3";
        case "wednesday":
          return "2 / 3 / 3 / 4";
        case "thursday":
          return "2 / 4 / 3 / 5";
        case "friday":
          return "2 / 5 / 3 / 6";
        case "saturday":
          return "2 / 6 / 3 / 7";
        case "sunday":
          return "2 / 7 / 3 / 8";
      }
    },
  },
  computed: mapState(["recipes", "weekdays"]),
};
</script>

<style scoped></style>
