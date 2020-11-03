<template>
  <div>
    <h2>Créer un compte</h2>
    <div id="form">
      <div>
        <label for="firstName">Votre prénom : </label>
        <input id="firstName" type="text" v-model=firstName></div>
      <div>
        <label for="lastName">Votre nom : </label>
        <input type="text" id="lastName" v-model=lastName>
      </div>
      <div>
        <label for="pseudo">Votre pseudo : </label>
        <input type="text" id="pseudo" v-model=pseudo>
      </div>
      <div>
        <label for="email">Votre E-mail : </label>
        <input type="email" id="email" v-model=email>
      </div>
      <div>
        <label for="password">Votre mot de passe : </label>
        <input type="password" id="password" v-model=password>
      </div>
      <input id="submit" type="submit" @click=sendAccount()>
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
h2 {
  color: #0024a0;
}

#form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#form div {
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 25px;
  margin-bottom: 5px;
}

#form div label {
  color: #0024a0;
  font-weight: bold;
  width: 215px;
  text-align: right;

}

#form div input {
  width: 250px;
}

#submit {
  width: 100px;
}
</style>
