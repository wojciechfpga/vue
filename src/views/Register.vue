/* eslint-disable */
<template>
  <div class="appear">
    <Loader v-show="loading" />
    <div class="position" v-show="!loading">
      <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true">

        <div class="signup">
          <form @submit.prevent="onSubmit">
            <label for="chk" aria-hidden="true">Zarejestruj</label>
            <input type="email" name="email" placeholder="Email" required="" v-model="email">
            <input type="password" name="pswd" placeholder="Hasło" required="" v-model="password">
            <input type="password" name="txt" placeholder="Powtórz hasło" required="" v-model="repeatPassword">
            <button type="submit">Zarejestruj się</button>
          </form>
        </div>


      </div>
    </div>
  </div>
  <p>{{ success }}</p>
</template>

<script>
import Loader from '@/components/Loader.vue';
import axios from 'axios';

const MAX_DELAY = 2500;


const post = (url,emailAdress,password) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      EmailAdress: emailAdress,
      Password: password
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});

const postUser = (emailAdress, password) => post('/register',emailAdress, password);
export default {
  name: 'Register',
  components: {
    Loader,
  },
  data() {
    return {
      success: false,
      error: '',
      loading: false,
      email: '',
      password: '',
      repeatPassword: '',
      registered: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.password !== this.repeatPassword) {
        this.error = 'Passwords are not the same';
      } else if (this.email.length < 6) {
        this.error = 'Email must have at least 6 characters';
      } else {
        this.loading = true;
        this.error = '';
        postUser(this.email, this.password)
          .then((data) => {
            this.registered = true;
            this.success = data.success;
            if (data.success == true) {
              this.$router.push({ path: '/registered' });
            }
          })
          .catch(() => {
            this.error = 'Could not register user';
            this.$router.push({ path: '/registerfail' });
          })
          .finally(() => {
            this.loading = false;

          });
        if (this.success == false) {
          //   this.$router.push({ path: '/registerfail'});
        }
        else {
          //   this.$router.push({ path: '/registered'});
        }

      }
    },
  },
}
</script>

<style lang="scss" scoped>
.appear {
  opacity: 0;
  /* Set initial opacity to 0 */
  animation: appearAnimation 1s ease-out forwards;
  /* Animation properties */
}

@keyframes appearAnimation {
  from {
    opacity: 0;
    /* Start with opacity 0 */
  }

  to {
    opacity: 1;
    /* End with opacity 1 */
  }
}

.position {
  margin-top: 10px;
  margin-bottom: 10px;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}

.main {
  margin: auto;
  width: 350px;
  height: 500px;
  background: red;
  overflow: hidden;
  background: blueviolet;
  box-shadow: 5px 20px 50px #000;
}

#chk {
  display: none;
}

.signup {
  position: relative;
  width: 100%;
  height: 100%;
}

label {
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: .5s ease-in-out;
}

input {
  width: 60%;
  height: 20px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
}

button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;
}

button:hover {
  background: #6d44b8;
}

.login {
  height: 460px;
  background: peru;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: .8s ease-in-out;
}

.login label {
  color: #573b8a;
  transform: scale(.6);
}

#chk:checked~.login {
  transform: translateY(-500px);
}

#chk:checked~.login label {
  transform: scale(1);
}

#chk:checked~.signup label {
  transform: scale(.6);
}</style>
