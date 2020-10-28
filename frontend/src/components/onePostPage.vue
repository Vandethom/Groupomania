<template>
  <div class="post">
    <div class="postsList">
      <div class="onePost" v-bind:key="post.body">
        <p class="userPseudonym">{{ post.userPseudonym }}:</p>
        <img
          class="postImage"
          v-if="post.image"
          :src="post.image"
          alt="image postée par utilisateur"
        />
        <p class="postBody">{{ post.body }}</p>
        <div>
          <form @submit.prevent="sendPost" enctype="multipart/form-data">
            <input id="postContent" class="postForm" type="text" />
            <input class="formButton" type="submit" value="Envoyer !" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OnePostPage",
  data() {
    return {
      post: null,
    };
  },
  mounted() {
    const postId = this.$route.params.id;

    axios
      .get(`http://localhost:3000/api/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("anything");
        this.post = response.data.response[0];
        console.log(this.post);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    sendComment() {},
  },
};
</script>

<style>
body {
  background: #f0f2f5;
}

.post {
  display: flex;
  flex-direction: column;
  background: white;
  width: 45%;
  margin: -30vh 0 0 58vh;
  padding: 10px 10px 10px 10px;
  border: 1px solid gray;
  border-radius: 15px;
  box-shadow: 1px 1px 3px gray, -1px -1px 3px gray;
}

.userPseudonym {
  align-self: flex-start;
  font-weight: bold;
  margin-right: 2.5vh;
}

.postImage {
  align-self: center;
  max-width: 300px;
  max-height: 300px;
}

.postBody {
  text-align: center;
  align-self: center;
}
</style>