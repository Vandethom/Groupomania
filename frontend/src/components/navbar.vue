<!-- Goes in header -->

<template>
  <nav>
    <ul>
      <li class="logo">
        <a href="index.html">
          <img src="../../images/navbarIcon.png" alt="Site Icon" />
        </a>
      </li>
      <li class="item">
        <i class="fas fa-search"></i>
        <input class="searchBar" type="text" placeholder="Search" />
      </li>
      <li class="item">Se connecter</li>
      <li class="has-submenu">
        Mon compte
        <ul class="submenu">
          <li class="subItem">Mes données</li>
          <li class="subItem">Paramètres</li>
          <li class="subItem">Déconnexion</li>
        </ul>
      </li>
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
  background: #222;
  padding: 5px 0 0 0;
  position: absolute;
  top: 0;
  width: 100%;
}

ul {
  display: flex;
  justify-content: space-around;
  color: white;
  list-style-type: none;
}

li {
  cursor: pointer;
}

a {
  color: white;
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
  line-height: 3vh;
  width: 500px;
  border-radius: 6px 6px;
}
</style>