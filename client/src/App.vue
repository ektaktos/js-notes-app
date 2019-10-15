<template>
  <div class="container">
    <div class="notes">
      <div class="note-links row offset-md-5">
        <router-link to="/">
          Notes
        </router-link>
         |
        <router-link to="/add">
          Add Note
        </router-link>
        <div v-if="!loggedIn">
        |
        <router-link to="/login">
          Login
        </router-link>
        |
         <router-link to="/register">
          Register
        </router-link>
        </div>
        <div v-else>
        |
        <router-link to="/logout">
          Logout
        </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      loggedIn: true
    }
  },
  methods:{
    checkAuth: function(){
      const auth = localStorage.getItem("token");
      if (auth) {
        this.loggedIn = true
      }else{
        this.loggedIn = false
      }
    },
    say: function (message) {
      alert(message)
    }
  },
  updated(){
    this.checkAuth()
  },
}
</script>

<style lang="css" src="../styles.css">
/* Styles from stylesheet */
</style>
