<template>
  <div>
    <div v-show="logstatuser || logstatadmin">
      <p>Zalogowano poprawnie</p>
    </div>
    <div v-show="!logstatuser && !logstatadmin">
      <p>Zalogowano niepoprawnie</p>
    </div>
<p>{{ logstatadmin }}</p>
<p>{{ logstatuser }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as getterTypes from '@/store/getter-types';
  export default {
    name:'Log',
    created() {
      setTimeout( () => this.$router.push({ path: '/'}), 15000);
    },
    computed: {
    ...mapGetters({
      logstatadmin: getterTypes.GET_CURRENT_USER_ADMIN_STATUS,
      logstatuser:getterTypes.GET_CURRENT_USER_STATUS,
    },
    ),
  },
  }
</script>

<style lang="scss" scoped>

</style>
