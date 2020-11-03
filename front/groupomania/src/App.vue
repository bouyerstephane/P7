<template>
  <div id="app" class="contenair">
    <compHead></compHead>
    <hr>
    <router-view/>
    <compFooter></compFooter>
  </div>


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


<style src="../public/style.css">

</style>
