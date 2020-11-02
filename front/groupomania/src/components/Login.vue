<template>
  <div>
    <h1>Connection</h1>
    <div id="form">
      <div>
        <label for="pseudo">Pseudo: </label>
        <input id="pseudo" type="text" v-model=login.pseudo @keyup.enter=sendlog() required>
      </div>
      <div>
        <label for="password"> Mot de passe: </label>
        <input id="password" type="password" v-model=login.password @keyup.enter=sendlog() required>
      </div>
      <input id="submit" type="submit" @click=sendlog()>
    </div>
    <p>{{ errormsg.message }}</p>
  </div>
</template>

<script>
//import vue from "vue"
import store from "../store/index"
import vuex from "vuex"

export default {
  store: store,
  data() {
    return {}
  },
  methods: {
    ...vuex.mapActions({
      login: "login"
    }),

    sendlog() {
      this.login({"pseudo": this.login.pseudo, "password": this.login.password})
      //location.reload()
    }

  },
  computed: {
    ...vuex.mapGetters([
      'user',
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

#form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#form div {
  display: flex;
  justify-content: space-between;
  width: 425px;
  height: 25px;
  margin-bottom: 5px;
}

#form div label {
  color: #0024a0;
  font-weight: bold;
  width: 150px;
  text-align: right;

}

#form div input {
  width: 250px;
}

#submit {
  width: 100px;
}


</style>
