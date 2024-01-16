<template>

    <div class="navLink">
      <!-- Your existing links -->
      <router-link class="highlight-box" to="/">Strona Główna</router-link>
      <router-link class="highlight-box" to="/messagesfromadmin">Komunikaty dla użytkowników</router-link>
      <router-link class="highlight-box" to="/projects">Projekty</router-link>
      <!-- Spacer to push "Kontakt" to the right -->
      <div class="spacer"></div>
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
      <router-link class="highlight-box" to="/contact">Kontakt</router-link>
      <!-- Your existing admin links -->
      <div v-if="this.adminStatus">
        <router-link class="highlight-box" to="/writearticle">Napisz artykuł</router-link>
        <router-link class="highlight-box" to="/users">Użytkownicy</router-link>
        <router-link class="highlight-box" to="/contact">Wiadomosci - użytkownicy</router-link>
        <router-link class="highlight-box" to="/adminessageform">Wiadomośći dla użytkowników</router-link>
      </div>
    </div>

</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
export default {
  name: 'TheHeader',
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
};
</script>

<style scoped>
/* Normal state styling */
.social-links {
  margin-top: 15px;
}

.social-links a {
  display: inline-block;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  text-align: center;
  line-height: 30px;
  /* Remove this line to fix the issue */
  border-radius: 50%;
  color: red;
  /* Set the color to white or any other color you prefer */
  background-color: #333;
  transition: all 0.5s ease;
  margin-bottom: 10px;
}

.social-links a[data-v-dd042928] {

  height: 180px;
  /* Triple the size */
  width: 180px;
  /* Triple the size */
  margin-right: 60px;
  /* Increase the spacing */
  text-align: center;
  line-height: normal !important;
  border-radius: 50%;
  color: white !important;
  background: none !important;
  transition: all 0.5s ease;

}

.social-links a[data-v-dd042928] i {
  font-size: 1.5em;
  /* Triple the size */
  border: none !important;
}

.social-links a:hover {
  background-color: black;
}

.social-links i {
  border: none;
}
.highlight-box {
  transition: none; 

  /* Adding transition for a smooth effect */
}

/* Hover state styling */
.highlight-box:hover {
  background-color: white;
  /* Change this to the desired highlight color */
  height: calc(20px + 1em); ; /* Increase the size by a factor of 1.2 */
  color:black;
  margin-top: 10px;
  font-weight: bold;

  transition: width 0.5s ease-out, height 0.5s ease-out;
  border-radius: 5px 5px 0 0;
}

.navbarmain {
  background: black;
  padding: 1rem;
  font-size: 1.5rem;
  border-bottom: 1px solid white;

  display: flex;
  justify-content: right;
  align-items: center;
  border-top: 5px outset
}

.navbar {
  background: black;
  padding: 1rem;
  font-size: 1.5rem;
  border-bottom: 1px solid white;

}

.navLink {
  display: flex;
  align-items: center;
  background: black;

  font-size: 1.5rem;
  border-bottom: 1px solid white;
  padding-left: 25px;
  padding-right: 25px;
}

.spacer {
  flex-grow: 1; /* This will push "Kontakt" to the right */
}

a {
  text-decoration: none;
  padding: 1rem;
  color: #fff;
  text-align: right;
}

@media only screen and (max-width: 600px) {
  .navLink {
    flex-direction: column;
    padding: 10px; /* Adjust padding for better spacing on small screens */
  }
}

@media only screen and (max-width: 600px) {
  .social-links a {
    height: 40px;
    width: 40px;
    margin-right: 5px;
  }

  .social-links a:hover {
    background-color: #333;
  }
}

@media only screen and (max-width: 600px) {
  .highlight-box {
    height: auto;
    margin-top: 5px;
    font-weight: normal;
    border-radius: 5px;
  }

  .highlight-box:hover {
    background-color: initial;
    height: auto;
    color: initial;
    margin-top: 5px;
    font-weight: normal;
    border-radius: 5px;
  }
}
</style>
