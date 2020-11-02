<template>
  <div>
    <div id="head">
      <h1>Forum</h1>
      <textarea name="addPost" id="addPost" cols="150" rows="10" v-model="post"
                @keyup.enter="addPost({userId: user.userId, post})"></textarea>
      <button @click="addPost({userId: user.userId, post})">Ajouter un message</button>
    </div>

    <div id="forum">
      <div v-for="post in forum.posts" v-bind:key="post.id" class="forum_content" @click="commentary(post.postId)">
        <p>{{ post.post }}</p>
        <p>Ajouté par {{ post.pseudo }} le {{ post.date }}</p>
        <p v-if="post.lastModif">Modifier le {{ post.lastModif }}</p>
        <button v-if="user.userId === post.userId || user.isAdmin === 1 "
                @click.stop="destroy({userId: user.userId, postId: post.postId})">
          supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import vuex from "vuex"
import router from "@/router";

export default {
  data() {
    return {
      post: ""
    }
  },

  methods: {
    ...vuex.mapActions({
      disconnect: "disconnect",
      getForum: "getForum",
      destroy: "deletePost",
      addPost: "addPost",
      getCommentary: "getCommentary"
    }),
    callForum() {
      this.getForum(this.user.userId)
    },
    commentary(id) {
      router.push("/forum:" + id)
    },
  },

  computed: {
    ...vuex.mapGetters([
      "forum",
      "user"
    ]),
  },

  mounted() {
    this.callForum()
    console.log("test")
  },

  beforeRouteEnter(route, from, next) {
    if (store.getters.user.userId) {
      next()
    } else {
      next("/")
    }
  }

}
</script>

<style>
#head {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
}

#head textarea {
  margin: 0 auto;
  width: 80%;
}

#head button {
  margin: 10px auto 5px;
  width: 10%;
}

#forum {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#forum .forum_content {
  padding: 5px;
  margin: 10px auto;
  width: 80%;
  border: solid #0024a0 1px;
  box-shadow: #4e71ea 0px 0px 7px 1px;
}

#forum .forum_content:hover {
  transition: 200ms;
  transform: scale(1.02);
  cursor: grab;
}

</style>
