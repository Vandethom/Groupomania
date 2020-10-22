<template>
  <div id="home">
    <div class="postContainer">
      <form method="POST">
        <input id="postContent" class="postForm" type="text" />
        <input
          class="formButton"
          type="submit"
          value="Envoyer !"
          v-on:click="sendPost"
        />
        <button v-on:click="sendPost">Envoyer !</button>
      </form>
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
  methods: {
    sendPost() {
      let token = "";
      axios
        .post(
          "http://localhost:3000/api",
          {
            body: document.getElementById("postContent").value,
            userPseudonym: localStorage.getItem("userPseudonym"),
          },
          {
            header: {
              "Content-Type": "application/json",
              Authorization: `Bearer${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          //refresh window.location
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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

.postForm {
  background: #f0f2f5;
  width: 80%;
  height: 45px;
  border: none;
  border-radius: 10px;
}

.formButton {
  background: #51f032;
  border: none;
  border-radius: 10px;
  width: 75px;
  height: 30px;
  margin-left: 2vh;
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