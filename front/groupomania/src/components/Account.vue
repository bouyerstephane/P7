<template>
  <div>
    <h1>Informations utilisateur</h1>
    <div v-if="!editing">
      <p>Prénom : {{ getUser.firstName }}</p>
      <p>Nom : {{ getUser.lastName }}</p>
      <p>Pseudo : {{ getUser.pseudo }}</p>
      <p>Email : {{ getUser.email }}</p>
      <button @click="editing = true">Modifier vos informations personnelles</button>
    </div>
    <div v-else>
      <label for="firstName">Prénom : </label>
      <input @keyup.enter="sendModif()" id="firstName" type="text" v-model="getUser.firstName">
      <label for="lastName">Nom : </label>
      <input @keyup.enter="sendModif()" id="lastName" type="text" v-model="getUser.lastName">
      <label for="pseudo">pseudo : </label>
      <input @keyup.enter="sendModif()" id="pseudo" type="text" v-model="getUser.pseudo">
      <label for="email">Email : </label>
      <input @keyup.enter="sendModif()" id="email" type="text" v-model="getUser.email">
      <label for="modifyPassword">Nouveau mot de passe : </label>
      <input @keyup.enter="sendModif()" id="modifyPassword" type="text" v-model="modifyPassword">
      <label for="oldPassword">Pour modifier, confirmer votre mot de passe : </label>
      <input @keyup.enter="sendModif()" type="password" id="oldPassword" v-model="password">

      <button @click="sendModif()">Valider les modifications</button>
      <button @click="editing = false; getUserAction(user.userId)">Annuler</button>
    </div>

    <div>
      <h2>Supprimer le compte</h2>
      <label for="password">Pour supprimer votre compte, veuillez confirmer votre mot de passe : </label>
      <input type="password" id="password" v-model="deletePasword"
             @keyup.enter="accountDelete({userId: user.userId, password: deletePasword})"><br>
      <button @click="accountDelete({userId: user.userId, password: deletePasword})">Supprimer le compte</button>
    </div>

  </div>
</template>

<script>
import vuex from "vuex"
import store from "@/store";

export default {
  data() {
    return {
      editing: false,
      modifyPassword: "",
      password: "",
      deletePasword: ""
    }
  },
  methods: {
    ...vuex.mapActions({
      getUserAction: "getUser",
      accountDelete: "accountDelete",
      modifyUser: "modifyUser"
    }),
    sendModif() {
      this.modifyUser({
        userId: this.user.userId,
        firstName: this.getUser.firstName,
        lastName: this.getUser.lastName,
        pseudo: this.getUser.pseudo,
        email: this.getUser.email,
        modifyPassword: this.modifyPassword,
        password: this.password
      })
      this.editing = false
    }
  },
  computed: {
    ...vuex.mapGetters([
      "user",
      "getUser"
    ])
  },
  mounted() {
    this.getUserAction(this.user.userId)
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

<style scoped>

</style>
