<template>
  <div class="body">
    <div class="form">
      <div class="title">Wiadomość dla użytkowników</div>
      <div class="subtitle">Wyślij wiadomość</div>

      <form @submit.prevent="submitForm">
        <div class="input-container ic1">
          <textarea v-model="body" class="input" placeholder=" " rows="4"></textarea>
          <div class="cut"></div>
          <label class="placeholder">Wiadomość</label>
        </div>

        <div class="input-container ic2">
          <input v-model="subject" class="input" type="text" placeholder=" " />
          <div class="cut"></div>
          <label class="placeholder">Temat</label>
        </div>

        <button type="submit" class="submit">Wyślij</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as getterTypes from '@/stores/getter-types';
import { useUserStore } from '@/stores/user';
import { useMessageStore } from '@/stores/messegesToAdmin';
import { ref, computed, onMounted } from 'vue';
const MAX_DELAY = 2500;
const postMessage = (url, body, subject, token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      Body: body,
      Subject: subject,
    }, {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      }
    })
    .then((response) => {
      console.log('Response received:', response.data);
      if (response.data.success) {
        resolve(response.data);
      } else {
        reject(new Error('Message not sent successfully.'));
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      reject(error);
    });
  }, Math.random() * MAX_DELAY);
});

export default {
  data() {
    return {
      body: "",
      subject: "",
    };
  },
  setup() {
    const userStore = useUserStore();
    const messegesTo=useMessageStore();
    const userToken = computed(() => userStore.GET_CURRENT_USER_TOKEN);
    const userStatus = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const adminStatus = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);

    // Use onMounted hook to dispatch the action when the component is mounted
    onMounted(() => {

      messegesTo.fetchAdminMessage(userToken);
     // userStore.dispatch(actionTypes.CLEAR_MESSAGE);
    });

    return {

      userToken,
 
    };
  },

  
  methods: {
    submitForm() {
      // Perform HTTP POST request using the data
      console.log('Before postmessage');
      postMessage('https://wojciechlasowskiapi.azurewebsites.net/adminmessagetouser', this.body, this.subject, this.userToken)
        .then((data) => {
          console.log('Data received:', data);
          console.log('In THEN');
          this.$router.push({ name: 'operationresult', query: { result: data.success } });
        })
        .catch(() => {
          console.log('In CATCH');
        })
        .finally(() => {
          console.log('In FINALLY');
        }
        );
        console.log('After postmessage');
    },
  },
};
</script>

<style scoped>
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
