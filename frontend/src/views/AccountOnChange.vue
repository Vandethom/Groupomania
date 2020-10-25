<template>
  <div id="Account">
    <Navbar />
    <ModifyAccount />
    <router-view />
  </div>
</template>

<script>
import Navbar from "../components/navbar.vue";
import ModifyAccount from "../components/modifyAccount.vue";

export default {
  name: "AccountOnChange",
  components: {
    Navbar,
    ModifyAccount,
  },
  methods: {},
};
</script>

<style>
body {
  background: #f0f2f5;
}

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
