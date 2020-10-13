<template>
  <div id="app">
    <Navbar />
    <SideMenu />
    <AccountView />
    <!--    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
import Navbar from "../components/navbar.vue";
import SideMenu from "../components/sideMenu.vue";
import AccountView from "../components/accountView.vue";

export default {
  name: "App",
  components: {
    Navbar,
    SideMenu,
    AccountView,
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
