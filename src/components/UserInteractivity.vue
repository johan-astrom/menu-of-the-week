<template>
  <section id="user-interactivity">
    <article id="optionButtons">
      <button @click="displayForm">Add a recipe</button>
      <button @click="displayRecipes">Show all recipes</button>
      <button @click="displayShoppingList">Show this week's shopping list</button>
    </article>
    <p v-show="showRecipeSavedMsg">Recipe saved!</p>
    <form id="recipe-form"
          v-show="showForm"
          @submit.prevent="addRecipe">
      <p>
        <label for="title">Enter a recipe name:</label>
      </p>
      <p><input id="title"
                name="title"
                required
                v-model="title"></p>
      <p><label for="ingredients">Enter an ingredient:</label></p>
      <p><input id="ingredients"
                name="ingredients"
                v-model="ingredientName"></p>
      <p><label for="ingredient-qty">Select a quantity:</label></p>
      <p><input type="number"
                id="ingredient-qty"
                name="ingredient-qty"
                min="1"
                max="50"
                v-model="ingredientQty"></p>
      <p><label for="ingredient-weight">Or, enter weight, measurement, etc:</label></p>
      <p><input id="ingredient-weight"
                name="ingredient-weight"
                v-model="ingredientWeight"></p>
      <p v-if="ingredientQty && ingredientWeight">Please enter either quantity or free text!</p>
      <p v-if="showIngredientError">Ingredient name required!</p>
      <p>
        <button @click.prevent="addIngredient"
                :class="{dualOptions: ingredientQty && ingredientWeight}">Add ingredient
        </button>
      </p>
      <p><label for="weekday">Choose a weekday (optional):</label></p>
      <p><select id="weekday"
                 name="weekday"
                 v-model="weekday">
        <option></option>
        <option v-for="weekday in weekdays" :key="weekday">{{ weekday }}</option>
      </select></p>
      <p>
        <input type="submit"
               id="submit"
               name="submit"
               value="Save recipe"></p>
      <p>
        <button @click="clearForm" id="cancelForm">Cancel</button>
      </p>
    </form>
    <div>
      <article v-show="showForm" id="reactive-recipe">
        <h2 v-show="title.length || ingredients.length">Your recipe:</h2>
        <h3>{{ title }}</h3>
        <ul>
          <li v-for="(ingredient, index) in ingredients"
              :key="index">
            {{ ingredient.ingredientName }} : {{ ingredient.ingredientQty }}{{ ingredient.ingredientWeight }}
            <i class="far fa-trash-alt"
               title="remove ingredient"
               @click="removeIngredient"></i>
          </li>
        </ul>
      </article>
    </div>
    <section id="display">
      <todays-recipe/>
      <recipe-list/>
      <shopping-list/>
    </section>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import TodaysRecipe from "@/components/TodaysRecipe";
import RecipeList from "@/components/RecipeList";
import ShoppingList from "@/components/ShoppingList";

export default {
  name: "UserInteractivity",
  components: {
    "todays-recipe": TodaysRecipe,
    "recipe-list": RecipeList,
    "shopping-list": ShoppingList
  },
  data() {
    return {
      showIngredientError: false,
    }
  },
  methods: {
    ...mapActions([
      'saveRecipe', 'saveRecipeActions', 'saveRecipeUpdate'
    ]),
    ...mapMutations([
      'hideAll', 'showRecipe', 'showRecipes', 'showShoppingList', 'removeDuplicates', 'setCurrentRecipe'
    ]),
    displayForm(){
      this.clearForm()
      this.$store.dispatch('displayForm')
    },
    addIngredient() {
      if (!(this.ingredientWeight && this.ingredientQty)
        && this.ingredientName) {
        let ingredient = {
          ingredientName: this.ingredientName,
          ingredientQty: this.ingredientQty,
          ingredientWeight: this.ingredientWeight,
          purchased: false
        }
        this.ingredients.push(ingredient)
        this.clearIngredients()
      } else if (!this.ingredientName) {
        this.showIngredientError = true
      }
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1)
    },
    addRecipe() {
      let recipe = {
        title: this.title,
        ingredients: this.ingredients.slice(),
        weekday: this.weekday,
        image: this.renderImgString,
        alt: this.weekday,
      }
      if (this.update) {
        this.saveRecipeUpdate(recipe)
      } else {
        this.saveRecipe(recipe)
      }
      this.clearForm()
      this.saveRecipeActions(recipe)
    },
    clearForm() {
      this.ingredients = []
      this.title = ''
      this.weekday = ''
      this.clearIngredients()
      this.setCurrentRecipe('')
      this.hideAll()
    },
    clearIngredients() {
      this.ingredientQty = ''
      this.ingredientName = ''
      this.ingredientWeight = ''
      this.showIngredientError = false
    },
    displayRecipes() {
      this.setCurrentRecipe('')
      this.hideAll()
      this.showRecipes()
    },
    displayShoppingList() {
      this.hideAll()
      this.showShoppingList()
    }
  },
  computed: {
    ...mapState([
      'recipes', 'weekdays', 'currentRecipe', 'update', 'showForm', 'showRecipeSavedMsg', 'currentRecipe'
    ]),
    renderImgString() {
      if (this.weekday) {
        return `img/${this.weekday}.jpg`
      } else return ''
    },
    title: {
      get() {
        return this.$store.state.formData.title
      },
      set(title) {
        this.$store.commit('setTitle', title)
      }
    },
    ingredientName: {
      get() {
        return this.$store.state.formData.ingredientName
      },
      set(ingredientName) {
        this.$store.commit('setIngredientName', ingredientName)
      }
    },
    ingredientQty: {
      get() {
        return this.$store.state.formData.ingredientQty
      },
      set(ingredientQty) {
        this.$store.commit('setIngredientQty', ingredientQty)
      }
    },
    ingredientWeight: {
      get() {
        return this.$store.state.formData.ingredientWeight
      },
      set(ingredientWeight) {
        this.$store.commit('setIngredientWeight', ingredientWeight)
      }
    },
    ingredients: {
      get() {
        return this.$store.state.formData.ingredients
      },
      set(ingredients) {
        this.$store.commit('setIngredients', ingredients)
      }
    },
    weekday: {
      get() {
        return this.$store.state.formData.weekday
      },
      set(weekday) {
        this.$store.commit('setWeekday', weekday)
      }
    },
    image: {
      get() {
        return this.$store.state.formData.image
      },
      set(image) {
        this.$store.commit('setImage', image)
      }
    },
    alt: {
      get() {
        return this.$store.state.formData.alt
      },
      set(alt) {
        this.$store.commit('setAlt', alt)
      }
    }
  }
};
</script>

<style scoped>

</style>