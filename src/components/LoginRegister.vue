<template>
    <div class="container">
    <router-link v-if="!AlreadyLogin" to="/login">
      <button class="log">Zaloguj</button>
    </router-link>
    <router-link v-if="!AlreadyLogin" to="/register">
      <button class="reg">Zarejerstruj się</button>
    </router-link>
  </div>
  <div class="container">
    <router-link v-if="AlreadyLogin" to="/logout" class="container">
      <button class="log">Wyloguj</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginRegister',
  props: {
    IsToken: Boolean,
  },
  computed: {
    AlreadyLogin() {
      return this.IsToken;
    },
  },
  methods: {
    setButton() {
      // Handle your logout logic here
    },
  },
};
</script>

<style  scoped>
body {
  border: 0;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: rgba(250, 250, 250)
}

.container {
  margin-top:10px;
  margin-bottom:10px;
  margin-left: auto;
  display: flex;
  justify-content:right;
}

.container div > p span {
  color: red;
}

p {
  position: relative;
  top: 30px;
}

p a {
  color: black;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 600;
  margin: 0 10px;
  width: 200px;
  padding: 10px 0;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
  transition: 0.4s;
}

.reg {
  color: white;
  background-color: rgba(104, 85, 224, 1);
}

.log {
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
}

button:hover {
  color: white;
  width:;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
  background-color: rgba(104, 85, 224, 1);
}

</style>
