<template>
  <div id="home">
    <div class="postContainer">
      <textarea
        name="post"
        id="postZone"
        cols="80"
        rows="10"
        placeholder="Qu'avez-vous à dire aujourd'hui?"
      ></textarea>
    </div>
    <div class="displayPost" v-for="item in posts" v-bind:key="item.body">
      <p class="userPseudonym">{{ item.userPseudonym }}:</p>
      <p class="postBody">{{ item.body }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      posts: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.posts = response.data.response;
        console.log(this.posts);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
body {
  background: #f0f2f5;
}
#home {
  margin: 100px 150px 0 0;
}

.postContainer {
  background: white;
  width: 45%;
  margin: -40vh 0 0 58vh;
  padding: 10px 10px 10px 10px;
  border: 1px solid gray;
  border-radius: 15px;
  box-shadow: 1px 1px 3px gray, -1px -1px 3px gray;
}

.displayPost {
  display: flex;
  background: white;
  width: 45%;
  margin: 3vh 0 0 58vh;
  padding: 10px 10px 10px 10px;
  border: 1px solid gray;
  border-radius: 15px;
  box-shadow: 1px 1px 3px gray, -1px -1px 3px gray;
}

textarea {
  background: #f0f2f5;
  border-radius: 25px;
  padding: 9px 9px 9px 9px;
}

.userPseudonym {
  font-weight: bold;
  margin-right: 2.5vh;
}

.postBody {
  text-align: justify;
}
</style>