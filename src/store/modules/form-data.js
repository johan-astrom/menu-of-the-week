const state = {
  title: "",
  ingredientName: "",
  ingredientQty: "",
  ingredientWeight: "",
  ingredients: [],
  weekday: "",
  image: "",
  alt: "",
};

const mutations = {
  setTitle(state, title) {
    state.title = title;
  },
  setIngredientName(state, ingredientName) {
    state.ingredientName = ingredientName;
  },
  setIngredientQty(state, ingredientQty) {
    state.ingredientQty = ingredientQty;
  },
  setIngredientWeight(state, ingredientWeight) {
    state.ingredientWeight = ingredientWeight;
  },
  setIngredients(state, ingredients) {
    state.ingredients = ingredients;
  },
  setWeekday(state, weekday) {
    state.weekday = weekday;
  },
  setImage(state, image) {
    state.image = image;
  },
  setAlt(state, alt) {
    state.alt = alt;
  },
};

const actions = {
  setToCurrent({ commit, rootState }) {
    let recipe = rootState.currentRecipe;

    commit("setTitle", recipe.title);
    commit("setIngredients", recipe.ingredients.slice());
    commit("setWeekday", recipe.weekday);
    commit("setImage", recipe.image);
    commit("setAlt", recipe.alt);
  },
};

export default {
  state,
  mutations,
  actions,
};
