<template>
  <div class="authentication">
    <Navbar />
    <SignUp />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/navbar.vue";
import SignUp from "../components/signup.vue";

export default {
  name: "CreateAccount",
  components: {
    Navbar,
    SignUp,
  },
};
</script>
