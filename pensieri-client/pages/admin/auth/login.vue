<template>
  <div>
    <form v-model = "User" v-on:submit.prevent = "login()">
      <input type = "email" placeholder = "Email" v-model = User.email>
      <input type = "password" placeholder = "Password" v-model = User.password>
      <input type = "submit" value = "Login">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      User: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      var user = {
        email: this.User.email,
        password: this.User.password
      }
      axios.post('', user);
    }
  }
}
</script>

<style scoped>

</style>
