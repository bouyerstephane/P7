<template>
  <div>
    <h2>Créer un compte</h2>
    <div id="form">
      <div>
        <label for="firstName">Votre prénom : </label>
        <input id="firstName" type="text" v-model=account.firstName></div>
      <div>
        <label for="lastName">Votre nom : </label>
        <input type="text" id="lastName" v-model=account.lastName>
      </div>
      <div>
        <label for="pseudo">Votre pseudo : </label>
        <input type="text" id="pseudo" v-model=account.pseudo>
      </div>
      <div>
        <label for="email">Votre E-mail : </label>
        <input type="email" id="email" v-model=account.email>
      </div>
      <div>
        <label for="password">Votre mot de passe : </label>
        <input type="password" id="password" v-model=account.password>
      </div>
      <input id="submit" type="submit" @click=sendAccount()>
    </div>
    <p>{{ account }}</p>
    <p>{{ errormsg.message }}</p>


  </div>
</template>

<script>
import store from "../store/index"
import vuex from "vuex"

export default {
  store: store,
  data() {
    return {}
  },
  methods: {
    ...vuex.mapActions({
      signup: "signup"
    }),
    sendAccount() {
      this.signup({
        firstName: this.account.firstName,
        lastName: this.account.lastName,
        pseudo: this.account.pseudo,
        email: this.account.email,
        password: this.account.password
      })
    }
  },
  computed: {
    ...vuex.mapGetters([
      'account',
      'errormsg'
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
