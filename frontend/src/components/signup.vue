<template>
  <div class="signup">
    <form action="">
      <input
        class="signUpInput"
        id="name"
        type="text"
        placeholder="Prénom"
        required
      /><br />
      <input
        class="signUpInput"
        id="surname"
        type="text"
        placeholder="Nom"
        required
      /><br />
      <input
        class="signUpInput"
        id="pseudonym"
        type="text"
        name="Pseudonyme"
        placeholder="Pseudonyme"
        required
      /><br />
      <input
        class="signUpInput"
        id="email"
        type="text"
        placeholder="Email"
        required
      /><br />
      <input
        class="signUpInput"
        id="password"
        type="password"
        placeholder="Mot de passe"
        required
      /><br />
      <input
        class="descriptionInput signUpInput"
        type="text"
        id="description"
        name="description"
      /><br />
      <label for="female">Femme: </label>
      <input type="radio" name="gender" id="female" /><br />
      <label for="male">Homme: </label>
      <input type="radio" name="gender" id="male" /><br />
      <label for="other">Autre: </label>
      <input type="radio" name="gender" id="other" /><br />

      <button
        v-on:click="signUp"
        class="signUpButton"
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
    <span class="separateLine"></span>
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
      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      pseudonym: document.getElementById("pseudonym").value,
      password: document.getElementById("password").value,
      //gender: "",
      description: document.getElementById("description").value,
    };
  },
  methods: {
    signUp() {
      let token = "";
      console.log(document.getElementById("name").value);
      axios
        .post(
          "http://localhost:3000/api/auth/signup",
          {
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            pseudonym: document.getElementById("pseudonym").value,
            password: document.getElementById("password").value,
            //gender: "",
            description: document.getElementById("description").value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          window.location.href = "http://localhost:8080/#/authentication";
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
  background: white;
  display: flex;
  flex-direction: column;
  width: 70vh;
  margin: -29vh 0 0 60vh;
  padding: 3vh 6vh 3vh 6vh;
  font-size: 80%;
  box-shadow: 0.5px 0.5px 3px #fd2d01, -0.5px -0.5px 3px #fd2d01;
  border: 1px solid black;
  border-radius: 15px;
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

.signUpInput {
  background: #e8f0fe;
  margin-bottom: 2vh;
  width: 250px;
  height: 50px;
  border: none;
  border-radius: 10px;
}

.signInButton {
  cursor: pointer;
  width: 250px;
  height: 45px;
  border: none;
  border-radius: 10px;
  margin: 0vh 0 1vh 0;
  background: #51f032;
  color: white;
  font-weight: bold;
  font-size: 20px;
}

.signUpButton {
  cursor: pointer;
  width: 150px;
  height: 35px;
  border: none;
  border-radius: 10px;
  margin-top: 2.5vh;
  background: #2f9c1a;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.separateLine {
  display: block;
  border-bottom: 2px solid #dadde1;
  width: 400px;
  margin: auto;
  margin-top: 1.5vh;
}

.descriptionInput {
  height: 100px;
  margin: auto;
}
</style>