<!-- Goes in header -->

<template>
  <section>
    <textarea
      cols="65"
      rows="10"
      placeholder="Qu'avez-vous à raconter aujourd'hui?"
      class="writingZone"
    />
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
  /* padding: 7.5vh 18vh;*/
  margin-top: 10vh;
}
</style>