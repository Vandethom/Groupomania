<template>
  <div class="signup">
    <form action="">
      <input type="text" placeholder="Prénom" required />
      <input type="text" placeholder="Nom" required /><br />
      <input
        type="text"
        name="Pseudonyme"
        placeholder="Pseudonyme"
        required
      /><br />
      <input type="text" placeholder="Email" required /><br />
      <input type="password" placeholder="Mot de passe" required /><br />
      <label for="female">Femme: </label>
      <input type="radio" name="gender" id="female" /><br />
      <label for="male">Homme: </label>
      <input type="radio" name="gender" id="male" /><br />
      <label for="other">Autre: </label>
      <input type="radio" name="gender" id="other" /><br />
      <button class="signUpButton" type="submit" form="" value="Submit">
        S'inscrire
      </button>
      <p>
        Déjà inscrit? <router-link to="/signIn">Connectez-vous</router-link>
      </p>
    </form>
    <p class="conditions">
      En cliquant sur S'inscrire, vous acceptez nos Conditions générales.
      Découvrez comment nous recueillons, utilisons et partageons vos données en
      lisant ces conditions. Pour plus de détails, ou si vous n'êtes pas
      d'accord avec ces conditions, contactez notre équipe.
    </p>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  components: {},
};
</script>


<style>
.signup {
  display: flex;
  flex-direction: column;
  width: 60vh;
  height: 120%;
  margin: 12vh 0 0 72vh;
  padding: 2vh 0 2vh 0;
  font-size: 80%;
  border: 2px solid orange;
  border-radius: 2px 25px;
}

.conditions {
  text-align: justify;
}

.signUpButton {
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