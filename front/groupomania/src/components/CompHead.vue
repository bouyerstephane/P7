<template>
  <header class="row">
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
  </header>
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

</style>
