<template>
  <div id="header">
    <router-link to="/"><img src="../../public/icon-left-font-PS.png" alt="logo"></router-link>

    <div v-if='!user.userId' id="nav">
      <router-link to="/">Login</router-link>
      |
      <router-link to="/signup">Signup</router-link>
    </div>
    <div v-else id="nav">
      <router-link to="/forum">Forum</router-link>
      |
      <router-link to="/account">Mon Compte</router-link>
      |
      <router-link @click.native="disconnect()" to="/">Déconnexion</router-link>

    </div>
  </div>
</template>

<script>
import vuex from "vuex"

export default {

  data() {
    return {
      connected: false
    }
  },
  methods: {
    ...vuex.mapActions([
          "disconnect"
        ]
    )
  },
  computed: {
    ...vuex.mapGetters([
      'user'
    ])
  },

}
</script>

<style>
h1 {
  color: #0024a0;
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

#header img {
  width: 445px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #FD2D01;
}

#nav a.router-link-exact-active {

  color: #0024a0;
}
</style>
