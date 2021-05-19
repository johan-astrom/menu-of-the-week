<template>
  <article id="shopping-list" v-show="showShoppingList">
    <button id="hide-shoppinglist" @click="hideAll">Hide shopping list</button>
    <h2>This week's shopping list:</h2>
    <ul v-for="(recipe, index) in weekdayRecipes" :key="index">
      <li
        v-for="(ingredient, index) in recipe.ingredients"
        :key="index"
        @mouseover="hoveredItem = ingredient"
        @mouseleave="hoveredItem = ''"
        :class="{ greenMarked: ingredient.purchased }"
      >
        {{ ingredient.ingredientName }} : {{ ingredient.ingredientQty
        }}{{ ingredient.ingredientWeight }}
        <img
          v-if="!ingredient.purchased"
          v-show="hoveredItem === ingredient"
          @click="changePurchased(ingredient)"
          src="../assets/img/icon/outline_radio_button_unchecked_black_24dp.png"
          alt="check"
        />
        <img
          v-if="ingredient.purchased"
          v-show="hoveredItem === ingredient"
          @click="changePurchased(ingredient)"
          src="../assets/img/icon/outline_check_circle_black_24dp.png"
          alt="uncheck"
        />
      </li>
    </ul>
  </article>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "ShoppingList",
  data() {
    return {
      hoveredItem: "",
    };
  },
  methods: {
    ...mapMutations(["hideAll"]),
    ...mapActions(["changePurchased"]),
  },
  computed: {
    ...mapState(["recipes", "showShoppingList"]),
    weekdayRecipes: function() {
      return this.recipes.filter((recipe) => {
        return recipe.weekday;
      });
    }
  }
};
</script>

<style scoped></style>
