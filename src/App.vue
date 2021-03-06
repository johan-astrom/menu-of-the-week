<template>
  <section>
    <header>
      <h1>Menu of the week</h1>
      <div class="header-line"></div>
    </header>

    <main>
      <week-table></week-table>
      <user-interactivity></user-interactivity>
    </main>
  </section>
</template>

<script>
import UserInteractivity from "@/components/UserInteractivity";
import WeekTable from "@/components/WeekTable";

export default {
  name: "App",
  components: {
    UserInteractivity,
    WeekTable,
  },
  mounted() {
    this.$store.dispatch("loadRecipes");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Merriweather&family=Open+Sans&display=swap");

body {
  font-family: "Open Sans", sans-serif;
  margin: 0;
  padding-bottom: 30px;
}

ul li {
  line-height: 175%;
  font-size: 18px;
}

li {
  margin: 0 50px;
}

li#ingredient-list {
  margin: 0 70px;
}

header h1 {
  font-family: "Merriweather", serif;
  text-align: center;
  font-size: 40px;
  margin: 20px auto;
}

.header-line {
  background: linear-gradient(90deg, #a0a603, #bf5b04);
  height: 20px;
  width: 100%;
  margin-bottom: 50px;
}

article#week-grid {
  display: grid;
  grid-template-columns: repeat(7, calc(40% - 40px));
  overflow-x: auto;
  grid-template-rows: 70px 200px;
  grid-gap: 30px;
  border: 2px solid #a0a603;
  border-right: none;
  justify-items: center;
  margin-bottom: 30px;
  padding: 10px 30px;
}

#week-grid figcaption {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

main {
  margin: 0 10px;
}

#user-interactivity {
  display: block;
  margin-top: 50px;
  text-align: center;
}

#hide-recipes,
#hide-shoppinglist {
  display: none;
}

#recipe-list ul li:first-child {
  margin-top: 20px;
}

article#optionButtons button {
  margin-bottom: 40px;
}

#week-grid figure {
  display: block;
  width: 100%;
  height: auto;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
}

#week-grid .hover-size {
  transform: scale(1.03);
}

.recipe-img {
  display: block;
  margin: 0 auto 20px;
  max-width: 100%;
  height: auto;
}

button {
  width: 90%;
  height: 65px;
}

#recipe-form p {
  margin-bottom: 20px;
}

form button,
input[type="submit"] {
  display: inline-block;
  width: 40%;
}

button,
input[type="submit"] {
  font-size: 20px;
  padding: 13px;
  background-color: #fff;
  border: 2px solid black;
  transition: 0.2s;
  height: 65px;
}

input[type="submit"] {
  margin-top: 20px;
  margin-bottom: 15px;
  border: 3px solid #a0a603;
}

button:hover,
input[type="submit"]:hover {
  background-color: #d9d166;
  border-color: #d9d166;
  transition: 0.2s;
}

label {
  font-size: 20px;
}

input {
  width: 60%;
  height: 40px;
  font-size: 18px;
  text-align: center;
}

select {
  width: 50%;
  font-size: 16px;
  height: 40px;
  text-align-last: center;
}

input,
select {
  padding: 10px 15px;
  box-sizing: border-box;
}

input:focus,
select:focus,
button:focus {
  outline: none;
  border-color: #f2ceae;
}

input[type="number"] {
  width: 80px;
}

.dualOptions {
  color: lightgray;
  border-color: lightgray;
}

.dualOptions:hover {
  background-color: white;
  border-color: lightgray;
}

#recipe-header h3 {
  margin-top: 0;
  margin-bottom: 0;
}

#recipe-list #header {
  margin-top: 10px;
}

#recipe-parent-list {
  margin-top: 30px;
}

#recipes-loop {
  margin-top: 20px;
}

#recipes-loop h3 {
  cursor: pointer;
}

#ingredient-list:first-of-type {
  margin-top: 20px;
}

#recipe-header {
  font-size: 22px;
  display: flex;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
}

.fa-trash-alt {
  margin: 4px 15px;
  cursor: pointer;
}

#recipe-info,
#reactive-recipe,
#shopping-list {
  word-wrap: normal;
}

#reactive-recipe h2 {
  font-size: 22px;
}

#new-weekday h4 {
  font-size: 20px;
  margin-bottom: 10px;
}

#new-weekday select {
  width: 150px;
  margin-right: 18px;
  display: inline-block;
}

#new-weekday button {
  width: 150px;
  margin: 5px 0 25px;
  display: inline-block;
}

#update-button {
  width: 318px;
  margin-bottom: 20px;
  margin-top: 12px;
}

article#shopping-list ul {
  list-style-type: none;
}

#recipe-list h3:hover {
  text-decoration: underline;
}

#recipes-loop > * {
  vertical-align: text-top;
}

#recipe-info {
  display: inline-block;
}

#recipe-list #no-recipes-header {
  margin-top: 30px;
}

h3.active-title {
  color: #a0a603;
}

#shopping-list ul {
  margin: 0 auto;
}

#shopping-list li {
  line-height: 200%;
}

#shopping-list img {
  vertical-align: middle;
  margin-left: 4px;
  padding-bottom: 5px;
}

.greenMarked {
  color: #a0a603;
}

@media screen and (min-width: 1024px) {
  ul {
    list-style-position: outside;
  }

  li {
    margin: 0 0;
  }

  li#ingredient-list {
    margin: 0 0;
  }

  article#week-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: 70px 200px;
    grid-gap: 30px;
    border: 2px solid #a0a603;
    justify-items: center;
    margin-bottom: 30px;
    padding: 10px 30px;
  }

  main {
    margin: 0 180px;
  }

  #user-interactivity {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 40px;
    text-align: left;
  }

  #hide-recipes,
  #hide-shoppinglist {
    display: block;
    margin: 0 0;
  }

  button {
    display: inline;
    width: 250px;
    margin: 2px auto;
  }

  button,
  input[type="submit"] {
    font-size: 16px;
    padding: 13px;
    height: 48px;
  }

  input[type="submit"] {
    margin-bottom: 7px;
    text-align: center;
  }

  form button,
  input[type="submit"] {
    display: inline;
  }

  input,
  select {
    padding: 5px;
    text-align: left;
  }

  input[type="number"] {
    width: 80px;
  }

  select {
    width: 120px;
    font-size: 16px;
    height: 40px;
    text-align-last: left;
  }

  #recipes-loop {
    list-style-position: outside;
  }

  #recipe-info {
    display: inline-block;
    text-align: left;
  }

  #recipe-header {
    font-size: 22px;
    display: flex;
    align-items: flex-start;
    justify-content: left;
  }

  #new-weekday select {
    width: 120px;
    margin-right: 14px;
    display: inline-block;
  }

  #new-weekday button {
    width: 100px;
    margin: 5px 0 20px;
    display: inline-block;
  }

  #update-button {
    width: 234px;
    margin-bottom: 20px;
  }
}
</style>
