<template>
  <div>
    <h2>Connection</h2>

    <div id="form">
      <div>
        <label for="pseudo">Pseudo: </label>
        <input id="pseudo" type="text" v-model=pseudo required>
      </div>
      <div>
        <label for="password"> Mot de passe: </label>
        <input id="password" type="password" required>
      </div>
      <input id="submit" type="submit" @click=test()>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pseudo: "",
      password: ""
    }
  },
  methods: {
    test() {
      console.log(this.pseudo)
    }
  },

  computed: {}
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
