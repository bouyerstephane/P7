<template>
  <div id="forum">
    <div class="head">
      <h1>Forum</h1>
      <textarea rows="5" id="addPost" placeholder="Ajouter un message" v-model="post"
                @keyup.enter="addPost({userId: user.userId, post}); post = '' "></textarea>
      <button @click="addPost({userId: user.userId, post}); post = ''">Ajouter</button>
    </div>

    <div class="body" v-for="post in forum.posts" v-bind:key="post.id" @click="commentary(post.postId)">
      <div class="forum_content">
        <p>{{ post.post }}</p>
        <p class="date">Ajouté par {{ post.pseudo }} le {{ post.formatedDate }}</p>
        <p class="date" v-if="post.formatedLastModif">Modifier le {{ post.formatedLastModif }}</p>
      </div>
      <button v-if="user.userId === post.userId || user.isAdmin === 1 "
              @click.stop="destroy({userId: user.userId, postId: post.postId})">
        supprimer
      </button>
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

