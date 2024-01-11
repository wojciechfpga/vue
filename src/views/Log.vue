<template>
  <div>
    <div v-show="logstatuser || logstatadmin">
      <h1>Zalogowano poprawnie</h1>
    </div>
    <div v-show="!logstatuser && !logstatadmin">
      <h1>Zalogowano niepoprawnie</h1>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import * as getterTypes from '@/stores/getter-types';
  export default {
    name:'Log',
    created() {
      setTimeout( () => this.$router.push({ path: '/'}), 15000);
    },

  setup() {
    const userStore = useUserStore();

    // Access getters
    const logstatuser = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const logstatadmin = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);

    return {
      logstatuser,
      logstatadmin 
    };
  },
  }
</script>

<style lang="scss" scoped>

</style>
