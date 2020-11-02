<template>
  <div>
    <h1>Supprimer le compte</h1>
    <label for="password">Pour supprimer votre compte, veuillez confirmer votre mot de passe</label>
    <input type="password" id="password" v-model="password">
    <button @click="accountDelete({userId: user.userId, password})">Supprimer le compte</button>
  </div>
</template>

<script>
import vuex from "vuex"
import store from "@/store";

export default {
  data() {
    return {
      password: ""
    }
  },
  methods: {
    ...vuex.mapActions({
      accountDelete: "accountDelete"
    })
  },
  computed: {
    ...vuex.mapGetters([
      "user"
    ])
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
