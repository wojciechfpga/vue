<template>
  <div>
    <h1>Wylogowano poprawnie, zaraz nastąpi przekierowanie do strony logowania</h1>
  </div>
</template>

<script>
import * as actionTypes from '@/store/action-types';
  export default {
    name: 'Logout',
    methods: {
      onLogout() {
        this.$store.dispatch(actionTypes.LOGOUT);
    },
    },
    created(){
      this.$store.dispatch(actionTypes.LOGOUT);
      setTimeout( () => this.$router.push({ path: '/login'}), 5000);
}
  }
</script>

<style lang="scss" scoped>

</style>
