<template>
  <div id="account">
    <h1>Informations générales du compte</h1>
    <div class="category name">
      <p class="categoryDefiner">Prénom</p>
      <p class="info namePlace">{{ user.name }}</p>
      <p class="modifier">Modifier</p>
    </div>
    <div class="category surname">
      <p class="categoryDefiner">Nom</p>
      <p class="info surnamePlace">{{ user.surname }}</p>
      <p class="modifier">Modifier</p>
    </div>
    <div class="category pseudonym">
      <p class="categoryDefiner">Pseudonyme</p>
      <p class="info pseudonymPlace">{{ user.pseudonym }}</p>
      <p class="modifier">Modifier</p>
    </div>
    <div class="category password">
      <p class="categoryDefiner">Mot de passe</p>
      <p class="info passwordPlace">********</p>
      <p class="modifier">Modifier</p>
    </div>
    <div class="category description">
      <p class="categoryDefiner">description</p>
      <p class="info descriptionPlace">{{ user.description }}</p>
      <p class="modifier">Modifier</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/auth/account", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.user = response.data.response[0];
        console.log(this.user);
      })
      .catch(function (error) {
        console.log(error);
      });
    return JSON.stringify(this.datas);
  },
  name: "Account",
  methods: {},
};
</script>


<style>
#account {
  margin: -28vh 0 0 45vh;
}

h1 {
  margin: 0 18vh 8.5vh 0;
}

.category {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5vh;
  border-bottom: 1px solid black;
  width: 90%;
}

.categoryDefiner {
  font-weight: bold;
}

.info {
  color: gray;
}

.modifier {
  cursor: pointer;
  color: blue;
}
</style>