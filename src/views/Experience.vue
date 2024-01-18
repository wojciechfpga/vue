<template>
    <div v-if="userStatus || adminStatus">
    <div class="experience-container">

      <div class="experience-box">
        <h2>Provide Systems</h2>
        <div class="gradient-line"></div>
        <h3>Programista</h3>
        <h4>Maj 2022 - Grudzień 2023</h4>

        <div class="gradient-line"></div>
        <div class="technology-images">
          <img src="https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png" alt="Technology 1">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Technology 2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png" alt="Technology 3">
        </div>
      </div>
      <div class="experience-box">
        <h2>PCO S.A.</h2>
        <div class="gradient-line"></div>
        <h3>Programista</h3>
        <h4>Maj 2021 - Maj 2022</h4>

        <div class="gradient-line"></div>
        <div class="technology-images">
          <img src="https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png" alt="Technology 1">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Technology 2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png" alt="Technology 3">
        </div>
      </div>

      <div class="experience-box">
        <h2>FastLogic</h2>
        <div class="gradient-line"></div>
        <h3>Software Developer</h3>
        <h4>Wrzesień 2020 - Grudzień 2020</h4>

        <div class="gradient-line"></div>
        <div class="technology-images">
          <img src="https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png" alt="Technology 1">
        </div>
      </div>

      <div class="experience-box">
        <h2>is-wireless</h2>
        <div class="gradient-line"></div>
        <h3>Junior Software Developer</h3>
        <h4>Styczeń 2019 - Lipiec 2019</h4>

        <div class="gradient-line"></div>
        <div class="technology-images">
          <img src="https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png" alt="Technology 1">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" alt="Technology 2">
        </div>
      </div>

      <div class="experience-box">
        <h2>PIT-RADWAR S.A.</h2>
        <div class="gradient-line"></div>
        <h3>R&D/Programista</h3>
        <h4>Maj 2022 - Grudzień 2023</h4>

        <div class="gradient-line"></div>
        <div class="technology-images">
          <img src="https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png" alt="Technology 1">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" alt="Technology 4">
        </div>
      </div>



  </div>
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
.gradient-line {
  height: 1px;
  background: linear-gradient(to right, #3498db, #ffffff);
  margin: 8px 0;
}

.experience-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.experience-box {
  border: 3px solid blue;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  width: 300px;
}

h2 {
  margin-bottom: 10px;
  color: #333;
}

p {
  margin: 0;
  color: #666;
}

.technology-images {
  margin-top: 10px;
}

.technology-images img {
  width: 50px;
  /* Adjust the width as needed */
  margin-right: 5px;
}
</style>
