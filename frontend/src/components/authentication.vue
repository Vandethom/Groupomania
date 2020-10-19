<template>
  <div id="authentication">
    <form action="">
      <input class="authInput" id="email" type="text" /><br />
      <input class="authInput" id="password" type="password" /><br />
      <button v-on:click="login" class="signInButton">Me connecter</button
      ><br />
      <a class="forgottenId" href="">Indentifiants oubliés?</a><br />
      <span class="line"></span>
      <router-link to="/createAccount">
        <button class="signUpButton">Créer un compte</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Authentication",
  data() {
    return {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
  },
  methods: {
    login() {
      let token = "";
      axios
        .post(
          "http://localhost:3000/api/auth/login",
          {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
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
          window.location.href = "http://localhost:8080/?#/home";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
body {
  background: #f0f2f5;
}

#authentication {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  margin: -28vh 0 0 72vh;
  width: 42vh;
  height: 44vh;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 0.5px 0.5px 3px #fd2d01, -0.5px -0.5px 3px #fd2d01;
  align-content: center;
}

label {
  margin-top: 12.5vh;
}

.authInput {
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

.forgottenId {
  text-decoration: none;
  font-size: 14px;
}

.line {
  display: block;
  border-bottom: 2px solid #dadde1;
  width: 185px;
  margin: auto;
  margin-top: 1.5vh;
}
</style>