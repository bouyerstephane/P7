<template>
  <div id="signup">
    <h1>Créer un compte</h1>
    <div id="form">
      <div>
        <label for="firstName">Votre prénom</label>
        <input id="firstName" type="text" v-model=firstName></div>
      <div>
        <label for="lastName">Votre nom</label>
        <input type="text" id="lastName" v-model=lastName>
      </div>
      <div>
        <label for="pseudo">Votre pseudo</label>
        <input type="text" id="pseudo" v-model=pseudo>
      </div>
      <div>
        <label for="email">Votre E-mail</label>
        <input type="email" id="email" v-model=email>
      </div>
      <div>
        <label for="password">Votre mot de passe</label>
        <input type="password" id="password" v-model=password>
      </div>
      <button @click=sendAccount()>Création</button>
    </div>
  </div>
</template>

<script>
import store from "../store/index"
import vuex from "vuex"

export default {
  store: store,
  data() {
    return {
      firstName: "",
      lastName: "",
      pseudo: "",
      email: "",
      password: ""
    }
  },
  methods: {
    ...vuex.mapActions({
      signup: "signup"
    }),
    sendAccount() {
      this.signup({
        firstName: this.firstName,
        lastName: this.lastName,
        pseudo: this.pseudo,
        email: this.email,
        password: this.password
      })
    }
  },
  computed: {
    ...vuex.mapGetters([
      'account'
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

<style scoped>
</style>
