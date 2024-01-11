<template>
  <div>
    <h1>Wylogowano poprawnie, zaraz nastąpi przekierowanie do strony logowania</h1>
  </div>
</template>

<script>
import * as actionTypes from '@/stores/action-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
  export default {
    name: 'Logout',
    methods: {
      onLogout() {
        this.logoutUser();
    },
    },
    setup() {
    const userStore = useUserStore();

    // Access getters
    const userStatus = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const adminStatus = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);
    const userToken = computed(() => userStore.GET_CURRENT_USER_TOKEN);
    const logoutUser = () => {
       userStore.LOGOUT();
    };
    return {
      userStatus,
      adminStatus,
      userToken,
      logoutUser,
    };
  },
    created(){
      this.logoutUser();
      setTimeout( () => this.$router.push({ path: '/login'}), 5000);
}
  }
</script>

<style lang="scss" scoped>

</style>
