<!-- Goes in header -->

<template>
  <nav>
    <ul>
      <li class="logo">
        <router-link to="/home">
          <img src="../../images/navbarIco.png" alt="Site Icon" />
        </router-link>
      </li>
      <li class="item">
        <i class="fas fa-search"></i>
        <input class="searchBar" type="text" placeholder="Search" />
      </li>
      <router-link to="/authentication">
        <li class="item">Se connecter</li>
      </router-link>
      <router-link to="/createAccount">
        <li class="item">Créer un compte</li>
      </router-link>
      <router-link to="/account">
        <li>Mon compte</li>
      </router-link>
    </ul>
  </nav>
</template>


<script>
export default {
  name: "Navbar",
};
/*
toggleHideDisplay(submenu);

function toggleHideDisplay() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} */
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
  color: #fd2d01;
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
</style>