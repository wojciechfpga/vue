<template>
    <div v-if="!privacyAccepted" class="privacy-policy-button-overlay">
      <div class="privacy-policy-button-container">
        <p>Aby korzystać z serwisu zaakceptuj <router-link to="/copyrights">Politykę prywatności</router-link></p>
        <button @click="acceptPrivacyPolicy">Akceptuję Politykę Prywatności</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        privacyAccepted: false,
      };
    },
    methods: {
      acceptPrivacyPolicy() {
        this.privacyAccepted = true;
        // Tutaj możesz umieścić kod do zapisania akceptacji polityki prywatności, np. w localStorage lub na serwerze
      },
    },
  };
  </script>
  
  <style scoped>
  .privacy-policy-button-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Przyciemnienie tła */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .privacy-policy-button-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px; /* Zaokrąglenie rogów */
    text-align: center;
  }
  
  .privacy-policy-button-container button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background-color: #3498db;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  
  </style>