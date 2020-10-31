<template>
  <div id="account">
    <h1>Informations générales du compte</h1>
    <div class="category name">
      <p class="categoryDefiner">Prénom</p>
      <input type="text" id="name" class="modifyInput" />
    </div>
    <div class="category surname">
      <p class="categoryDefiner">Nom</p>
      <input type="text" id="surname" class="modifyInput" />
    </div>
    <div class="category pseudonym">
      <p class="categoryDefiner">Pseudonyme</p>
      <input type="text" id="pseudonym" class="modifyInput" />
    </div>
    <div class="category email">
      <p class="categoryDefiner">Email</p>
      <input type="text" id="email" class="modifyInput" />
    </div>
    <div class="category password">
      <p class="categoryDefiner">Mot de passe</p>
      <input type="password" id="password" class="modifyInput" />
    </div>
    <div class="category description">
      <p class="categoryDefiner">description</p>
      <input type="text" id="description" class="modifyInput" />
    </div>
    <div class="category modifications">
      <p id="changeAccount" v-on:click="putUser">Modifier mes informations</p>
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
        document.getElementById("name").setAttribute("value", this.user.name);
        document
          .getElementById("surname")
          .setAttribute("value", this.user.surname);
        document
          .getElementById("pseudonym")
          .setAttribute("value", this.user.pseudonym);
        document.getElementById("email").setAttribute("value", this.user.email);

        document
          .getElementById("description")
          .setAttribute("value", this.user.description);
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
    putUser() {
      const userId = localStorage.getItem("id");
      axios
        .put(
          `http://localhost:3000/api/auth/account/${userId}`,
          {
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            pseudonym: document.getElementById("pseudonym").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            description: document.getElementById("description").value,
          },
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((window.location.href = "http://localhost:8080/#/account"));
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

.modifyInput {
  background: #d6c6c6;
  width: 80%;
  height: 45px;
  border: none;
  border-radius: 10px;
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

#changeAccount {
  cursor: pointer;
  color: blue;
}

.modifier {
  cursor: pointer;
  color: blue;
}
</style>