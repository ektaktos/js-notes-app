<template>
  <div class="container">
    <div class="notes">
      <div class="note-links">
        <router-link to="/">
          Notes
        </router-link>
         |
         <router-link to="/add">
          Add Note
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="css" src="../styles.css">
/* Styles from stylesheet */
</style>
