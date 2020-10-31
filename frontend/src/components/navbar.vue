<!-- Goes in header -->

<template>
  <nav>
    <ul>
      <li class="logo">
        <router-link to="/">
          <img src="../../images/navbarIco.png" alt="Site Icon" />
        </router-link>
      </li>
      <!--<li class="item">
        <i class="fas fa-search"></i>
        <input class="searchBar" type="text" placeholder="Search" />
      </li>-->
      <router-link to="/authentication">
        <i class="icon fas fa-sign-in-alt"></i>
        <li class="item connectItem">Se connecter</li>
      </router-link>
      <router-link to="/createAccount">
        <i class="icon fas fa-user-alt"></i>
        <li class="item signUpItem">Créer un compte</li>
      </router-link>
      <div>
        <i class="icon fas fa-sign-out-alt" @click="disconnect"></i>
        <li class="item disconnectItem" v-on:click="disconnect">Déconnexion</li>
      </div>
    </ul>
  </nav>
</template>


<script>
import jwt_decode from "jwt-decode";

export default {
  name: "Navbar",
  data() {
    return {
      userId: "",
    };
  },
  methods: {
    getToken() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      this.userId = decoded.userId;
      localStorage.setItem("id", this.userId);
    },
    disconnect() {
      console.log("anything");
      alert("Vous êtes bien déconnecté, à très vite !");
      localStorage.clear();
    },
  },

  mounted() {
    this.getToken();
  },
};
</script>


<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

nav {
  background: #ffffff;
  padding: 5px 0 0 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  box-shadow: 0.5px 0.5px 4px #fd2d01;
}

ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
}

li {
  cursor: pointer;
  color: #b40000;
  font-weight: bold;
  justify-self: baseline;
}

a {
  text-decoration: none;
}

img {
  width: 190px;
  height: 40px;
  margin-left: 100px;
}

.item {
  line-height: 5vh;
}

.searchBar {
  border: none;
  background: #e8f0fe;
  line-height: 4vh;
  width: 500px;
  padding-left: 5px;
  border-radius: 6px 6px;
}

.fa-search {
  margin-right: 4px;
}

@media only screen and (max-width: 600px) {
  ul {
    display: flex;
    flex-direction: row;
  }
  .connectItem,
  .signUpItem,
  .disconnectItem {
    visibility: hidden;
  }

  .icon {
    margin: 25px 0 -20px 0;
  }

  .logo {
    display: none;
  }
  nav {
    background: white;
  }
}
</style>