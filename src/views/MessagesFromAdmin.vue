<template>
  <div v-if="isLoading==false">
    <h1>Komunikatry od administrator strony:</h1>
    <div v-for="x in messages" :key="x.message" class="message-box">
      <div class="message-text">
        <p>{{ x.message }}</p>
      </div>
      <div class="gradient-line"></div>
      <div class="message-date">
        <p>{{ convertdate(x.createDate) }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <loader />
  </div>
</template>

<script>
import axios from 'axios';

const MAX_DELAY = 2500;

const get = (url,token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.get(url, {
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

const getMessagesFromAdmin = (token) => get('https://wojciechlasowskiapi.azurewebsites.net/messagesfromadmin',token);
import Loader from '@/components/Loader.vue';
export default {
  name: 'MessagesFromAdmin',
  components: {
    Loader,
  },
  methods: {
    convertdate(DateA) {
      let dt = new Date(DateA);
      return dt.toLocaleDateString('pl-PL');
    },
    getmessages() {
      this.isLoading=true;
      getMessagesFromAdmin(this.messageToPost, this.userToken)
        .then((data) => {
          this.messages = data;
          this.isLoading=false;
        })
        .catch(() => {

        })
        .finally(() => {
        });
    },

  },
  data() {
    return {
      messages: [
        { message: 'nie ma ID', createDate: new Date() }
      ],
      isLoading: false,
    }
  },
  created() {
    this.getmessages();
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  height: 100vh;
}

.message-box {
  max-width: 400px;
  background-color: #ffffff;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 16px;
  margin: 0 auto; /* Center the message box horizontally */
  margin-bottom: 16px;
  position: relative;
}

.message-text {
  margin-bottom: 8px;
}

.gradient-line {
  height: 1px;
  background: linear-gradient(to right, #3498db, #ffffff);
  margin: 8px 0;
}

.message-date {
  font-size: 12px;
  color: #777777;
  text-align: right;
}

</style>
