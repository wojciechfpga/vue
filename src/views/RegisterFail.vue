<template>
  <div>
<h1>Nastąpił błąd podczas ejestracji, nastąpi powrót do strony głównej</h1>
  </div>
</template>

<script>
  export default {
    name:'RegisterFail',
    created() {
      setTimeout( () => this.$router.push({ path: '/'}), 15000);
    },
  }
</script>

<style lang="scss" scoped>

</style>
