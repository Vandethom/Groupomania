<!-- Goes in header -->

<template>
  <section>
    <input type="text" class="writingZone" />
  </section>
</template>


<script>
export default {
  name: "CreatePost",
};
</script>


<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

.writingZone {
  padding: 7.5vh 18vh;
}
</style>