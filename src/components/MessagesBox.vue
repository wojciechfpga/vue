<template>
  <div>
    <h1>Wiadomości od administratora</h1>
    <div v-for="(x, index) in reversedMessage" :key="index" >
      <div v-if="index < 10" class="message-box">
        <div class="message">
          <div class="message-text">
            <p>{{ x.message }}</p>
          </div>
          <div class="gradient-line"></div>
          <div class="message-date">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessagesBox',
  props: {
    messagefromadmin: Object,
  },
  computed: {

    reversedMessage() {
      return this.messagefromadmin;
    },
    methods: {
      convertdate(DateA) {
        let dt = new Date(DateA);
        return dt.toLocaleDateString('pl-PL');
      },
    },
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
  max-width: 180px;
  background-color: #ffffff;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 16px;
  margin: 0 auto;
  /* Center the message box horizontally */
  margin-bottom: 16px;
  position: relative;
}

.message-text {
  margin-bottom: 8px;
  font-size: 18px;
}

.gradient-line {
  height: 1px;
  background: linear-gradient(to right, #3498db, #ffffff);
  margin: 8px 0;
}

.message-date {
  font-size: 6px;
  color: #777777;
  text-align: right;
}
</style>
