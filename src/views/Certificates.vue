<template>
  <div>
    <div v-if="userStatus || adminStatus">
      <h1>Certyfikaty</h1>


      <div class="column">
        <div class="styled-box" @click="redirectToPageVueB()">
          <img src="https://static01.helion.com.pl/global/okladki/145x218/vvujev.jpg" alt="Your Image Description">


        </div>

        <div class="styled-box">

          <embed
            src="https://storagekontowojtek.blob.core.windows.net/article-images/3fd11fe896c1eb76ead18af865baf26c.pdf"
            type="application/pdf" width="80%">
        </div>
      </div>

      <div class="column">
        <div class="styled-box" @click="redirectToPageVueA()">
          <img src="https://static01.helion.com.pl/global/okladki/181x236/vzbudu.jpg" alt="Your Image Description">


        </div>

        <div class="styled-box">

          <embed
            src="https://storagekontowojtek.blob.core.windows.net/article-images/215a84cb8e6c78888e1ffefbd40da2e2.pdf"
            type="application/pdf" width="80%">
        </div>
      </div>

      <div class="column">
        <div class="styled-box" @click="redirectToPageDocker()">
          <img src="https://img-c.udemycdn.com/course/240x135/2065437_077c_4.jpg" alt="Your Image Description">


        </div>

        <div class="styled-box">

          <embed
            src="https://storagekontowojtek.blob.core.windows.net/article-images/UC-06c902af-8355-49f5-9b15-acc8f76a0985.jpg"
            type="application/pdf" width="80%">
        </div>
      </div>
    </div>

    <div v-else>
      <h1>Proszę się zalogować (dane w CV) aby zobaczyć tę stronę</h1>
    </div>
  </div>
</template>

<script>


import * as getterTypes from '@/stores/getter-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
export default {
  name: 'Certificates',
  setup() {
    const userStore = useUserStore();

    // Access getters
    const userStatus = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const adminStatus = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);


    return {
      userStatus,
      adminStatus,
    };
  },
  data() {
    return {
      pdfUrl: 'https://storagekontowojtek.blob.core.windows.net/article-images/215a84cb8e6c78888e1ffefbd40da2e2.pdf'
    };
  },
  methods: {
    redirectToPageVueB() {
    // Replace 'your_destination_page.html' with the actual URL you want to redirect to
    window.location.href = 'https://helion.pl/kurs/vue-js-kurs-video-sprawne-i-szybkie-pisanie-aplikacji-webowych-jaroslaw-baca,vvujev.htm#format/w';
  },
  redirectToPageVueA() {
    // Replace 'your_destination_page.html' with the actual URL you want to redirect to
    window.location.href = 'https://helion.pl/kurs/vue-js-w-praktyce-kurs-video-poznaj-narzedzia-web-developera-vue-js-typescript-miro-firebase-grzegorz-wazny,vzbudu.htm#format/w';
  },
  redirectToPageDocker() {
    // Replace 'your_destination_page.html' with the actual URL you want to redirect to
    window.location.href = 'https://www.udemy.com/course/docker-od-podstaw-dla-programistow-i-nie-tylko/';
  },
  },

}
</script>

<style lang="scss" scoped>
.styled-box {
  max-width: 1000px;
  background-color: #ffffff;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  /* Center the message box horizontally */
  margin-bottom: 16px;
  position: relative;
  /* You can adjust the padding as needed */
  display: flex;
  &:hover {
    cursor:grab;
  }
}

.styled-box p {
  font-size: 30px;
  margin: 0;
  /* Remove default margin for the paragraph */
}

.column {
  display: flex;
  justify-content: center;
}
</style>
