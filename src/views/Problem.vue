<template>
  <div>
    <h1>Formularz zgłaszania problemów</h1>
    <div class="form">
      <div class="title">Wyślij wiadomość</div>
      <div class="subtitle">Administrator odpowie e-mailem</div>
      <div class="input-container ic1">

        <input id="email" class="input" type="text" placeholder=" " v-model="messageToPost" />
        <div class="cut cut-short"></div>
        <label for="email" class="placeholder">Wiadomość</label>
      </div>
      <button type="text" class="submit" v-on:click="sendmessagetoadmin">Wyślij</button>
    </div>
  </div>
</template>

<script>
import * as getterTypes from '@/stores/getter-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const MAX_DELAY = 2500;

const post = (url,messageToAdmin,token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      MessageToAdmin: messageToAdmin
    }, {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      }})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});



const sendMessageToAdmin = (messageToAdmin,token) => post('https://wojciechlasowskiapi.azurewebsites.net/messagetoadmin',messageToAdmin,token);
export default {
  name: 'Problem',
  data() {
    return {
      messageToPost: '',
      result: false
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
    sendmessagetoadmin() {
      sendMessageToAdmin(this.messageToPost, this.userToken)
        .then((data) => {
          this.result = data.succes;
          this.$router.push({name: 'operationresult', query: { result: data.succes }});
        })
        .catch(() => {
          this.$router.push({name: 'operationresult', query: { result: 'false' }});
        })
        .finally(() => {

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

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
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
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
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
