<template>
  <div id="home">
    <div class="postContainer">
      <form @submit.prevent="sendPost" enctype="multipart/form-data">
        <label
          >Qu'avez-vous à dire aujourd'hui?<input
            id="postContent"
            class="postForm"
            type="text"
        /></label>
        <label class="labels" for="toPostImage">Image:</label>
        <input
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
        <p id="pseudo" class="userPseudonym">{{ item.userPseudonym }}</p>
        <img
          class="postImage"
          v-if="item.image"
          :src="item.image"
          alt="image postée par utilisateur"
        />
        <p class="postBody">{{ item.body }}</p>
        <div>
          <router-link :to="`/post/${item.postId}`">
            <button class="viewCommentsButton">Commentaires</button>
            <button class="deleteButton" @click="deletePost" v-if="admin == 1">
              Supprimer
            </button>
          </router-link>
        </div>
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
      admin: null,
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

    const userId = localStorage.getItem("id");

    axios
      .get(`http://localhost:3000/api/auth/account/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.admin = response.data[0].isAdmin;
        console.log(this.user);
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
  background: #257415;
  border: none;
  border-radius: 10px;
  width: 75px;
  height: 30px;
  margin-top: 1vh;
  margin-left: 2vh;
  color: white;
  font-weight: bold;
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

#toPostImage {
  border: none;
  border-radius: 10px;
  background: rgb(231, 140, 21);
  width: 50%;
}

.labels {
  display: none;
}

.postsList {
  display: flex;
  flex-direction: column-reverse;
}

.underline {
  display: block;
  border-bottom: 2px solid #dadde1;
  width: 185px;
  margin: auto;
  margin-top: 1.5vh;
  margin-bottom: 2vh;
}

.deleteButton {
  width: 150px;
  height: 30px;
  align-self: center;
  border: none;
  border-radius: 15px;
  background: rgb(231, 140, 21);
  color: white;
  font-weight: bold;
}

.viewCommentsButton {
  width: 150px;
  height: 30px;
  align-self: center;
  border: none;
  border-radius: 15px;
  background: rgb(109, 121, 65);
  color: white;
  margin-left: 1.5vh;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .postContainer {
    width: 275px;
    margin: auto;
    margin-bottom: 2vh;
    padding: 10px 10px 10px 10px;
    border: 1px solid gray;
    border-radius: 15px;
    box-shadow: 1px 1px 3px gray, -1px -1px 3px gray;
  }

  .displayPost {
    margin: auto;
    margin-bottom: 2vh;
    width: 275px;
  }
}
</style>