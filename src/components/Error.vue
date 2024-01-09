<template>
  <div>
      <h1> Wystąpił błąd w trakcie ładowania wiadomosci od uzytkownikow</h1>
  </div>
</template>

<script>
import * as actionTypes from '@/stores/action-types';
export default {
  name: 'Error',
  created() {
    //this.$store.dispatch(actionTypes.CLEAR_MESSAGE);
  },
};
</script>

<style lang="scss" scoped>

</style>
