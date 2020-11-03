<template>
  <div>
    <div id="head">
      <h1>Commentaires</h1>
      <div v-if="!editing">
        <p>{{ forumCommentary.post.post }}</p>
        <p>Ajouté par {{ forumCommentary.post.pseudo }} le {{ forumCommentary.post.formatedDate }}</p>
        <p v-if="forumCommentary.post.formatedLastModif">Modifié le {{ forumCommentary.post.formatedLastModif }}</p>
        <button v-if="user.userId === forumCommentary.post.userId || user.isAdmin === 1"
                @click="editMessage(forumCommentary.post.post)">Modifier
        </button>
      </div>
      <div v-else>
        <input name="test" id="edit" v-model="forumCommentary.post.post"
               @keyup.esc="resetMessage()" @keyup.enter="validEditMessage()">
        <button @click="validEditMessage()">valider</button>
      </div>
      <textarea name="addCommentary" id="" cols="30" rows="5" v-model="commentary"
                placeholder="Ajouter un commentaire"
                @keyup.enter="addCommentary({userId: user.userId, postId: $route.params.id.split(':')[1], commentary}); commentary ='' "></textarea>
      <button
          @click="addCommentary({userId: user.userId, postId: $route.params.id.split(':')[1], commentary}); commentary ='' ">
        Ajouter
      </button>
    </div>


    <div id="forum" v-for="commentary in forumCommentary.commentaries" :key="commentary.id">
      <div v-if="editingCommentary !== commentary.commentaryId">
        <p>{{ commentary.commentary }}</p>
        <p>Ajouté par: {{ commentary.pseudo }} le {{ commentary.formatedDate }}</p>
        <p v-if="commentary.formatedLastModif">Modifié le {{ commentary.formatedLastModif }}</p>
        <button v-if="user.userId === commentary.userId || user.isAdmin === 1 "
                @click.stop="destroy({userId: user.userId, commentaryId: commentary.commentaryId ,commentaryPostId: $route.params.id.split(':')[1]})">
          supprimer
        </button>
        <button v-if="user.userId === commentary.userId || user.isAdmin === 1 "
                @click="editCommentary(commentary.commentary, commentary.commentaryId)">Modifier
        </button>


      </div>
      <div v-else>
        <input name="test" id="edit" v-model="newCommentary"
               @keyup.esc="editingCommentary = null"
               @keyup.enter="validEditCommentary(commentary.commentaryId, newCommentary)">
        <button
            @click="validEditCommentary(commentary.commentaryId, newCommentary)">
          valider
        </button>
      </div>

    </div>

    <p></p>
  </div>
</template>

<script>
import vuex from "vuex"
import store from "@/store";

export default {
  data() {
    return {
      commentary: "",
      oldMessage: "",
      newCommentary: "",
      editingCommentary: null,
      editing: null
    }
  },
  methods: {
    ...vuex.mapActions({
      getCommentary: "getCommentary",
      addCommentary: "addCommentary",
      destroy: "deletePost",
      modifyPost: "modifyPost"
    }),
    callCommentary() {
      this.getCommentary({userId: this.user.userId, postId: this.$route.params.id.split(':')[1]})
    },
    editCommentary(message, id) {
      this.editingCommentary = id
      this.newCommentary = message
    },

    editMessage(message) {
      this.editing = true
      this.oldMessage = message;
    },
    validEditMessage() {
      this.editing = null
      this.sendModif(this.forumCommentary.post.postId, this.forumCommentary.post.post, "", "")
    },

    validEditCommentary(commentaryId, commentary) {
      this.editingCommentary = null
      this.sendModif("", "", commentaryId, commentary)
    },
    resetMessage() {
      this.editing = null
      this.forumCommentary.post.post = this.oldMessage
    },
    sendModif(postId, post, commentaryId, commentary) {
      this.modifyPost({
        userId: this.user.userId,
        postId,
        post,
        commentaryId,
        commentary,
        commentaryPostId: this.forumCommentary.post.postId
      })
    }

  },
  computed: {
    ...vuex.mapGetters([
      'forumCommentary',
      'user'
    ]),

  },
  mounted() {
    this.callCommentary()
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
</style>
