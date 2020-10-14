<template>
  <div class="home">
    <Navbar />
    <Index />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/navbar.vue";
import Index from "../components/index.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Index,
  },
};
</script>
