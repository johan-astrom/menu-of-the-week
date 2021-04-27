import Vue from "vue";
import Vuex from "vuex";
import formData from "./modules/form-data";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
});

//const store = new Vuex.Store({

const modules = {
  formData: formData
};

const state = {
  weekdays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
  recipes: [],
  currentRecipe: "",
  hideAll: false,
  showRecipe: false,
  showRecipes: false,
  showForm: false,
  showRecipeSavedMsg: false,
  showTodaysRecipe: false,
  showShoppingList: false,
  update: false,
  assignedWeekday: ""
};

const mutations = {
  saveRecipe(state, recipe) {
    state.recipes.push(recipe)
    state.currentRecipe = ''
  },
  deleteRecipe(state) {
    let pos = state.recipes.indexOf(state.currentRecipe)
    state.recipes.splice(pos, 1)
    state.showTodaysRecipe = false
    state.currentRecipe = ''
  },
  updateRecipe(state) {
    state.showForm = true
    state.update = true
  },
  saveRecipeUpdate(state, recipe) {
    let pos = state.recipes.indexOf(state.currentRecipe)
    state.recipes[pos] = recipe
  },
  loadRecipes(state, recipes) {
    state.recipes = recipes
  },
  updateRecipes(state) {
    localStorage.setItem('recipes-array', JSON.stringify(state.recipes))
  },
  hideAll(state) {
    state.showRecipe = false
    state.showForm = false
    state.showRecipeSavedMsg = false
    state.showTodaysRecipe = false
    state.showRecipes = false
    state.showShoppingList = false
    state.update = false
  },
  showRecipe(state, weekday) {
    state.showTodaysRecipe = true
    state.currentRecipe = state.recipes.find(x => x.weekday === weekday)
  },
  showRecipes(state) {
    state.showRecipes = true
  },
  showShoppingList(state) {
    state.showShoppingList = true
  },
  setCurrentRecipe(state, recipe) {
    state.currentRecipe = recipe
  },
  setAssignedWeekday(state, weekday) {
    state.assignedWeekday = weekday
  },
  removeDuplicates(state, recipe) {
    for (let i = 0; i < state.recipes.length; i++) {
      if (state.recipes[i] !== recipe) {
        if (state.recipes[i].weekday === recipe.weekday) {
          state.recipes[i].weekday = ''
        }
      }
    }
  },
  changePurchased(state, ingredient) {
    ingredient.purchased = !ingredient.purchased
  },
  displayForm(state){
    state.showForm = true
    state.showRecipeSavedMsg = false
  },
  displayRecipeSavedMsg(state){
    state.showForm = false
    state.showRecipeSavedMsg = true
  },
  assignWeekday(state){
    if (state.assignedWeekday === '-- none --') {
      state.currentRecipe.weekday = ''
      state.currentRecipe.image = ''
      state.showTodaysRecipe = false
    } else {
      state.currentRecipe.weekday = state.assignedWeekday
      state.currentRecipe.image = `img/${state.assignedWeekday}.jpg`
    }
  }
}

const actions = {
  saveRecipe({state, commit}, recipe) {
    commit('saveRecipe', recipe)
    commit('removeDuplicates', recipe)
  },
  loadRecipes({commit}) {
    if (localStorage.getItem('recipes-array')) {
      let recipes = JSON.parse(localStorage.getItem('recipes-array'))
      commit('loadRecipes', recipes)
    }
  },
  deleteRecipe({state, commit}) {
    if (confirm('Are you sure you want to delete recipe: ' + state.currentRecipe.title + '?')) {
      commit('deleteRecipe')
      commit('updateRecipes')
    }
  },
  updateRecipe({commit}) {
    commit('hideAll')
    commit('updateRecipe')
  },
  saveRecipeUpdate({commit}, recipe) {
    commit('saveRecipeUpdate', recipe)
    commit('removeDuplicates', recipe)
    commit('updateRecipes')
  },
  saveRecipeActions({state, commit}, recipe) {
    commit('updateRecipes')
    commit('removeDuplicates', recipe)
    commit('displayRecipeSavedMsg')
  },
  displayForm({commit}) {
    commit('hideAll')
    commit('displayForm')
  },
  assignWeekday({state, commit}) {
    commit('assignWeekday')
    if (state.assignedWeekday !== '-- none --') {
      commit('removeDuplicates', state.currentRecipe)
    }
    commit('updateRecipes')
  },
  changePurchased({commit}, ingredient) {
    commit('changePurchased', ingredient)
    commit('updateRecipes')
  }
}
