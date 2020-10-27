<template>
  <div id="home">
    <div class="postContainer">
      <form @submit.prevent="sendPost" enctype="multipart/form-data">
        <input id="postContent" class="postForm" type="text" />
        <i class="far fa-images"></i
        ><input
          v-on:change="handleFileUpload"
          type="file"
          ref="image"
          name="image"
          id="toPostImage"
        />
        <input class="formButton" type="submit" value="Envoyer !" />
      </form>
    </div>
    <div class="postsList">
      <div class="displayPost" v-for="item in posts" v-bind:key="item.body">
        <p class="userPseudonym">{{ item.userPseudonym }}:</p>
        <img
          class="postImage"
          v-if="item.image"
          :src="item.image"
          alt="image postée par utilisateur"
        />
        <p class="postBody">{{ item.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import requestpromise from "request-promise";
//import VueMeta from "vue-meta";

export default {
  name: "Index",
  data() {
    return {
      posts: null,
      image: null,
    };
  },
  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
      console.log(this.image);
    },
    sendPost() {
      const formData = new FormData();
      formData.append("body", document.getElementById("postContent").value);
      formData.append("userPseudonym", localStorage.getItem("userPseudonym"));
      formData.append("image", this.image);

      const body = document.getElementById("postContent").value;
      const userPseudonym = localStorage.getItem("userPseudonym");

      let token = "";

      if (!userPseudonym) {
        alert("Assurez-vous d'être connecté avant de poster quoi que ce soit.");
      } else if (!body) {
        alert("Assurez vous d'entrer un message avant de le publier 😉 ");
      } else {
        axios
          .post("http://localhost:3000/api", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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
  flex-direction: column;
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
  align-self: flex-start;
  font-weight: bold;
  margin-right: 2.5vh;
}

.postBody {
  text-align: justify;
  align-self: center;
}

.postImage {
  align-self: center;
  max-width: 300px;
  max-height: 300px;
}

.postsList {
  display: flex;
  flex-direction: column-reverse;
}
</style>