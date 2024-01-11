<template>
    <div v-if="userStatus||adminStatus">
        <h1>Doświadczenie</h1>
        <h2>Provide Systems</h2>
        <p> C#/Vue.js programista</p>
        <p>2022-2023</p>
        <h2>PCO S.A.</h2>
        <p> C#/Anglular programista</p>
        <p>2021-2022</p>
        <h2>Fast Logic</h2>
        <p>C# programista</p>
        <p>2020</p>
        <h2>is-wireless</h2>
        <p>C#/C++ programista</p>
        <p>2019</p>
        <h2>PIT-RADWAR</h2>
        <p>C#/C programista</p>
        <p> 2017-2018</p>
    </div>
    <div v-else>
      <h1>Proszę się zalogować (dane w CV) aby zobaczyć tę stronę</h1>
    </div>
</template>

<script>
import * as getterTypes from '@/stores/getter-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
export default {
  name: 'Experience',
  setup() {
    const userStore = useUserStore();

    // Access getters
    const userStatus = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const adminStatus = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);
    const userToken = computed(() => userStore.GET_CURRENT_USER_TOKEN);

    return {
      userStatus,
      adminStatus,
      userToken,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
