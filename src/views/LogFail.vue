<template>
  <div>
<h1>Błąd podczas próby logowania</h1>
  </div>
</template>

<script>
  export default {
    name:'LogFail',
    created() {
      setTimeout( () => this.$router.push({ path: '/'}), 15000);
    },
  }
</script>

<style lang="scss" scoped>

</style>
