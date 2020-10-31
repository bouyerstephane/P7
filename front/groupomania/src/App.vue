<template>
  <compHead></compHead>
  <router-view/>
  <compFooter></compFooter>


</template>

<script>
import CompHead from "./components/CompHead.vue";
import CompFooter from "./components/CompFooter.vue";

export default {
  components: {
    CompHead, CompFooter
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}


</style>
