<template>
  <div id="header">
    <img src="../../public/icon-left-font-PS.png" alt="logo">
    <div id="nav">
      <router-link to="/">Login</router-link>
      |
      <router-link to="/signup">Signup</router-link>
    </div>
  </div>
  <hr>
</template>

<script>
export default {}
</script>

<style>

#header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #ffffff;
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
