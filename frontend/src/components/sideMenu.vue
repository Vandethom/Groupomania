<!-- Goes in header -->

<template>
  <section>
    <nav>
      <ul>
        <li>
          <i class="icons fas fa-user-circle"></i>
          <a href="#">Mon compte</a>
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

a {
  text-decoration: none;
  color: rgb(243, 242, 237);
}

ul {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20vh;
  top: 7vh;
  list-style-type: none;
  background-color: rgb(54, 45, 45);
  color: rgb(243, 242, 237);
  width: 25vh;
  height: 90vh;
}

.icons {
  margin-right: 18px;
}

li {
  margin: 12px 0 22px 0;
}
</style>