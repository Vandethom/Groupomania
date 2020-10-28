<template>
  <div class="onePost">
    <OnePostPage />
  </div>
</template>

<script>
import OnePostPage from "../components/onePostPage.vue";

export default {
  name: "Post",
  components: {
    OnePostPage,
  },
};
</script>

<style>
body {
  background: #f0f2f5;
}
</style>