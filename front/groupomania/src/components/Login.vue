<template>
  <div id="login" class="row">
    <h1 class="col-12">Connection</h1>
    <div id="form" class="contenair">
      <div>
        <label for="pseudo">Pseudo</label>
        <input id="pseudo" type="text" v-model=login.pseudo @keyup.enter=sendlog() required>
      </div>
      <div>
        <label for="password"> Mot de passe</label>
        <input id="password" type="password" v-model=login.password @keyup.enter=sendlog() required>
      </div>
      <button @click=sendlog()>Connection</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import vuex from "vuex"

export default {
  data() {
    return {}
  },
  methods: {
    ...vuex.mapActions({
      login: "login"
    }),

    sendlog() {
      this.login({"pseudo": this.login.pseudo, "password": this.login.password})
    }

  },
  computed: {
    ...vuex.mapGetters([
      'user',
    ])
  },
  beforeRouteEnter(route, from, next) {
    if (!store.getters.user.userId) {
      next()
    } else {
      next("/forum")
    }
  }
}
</script>

<style>


</style>
