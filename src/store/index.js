import Vue from "vue";
import Vuex from "vuex";
import formData from "./modules/form-data";

Vue.use(Vuex);

//const store = new Vuex.Store({

const modules = {
  formData: formData
};

const state = {
  weekdays: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
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
  assignedWeekday: "",
  fetchURL: "http://localhost:3000"
};

const mutations = {
  saveRecipe(state, recipe) {
    state.recipes.push(recipe);
    state.currentRecipe = "";
  },
  deleteRecipe(state) {
    let pos = state.recipes.indexOf(state.currentRecipe);

    state.recipes.splice(pos, 1);
    state.showTodaysRecipe = false;
    state.currentRecipe = "";
  },
  updateRecipe(state) {
    state.showForm = true;
    state.update = true;
  },
  //todo doesnt update immediately
  saveRecipeUpdate(state, recipe) {
    recipe.image = require(`@/assets/img/${recipe.weekday}.jpg`);
    recipe.alt = recipe.weekday;
    let pos = state.recipes.indexOf(state.currentRecipe);
    state.recipes[pos] = recipe;
  },
  loadRecipes(state, recipes) {
    for (let recipe of recipes) {
      if (recipe.weekday) {
        recipe.image = require(`@/assets/img/${recipe.weekday}.jpg`);
        recipe.alt = recipe.weekday;
      }
    }
    state.recipes = recipes;
  },
  hideAll(state) {
    state.showRecipe = false;
    state.showForm = false;
    state.showRecipeSavedMsg = false;
    state.showTodaysRecipe = false;
    state.showRecipes = false;
    state.showShoppingList = false;
    state.update = false;
  },
  showRecipe(state, weekday) {
    state.showTodaysRecipe = true;
    state.currentRecipe = state.recipes.find((x) => x.weekday === weekday);
  },
  showRecipes(state) {
    state.showRecipes = true;
  },
  showShoppingList(state) {
    state.showShoppingList = true;
  },
  setCurrentRecipe(state, recipe) {
    state.currentRecipe = recipe;
  },
  setAssignedWeekday(state, weekday) {
    state.assignedWeekday = weekday;
  },
  removeDuplicates(state, recipe) {
    recipe.weekday = "";
  },
  changePurchased(state, ingredient) {
    ingredient.purchased = !ingredient.purchased;
  },
  displayForm(state) {
    state.showForm = true;
    state.showRecipeSavedMsg = false;
  },
  displayRecipeSavedMsg(state) {
    state.showForm = false;
    state.showRecipeSavedMsg = true;
  },
  assignWeekday(state) {
    if (state.assignedWeekday === "-- none --") {
      state.currentRecipe.weekday = "";
      state.currentRecipe.image = "";
      state.showTodaysRecipe = false;
    } else {
      state.currentRecipe.weekday = state.assignedWeekday;
      state.currentRecipe.alt = state.assignedWeekday;
      state.currentRecipe.image = require(`@/assets/img/${state.assignedWeekday}.jpg`);
    }
  }
};

const actions = {
  //state param?
  saveRecipe({ commit, dispatch }, recipe) {
    fetch(`${state.fetchURL}/recipes`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(recipe)
    })
      .then((res) => res.json())
      .then((data) => {
        recipe.id = data.recipe.id;
        commit("saveRecipe", recipe);
        dispatch("removeDuplicates", recipe);
      });
  },
  //todo bild laddas inte
  loadRecipes({ commit }) {
    fetch(`${state.fetchURL}/recipes`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let recipes = data.recipes;
        console.log(recipes);
        commit("loadRecipes", recipes);
      });
  },
  deleteRecipe({ state, commit }) {
    if (
      confirm(
        "Are you sure you want to delete recipe: " +
        state.currentRecipe.title +
        "?"
      )
    ) {
      fetch(`${state.fetchURL}/recipes/${state.currentRecipe.id}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        referrerPolicy: "no-referrer"
      }).then((res) => res.json());
      commit("deleteRecipe");
    }
  },
  updateRecipe({ commit }) {
    commit("hideAll");
    commit("updateRecipe");
  },
  saveRecipeUpdate({ state, commit, dispatch }, recipe) {
    commit("saveRecipeUpdate", recipe);
    dispatch("removeDuplicates", recipe);
    fetch(`${state.fetchURL}/recipes/${state.currentRecipe.id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(recipe)
    }).then((res) => {
      return res.json();
    });
  },
  removeDuplicates({ commit, state }, recipe) {
    for (let i = 0; i < state.recipes.length; i++) {
      if (
        recipe.weekday &&
        state.recipes[i].weekday === recipe.weekday &&
        state.recipes[i] !== recipe
      ) {
        fetch(`${state.fetchURL}/remove-weekday/${state.recipes[i].id}`)
          .then(res => {
            commit("removeDuplicates", state.recipes[i]);
            return res.json();
          });
      }
    }
  },
  //state param?
  saveRecipeActions({ commit, dispatch }, recipe) {
    dispatch("removeDuplicates", recipe);
    commit("displayRecipeSavedMsg");
  },
  displayForm({ commit }) {
    commit("hideAll");
    commit("displayForm");
  },
  assignWeekday({ state, commit, dispatch }) {
    let recipe = state.currentRecipe;
    if (state.assignedWeekday === "-- none --") {
      recipe.weekday = "";
    } else {
      recipe.weekday = state.assignedWeekday;
    }
    fetch(`${state.fetchURL}/recipes/${state.currentRecipe.id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(recipe)
    }).then((res) => {
      commit("assignWeekday");
      if (state.assignedWeekday !== "-- none --") {
        dispatch("removeDuplicates", state.currentRecipe);
      }
      return res.json();
    });

  },
  changePurchased({ commit }, ingredient) {
    commit("changePurchased", ingredient);
    fetch(`${state.fetchURL}/ingredients/${ingredient.id}`,
      {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ "purchased": ingredient.purchased })
      }).then(res => {
      return res.json();
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
});
