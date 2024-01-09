<template>
  <div>
<h1>Zarejestrowano pomyślnie, nastąpi przekierowanie do logowania</h1>
  </div>
</template>

<script>
  export default {
    name:'Registered',
    created() {
      setTimeout( () => this.$router.push({ path: '/login'}), 15000);
    },
  }
</script>

<style lang="scss" scoped>

</style>
