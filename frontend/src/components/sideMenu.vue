<!-- Goes in header -->

<template>
  <section>
    <nav>
      <ul>
        <li>
          <i class="icons fas fa-user-circle"></i>
          <router-link :to="{ name: 'Account', params: { userId: userId } }">
            <a href="#">Mon compte</a>
          </router-link>
        </li>
        <li>
          <i class="icons fas fa-user-friends"></i>
          <a href="#">Amis</a>
        </li>
        <li>
          <i class="icons fas fa-users"></i>
          <a href="#">Groupes</a>
        </li>
        <li>
          <i class="icons far fa-heart"></i>
          <a href="#">Mes favoris</a>
        </li>
      </ul>
    </nav>
  </section>
</template>


<script>
export default {
  name: "SideMenu",
};
</script>


<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

section {
  width: 30vh;
}

a {
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: bold;
}

nav {
  margin: 8vh 0 0 20vh;
}

ul {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  background: #f0f2f5;
}

.icons {
  margin-right: 18px;
}

li {
  display: flex;
  align-content: space-around;
  margin: 12px 0 22px 0;
}
</style>