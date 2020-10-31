<template>
  <div id="account">
    <h1>Informations générales du compte</h1>
    <div class="category name">
      <p class="categoryDefiner">Prénom</p>
      <p class="info namePlace">{{ user.name }}</p>
    </div>
    <div class="category surname">
      <p class="categoryDefiner">Nom</p>
      <p class="info surnamePlace">{{ user.surname }}</p>
    </div>
    <div class="category pseudonym">
      <p class="categoryDefiner">Pseudonyme</p>
      <p class="info pseudonymPlace">{{ user.pseudonym }}</p>
    </div>
    <div class="category password">
      <p class="categoryDefiner">Mot de passe</p>
      <p class="info passwordPlace">********</p>
    </div>
    <div class="category email">
      <p class="categoryDefiner">Mot de passe</p>
      <p class="info emailPlace">{{ user.email }}</p>
    </div>
    <div class="category description">
      <p class="categoryDefiner">description</p>
      <p class="info descriptionPlace">{{ user.description }}</p>
    </div>
    <div class="category modifications">
      <p class="categoryDefiner">Modifications</p>
      <router-link to="/account_modify">
        <p id="putMethod" class="modifier">Modifier mon compte</p>
      </router-link>
      <p id="deleteMethod" class="modifier" v-on:click="deleteUser">
        Supprimer mon compte
      </p>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "AccountView",
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const userId = localStorage.getItem("id");
    axios
      .get(`http://localhost:3000/api/auth/account/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.user = response.data[0];
        console.log(this.user);
      })
      .catch(function (error) {
        console.log(error);
      });
    return JSON.stringify(this.datas);
  },
  methods: {
    deleteUser() {
      const userId = localStorage.getItem("id");
      axios
        .delete(`http://localhost:3000/api/auth/account/${userId}`, {
          header: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          localStorage.clear();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>


<style>
#account {
  margin: -28vh 0 0 52vh;
}

h1 {
  margin: 0 18vh 8.5vh 0;
}

.category {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5vh;
  border-bottom: 1px solid black;
  width: 75%;
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