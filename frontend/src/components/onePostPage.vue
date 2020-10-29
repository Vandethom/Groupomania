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
        <div class="commentsList">
          <div
            class="displayComment"
            v-for="item in comments"
            v-bind:key="item.commentBody"
          >
            <p class="userPseudonym">{{ item.commentUserPseudonym }}:</p>
            <p class="postBody">{{ item.commentBody }}</p>
          </div>
        </div>
        <div>
          <form @submit.prevent="sendComment" enctype="multipart/form-data">
            <input id="commentContent" class="postForm" type="text" />
            <input class="formButton" type="submit" value="Envoyer !" />
          </form>
          <button
            class="deleteButton"
            @click="deletePost"
            v-if="user == storageUser"
          >
            Button
          </button>
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
      comments: null,
      user: null,
      storageUser: localStorage.getItem("userPseudonym"),
      postId: null,
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
        this.user = this.post.userPseudonym;
        this.postId = this.post.postId;
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:3000/api/${postId}/comments`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.comments = response.data.response;
        console.log(this.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    sendComment() {
      const postId = this.$route.params.id;
      axios
        .post(`http://localhost:3000/api/comment/${postId}`, {
          commentBody: document.getElementById("commentContent").value,
          commentUserPseudonym: localStorage.getItem("userPseudonym"),
        })
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deletePost() {
      //const user = localStorage.getItem("userPseudonym");
      //const postUser = this.user;
      const postId = this.postId;
      axios
        .delete(`http://localhost:3000/api/${postId}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((window.location.href = `http://localhost:8080/?#/`))
        .catch((error) => console.log(error));
    },
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

.displayComment {
  border: 0.5px solid black;
  border-radius: 15px;
  margin-bottom: 1vh;
  padding: 0 0.7vh 0 0.7vh;
}

#commentContent {
  background: #f0f2f5;
  width: 80%;
  height: 45px;
  border: none;
  border-radius: 10px;
}

.userPseudonym {
  align-self: flex-start;
  font-weight: bold;
  margin-right: 2.5vh;
}

.formButton {
  background: #51f032;
  border: none;
  border-radius: 10px;
  width: 75px;
  height: 30px;
  margin-top: 1vh;
  margin-left: 2vh;
  color: white;
  font-weight: bold;
}

.postImage {
  align-self: center;
  max-width: 100%;
  max-height: 300px;
}

.postBody {
  text-align: center;
  align-self: center;
}
</style>