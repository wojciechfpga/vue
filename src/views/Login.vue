<template>

  <div class="appear" v-if="!loading">
    <div class="position">
      <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true">

        <div class="signup">
          <form @submit.prevent="onLogin">
            <label for="chk" aria-hidden="true">Zaloguj</label>
            <input type="email" name="email" placeholder="Email" required="" v-model="email">
            <input type="password" name="password" placeholder="Hasło" required="" v-model="password">
            <button type="submit" v-on:Click="setToken">Zalogujsię</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Zalogowano pomyślnie, zaraz nastąpi przekierowanie do strony głównej</h1>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';

import * as actionTypes from '@/stores/action-types';
import * as mutationTypes from '@/stores/mutation-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import * as getterTypes from '@/stores/getter-types';
export default {
  name: 'login',
  components: {
    Loader,
  },
  setup() {
    const userStore = useUserStore();

    // Access getters
    const userStatus = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const adminStatus = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);
    const userToken = computed(() => userStore.GET_CURRENT_USER_TOKEN);
    const loginUser = async (email, password) => {
      await userStore.LOGIN({ email, password });
    };
    const loginservice = async (email, password) => {
      await userStore.logto(email, password);
    };
    return {
      userStatus,
      adminStatus,
      userToken,
      loginservice,
    };
  },
  data() {
    return {
      error: '',
      loading: false,
      email: '',
      password: '',
      repeatPassword: '',
      registered: false,
      result: { success: false, userSuccess: false, adminSuccess: false, token: "no" },
    };
  },
  methods: {

    setToken() {
      if (userStatus || this.adminStatus) {
        setTimeout(() => this.$router.push({ path: '/' }), 5000);
      }
    },
    async onLogin() {
      if (this.email.length < 6) {
        this.error = 'Email must have at least 6 characters';
      } else {
        this.loading = true;
        await this.loginservice(this.email, this.password);
        this.result.userSuccess = await this.userStatus;
        this.result.adminSuccess = await this.adminStatus;
        if (this.result.adminSuccess || this.result.adminSuccess) {
          // this.$router.push({ path: '/log'});
        }
        else {
          //  this.$router.push({ path: '/logfail'});
        }






        /*
        this.loading = true;
        this.error = '';
        loguser(this.email, this.password)
          .then((data) => {

            this.registered = true;
            this.result=data;
          })
          .catch(() => {
            this.error = 'Could not register user';
          })
          .finally(() => {
            this.loading = false;
           // this.$store.dispatch(actionTypes.LOGIN);
          });
        */}
    },
  },
  // created(){
  //   if(userStatus||this.adminStatus)
  //   {
  //    setTimeout( () => this.$router.push({ path: '/'}), 5000);
  //  }
  //  },
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
}
</style>
