<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <ul>
            <li><router-link class="highlight-box" to="/education">Wykształcenie</router-link></li>
            <li> <router-link class="highlight-box" to="/experience">Doświadczenie</router-link></li>
          </ul>
          <div class="gradient-line"></div>
        </div>
        <div class="footer-col">
          <ul>
            <li><router-link class="highlight-box" to="/problem">Zgłoś problem</router-link></li>
            <li><router-link class="highlight-box" to="/copyrights">Polityka prywatności</router-link></li>
          </ul>
          <div class="gradient-line"></div>
        </div>
        <div class="footer-col">
          <ul>
            <li>      <router-link class="highlight-box" to="/certificates">Certyfikaty</router-link></li>
            <li> <router-link class="highlight-box" to="/links">Linki</router-link></li>
          </ul>
          <div class="gradient-line"></div>
        </div>
        <div class="footer-col">
          <div class="social-links">
            <a href="https://t.me/wojciechfullstack" target="_blank" title="Telegram">
              <i class="fab fa-telegram"></i>
            </a>
            <a href="#" target="_blank" title="Twitter">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/wojciech-lasowski-12ab731b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" title="Linkedln">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
          <div class="gradient-line"></div>
        </div>
        <div class="footer-col">
          <div class="subscribe-container">
            <form @submit.prevent="setSub">
              <div class="form-group">
                <!-- Email input and button -->
                <input type="email" name="email" placeholder="Twój adres e-mail" required>
                <button type="submit">Subskrybuj</button>
              </div>
            </form>
          </div>
          <div class="gradient-line"></div>
        </div>
      </div>
    </div>

    <!-- Place subscribe container to the right -->

  </footer>
</template>

<script>

import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios';

const MAX_DELAY = 2500;

const post = (url,description,type,frequency,token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
        Description: description,
        Type:type,
        Frequency:frequency
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
const newSub = (description,type,frequency,token) => post('/subscriberequest',description,type,frequency,token);
import * as getterTypes from '@/stores/getter-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
export default {
  name: 'TheFooter',
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

    setSub() {
      newSub('any', 'any', 100, this.userToken)
        .then((data) => {
          this.$router.push({name: 'operationresult', query: { result: data.success }});
        })
        .catch(() => {
          this.$router.push({name: 'operationresult', query: { result: 'false' }});
        })
        .finally(() => {

        });
      setTimeout(() => this.$router.push({ path: '/' }), 1000);

    },
  },
};
</script>

<style scoped>
/* Add this style for the gradient line */
.footer-col {
  position: relative;
}

.gradient-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, red, pink, red);
  /* Adjust gradient colors as needed */
}

/* Add this style for the social links */
.social-links {
  margin-top: 15px !important;
}

.social-links a {
  display: inline-block !important;
  height: 30px;
  width: 30px;
  margin-right: 35px !important;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  color: red !important;
  background-color: white;
  transition: all 0.5s ease;
}

.social-links a i {
  font-size: 3em;
  /* You can adjust the font-size as needed */
  border: none;
}

.social-links a[data-v-dd042928] {
  display: inline-block !important;
  height: 60px !important; /* Adjust the size as needed */
  width: 60px !important; /* Adjust the size as needed */
  margin-right: 35px !important;
  text-align: center;
  line-height: 80px; /* Increase the line-height to create more spacing */
  border-radius: 50%;
  color: red !important;
  background: none;
  transition: all 0.5s ease;
}

.social-links a[data-v-dd042928] i {
  font-size: 3em !important; /* Adjust the size as needed */
  border: none;
}

.social-links a:hover {
  background-color:white  !important;
}

.social-links i {
  border: none !important;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.container {
  width: 100vw;
  margin: 0 auto;
}

.footer {
  display: flex;
  flex-direction: row;
  /* Arrange items horizontally */
  justify-content: space-between;
  /* Space out items along the main axis */
  background-color: white;
  padding: 10px 0;
  border-top: 5px outset red;
}

.footer-col {
  width: 25%;
  padding: 0 5px;
}

.footer-col h4 {
  font-size: 35px;
  color: black;
  text-transform: capitalize;
  margin-bottom: 10px;
  font-weight: 500;
  position: relative;
  text-align: center;
}

.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
  list-style-type: none;
}

.footer-col ul li {

  list-style-type: none;
}

.footer-col ul li a {
  list-style-type: none;
  font-size: xx-large;
  text-transform: capitalize;
  color: white;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;
}

.footer-col ul li a:hover {
  color: pink;
  padding-left: 8px;
  list-style-type: none;
}



/*responsive*/
@media(max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}

@media(max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}

.subscribe-footer {
  background-color: white;
  /* Set the background color to white */
  color: #fff;
  padding: 20px;
  text-align: center;
  border-top: 5px outset red;
}

.subscribe-container {
  max-width: 600px;
  /* You can adjust the max-width as needed */
  margin-left: auto;
  margin-top:10px;
  /* Align to the right */
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

p {
  font-size: 1em;
  margin-bottom: 20px;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;

}

input {
  padding: 10px;
  font-size: 1em;
  flex: 2;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #ff4500;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #cc3700;
}

.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  /* Adjust spacing as needed */
}

select {
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
  /* Adjust spacing as needed */
}</style>
