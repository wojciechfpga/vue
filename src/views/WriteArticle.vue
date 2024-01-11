<template>
  <div class="form">
    <div class="title">Napisz artykuł</div>
    <div class="input-container ic1">
      <input id="firstname" class="input" type="text" placeholder="" v-model="keyToPost" />
      <div class="cut"></div>
      <label for="firstname" class="placeholder">Klucz</label>
    </div>
    <div class="input-container ic2">
      <input id="lastname" class="input" type="text" placeholder="" v-model="titleToPost" />
      <div class="cut"></div>
      <label for="lastname" class="placeholder">Tytuł</label>
    </div>
    <div class="input-container ic2">
      <textarea id="email" class="input" placeholder="" v-model="messageToPost"></textarea>
      <div class="cut cut-short"></div>
      <label for="email" class="placeholder">Treść</label>
    </div>

    <!-- New image upload field -->
    <div class="input-container ic2">
      <input type="file" id="imageUpload" class="input" accept="image/*" @change="handleImageUpload" />
      <div class="cut"></div>
      <label for="imageUpload" class="placeholder">Wybierz obraz</label>
      <!-- Image preview -->
      <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" style="max-width: 105%; margin-top: 10px;" />


    </div>

    <div class="padbutton">
      <button type="text" class="submit" v-on:click="sendarticle">Wyślij</button>
    </div>
  </div>
</template>

<script>
import * as getterTypes from '@/stores/getter-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const MAX_DELAY = 2500;

const post = (url, data, token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, data, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});


const sendNewArticle = (formData, token) => post('/newarticle', formData, token);
export default {
  name: 'WriteArticle',
  data() {
    return {
      messageToPost: '',
      titleToPost: '',
      keyToPost: '',
      result: false,

      imagePreview: null,
    }
  },
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
  methods: {
  handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      // Display image preview
      this.imagePreview = URL.createObjectURL(file);
      // Save the file for later use in the sendarticle method
      this.imageFile = file;
      // You can also handle further image processing or validation here
    }
  },
  sendarticle() {
    const formData = new FormData();
    formData.append('Id', this.keyToPost);
    formData.append('Title', this.titleToPost);
    formData.append('Content', this.messageToPost);
    if (this.imageFile) {
      formData.append('Image', this.imageFile); // Append the image file
    }

    sendNewArticle(formData, this.userToken)
      .then((data) => {
        // Handle the response data
      })
      .catch(() => {
        // Handle errors
      })
      .finally(() => {
        // Cleanup or final actions
      });
  }
},
}
</script>

<style  scoped>
body {
  align-items: center;
  background-color: #000;
  display: flex;
  justify-content: center;
  height: 100vh;
}
.padbutton{
  padding-top: 150px;
}
.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: auto;
  /* Set height to auto to allow it to adjust based on content */
  padding: 20px;
  width: 320px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  outline: 0;
  padding: 10px;
  /* Adjust padding for better appearance */
  width: 100%;
  resize: none;
  /* Disable textarea resizing by the user */
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus~.cut,
.input:not(:placeholder-shown)~.cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus~.placeholder,
.input:not(:placeholder-shown)~.placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown)~.placeholder {
  color: #808097;
}

.input:focus~.placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  outline: 0;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}
</style>
