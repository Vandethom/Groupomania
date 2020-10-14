<template>
  <div class="signup">
    <form action="">
      <input id="name" type="text" placeholder="Prénom" required />
      <input id="surname" type="text" placeholder="Nom" required /><br />
      <input
        id="pseudonym"
        type="text"
        name="Pseudonyme"
        placeholder="Pseudonyme"
        required
      /><br />
      <input id="email" type="text" placeholder="Email" required /><br />
      <input
        id="password"
        type="password"
        placeholder="Mot de passe"
        required
      /><br />
      <label for="female">Femme: </label>
      <input type="radio" name="gender" id="female" /><br />
      <label for="male">Homme: </label>
      <input type="radio" name="gender" id="male" /><br />
      <label for="other">Autre: </label>
      <input type="radio" name="gender" id="other" /><br />
      <button
        v-on:click="postUser"
        id="signUpButton"
        type="submit"
        form=""
        value="Submit"
      >
        S'inscrire
      </button>
      <p>
        Déjà inscrit? <router-link to="/signIn">Connectez-vous</router-link>
      </p>
    </form>
    <button v-on:click="findAll">findThemAllButton</button>
    <p class="conditions">
      En cliquant sur S'inscrire, vous acceptez nos Conditions générales.
      Découvrez comment nous recueillons, utilisons et partageons vos données en
      lisant ces conditions. Pour plus de détails, ou si vous n'êtes pas
      d'accord avec ces conditions, contactez notre équipe.
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      name: "",
      surname: "",
      pseudonym: "",
      password: "",
      gender: "",
      description: "",
    };
  },
  methods: {
    findAll() {
      axios
        .get("http://localhost:3000/api/auth/account", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.datas = response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postUser() {
      const name = document.getElementById("name").value;
      const surname = document.getElementById("surname").value;
      const pseudonym = document.getElementById("pseudonym").value;
      const password = document.getElementById("password").value;
      const email = document.getElementById("email").value;
      const description = document.getElementById("description").value;
      //const gender = req.body.gender;
      const user = { name, surname, pseudonym, password, email, description };

      axios
        .post("http://localhost:3000/api/auth/signup", user, {
          headers: {
            "Content-Type": "application.json",
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>


<style>
.signup {
  display: flex;
  flex-direction: column;
  width: 70vh;
  height: 42vh;
  margin: -29vh 0 0 60vh;
  padding: 8vh 6vh 8vh 6vh;
  font-size: 80%;
  border: 2px solid orange;
  border-radius: 2px 25px;
}

.conditions {
  text-align: justify;
}

#signUpButton {
  width: 16vh;
  height: 5vh;
  margin-top: 1vh;
  background-color: rgb(10, 175, 10);
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 5px;
}

.signUpButton:hover {
  background-color: #3e8e41;
  cursor: pointer;
}

form {
}
</style>