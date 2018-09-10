<template>
    <v-container teal darken-4>
        <v-btn color="primary" :to="{name: 'Home'}">Home</v-btn>
        <v-btn color="primary" v-if="!$store.state.user" :to="{name: 'Login'}">Login</v-btn>
        <v-btn color="primary" v-if="!$store.state.user" :to="{name: 'Register'}">Register</v-btn>
        <v-btn color="primary" v-if="$store.state.user" :to="{name: 'NewPanel'}">Create Panel</v-btn>
        <v-btn color="primary" v-if="$store.state.user" @click="logout">LogOut</v-btn>
    </v-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style scoped>
 .container{
     color:limegreen;
 }
</style>
