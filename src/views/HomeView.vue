<template>
  <div v-if="userStatus || adminStatus">
    <div v-if="adminStatus">
      <Loader v-show="messagetoadminLoading" />
      <transition name="bounce">
        <Error v-show="messagetoadminError" />
      </transition>
      <div v-show="messagetoadminVisible">
        <UsersMessages :messagetoadmin="messagetoadminFirst" />
        <CheckMessageToAdmin />
      </div>
    </div>
    <div v-if="articlesLoading == false">
      <div v-show="userStatus || adminStatus">
        <article class="main-article" v-for="x in articlesList" :key="x.title">
          <div v-show="x.id">
            <header>
              <h2>{{ x.title }}</h2>
              <hr class="hr-my" />
            </header>
            <div class="article-content">
              <!-- Add your image to the left side of the content -->
              <div class="image-container">
                <img :src="getImageUrl(x.image)" alt="Article Image" class="article-image" />
                <!-- Add image description below the image -->
                <!--<p class="image-description">Image Description Goes Here</p>-->
                <!-- Add gradient line below image description -->
                <hr class="gradient-line" />
              </div>
              <p class="article-meta">{{ x.content }}</p>
              <div class="share-buttons">
                <!-- Telegram Share Button -->
                <a :href="getTelegramShareLink(x.title, x.content, x.imageUrl)" class="share-button red-icon"
                  target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-telegram"></i>
                </a>

                <!-- Add a similar button for platform X using its share functionality -->
                <!-- Modify the href accordingly based on the requirements of platform X -->
                <a :href="getPlatformXShareLink(x.title, x.content, x.imageUrl)" class="share-button red-icon"
                  target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-platform-x"></i> X
                </a>
              </div>
              <p class="right-align-date">{{ convertdate(x.dateCreated) }}</p>
              <button v-show="adminStatus" @click="deletePost(x.id)" class="button-71">Usuń</button>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div v-else>
      <loader />
    </div>
  </div>
  <div v-else>
    <h1>Proszę się zalogować (dane w CV) aby zobaczyć tę stronę</h1>
  </div>
</template>

<script>
import * as actionTypes from '@/stores/action-types';
import * as getterTypes from '@/stores/getter-types';

import UsersMessages from '@/components/UsersMessages.vue';
import CheckMessageToAdmin from '@/components/CheckMessageToAdmin.vue';
import '@fortawesome/fontawesome-free/css/all.css'
import Loader from '@/components/Loader.vue';
import Error from '@/components/Error.vue';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useMessageStore } from '@/stores/messegesToAdmin';
/*function arrayBufferToBase64(buffer) {
  console.log('Image Binary Array:', buffer);
  console.log('Image Binary Array L:', buffer.resizable);
  const binary = new Uint8Array(buffer);
  console.log('Array Buffer binary:', binary);
  const bytes = Array.from(binary);
  console.log('Array Buffer bytes:', bytes);//.prototype.maxByteLength
  console.log('Array Buffer return:', btoa(bytes.map(byte => String.fromCharCode(byte)).join('')));
  return btoa(bytes.map(byte => String.fromCharCode(byte)).join(''));
}*/
function base64ToArrayBuffer(base64) {
  // Decode the Base64 string
  let binaryString = atob(base64);

  // Create an ArrayBuffer from the binary string
  let length = binaryString.length;
  let arrayBuffer = new ArrayBuffer(length);
  let uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return arrayBuffer;
}
import axios from 'axios';

const MAX_DELAY = 2500;

const post = (url, kindOfArticle, token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      KindOfArticle: kindOfArticle
    }, {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      }
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});



const getArticles = (kindOfArticle, token) => post('/api/getarticles', kindOfArticle, token);


const postDelete = (url, title, token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      Title: title
    }, {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      }
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});



const deleteArticle = (kindOfArticle, token) => postDelete('/deletearticle', kindOfArticle, token);
export default {
  name: 'Home',
  components: {
    UsersMessages,
    CheckMessageToAdmin,
    Loader,
    Error,
  },
  setup() {
    const userStore = useUserStore();
    const messegesTo = useMessageStore();
    // Access state
    const userData = ref(userStore.userData);
    const userLoading = ref(userStore.userLoading);
    const userToken = ref(userStore.token);
    const messagetoadminFirst = ref(messegesTo);
    // Access getters
    const userStatus = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const adminStatus = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);
    // Call actions
    const loginUser = async (email, password) => {
      await userStore.LOGIN({ email, password });
    };

    const logoutUser = () => {
      userStore.LOGOUT();
    };

    const fetchCurrentUser = async () => {
      await userStore.FETCH_CURRENT_USER();
    };

    // Use onMounted hook to dispatch the action when the component is mounted
    onMounted(() => {

      messegesTo.fetchAdminMessage(userToken);
     // userStore.dispatch(actionTypes.CLEAR_MESSAGE);
    });

    return {
      userData,
      userLoading,
      userToken,
      userStatus,
      loginUser,
      logoutUser,
      fetchCurrentUser,
      adminStatus,
    };
  },

  methods: {
    getTelegramShareLink(title, content, imageUrl) {
      const encodedTitle = encodeURIComponent(title);
      const encodedContent = encodeURIComponent(content);
      const encodedImageUrl = encodeURIComponent(imageUrl);

      // Adjust the URL format based on your needs
      return `https://t.me/share/url?url=${encodedTitle}&text=${encodedContent}&photo=${encodedImageUrl}`;
    },

    // Function to generate the share link for Platform X
    getPlatformXShareLink(title, content, imageUrl) {
      // Adjust the URL format based on the requirements of Platform X
      // Replace this placeholder with the actual sharing logic for Platform X
      return '#';
    },
    convertdate(DateA) {
      let dt = new Date(DateA);
      return dt.toLocaleDateString('pl-PL');
    },
    getImageUrl(base64String) {

      /*  if (imageBinary) {
          try {
            const base64String = arrayBufferToBase64(imageBinary);
            console.log('Base64 String:', base64String);
            return `data:image/jpeg;base64,${base64String}`;
          } catch (error) {
            console.error('Error converting to base64:', error);
            return require('@/assets/your-image.jpg');
          }
        } else {
          console.warn('No image binary provided.');
          return require('@/assets/your-image.jpg');
        }*/
      let arrayBuffer = base64ToArrayBuffer(base64String);

      // Convert ArrayBuffer to Blob
      let blob = new Blob([arrayBuffer]);

      // Create a data URL from the Blob
      let dataUrl = URL.createObjectURL(blob);

      // Display the image in an <img> tag
      //let imgElement = document.getElementById('imageElement'); // replace 'imageElement' with your actual element ID
      //imgElement.src = dataUrl;
      return dataUrl;
    },
    deleteArticleLocally(idtodelete) {
      let indexToDelete = this.articlesList.findIndex(obj => obj.id === idtodelete);
      if (indexToDelete !== -1) {
        this.articlesList.splice(indexToDelete, 1);
      }
    },
    messagetoadminVisible() {
      return this.messagetoadminLoading == false && this.messagetoadminError == false;
    },
    deletePost(title) {
      deleteArticle(title, this.userToken)
        .then((data) => {
          if (data.success) {
            this.deleteArticleLocally(title)
          }
          else {
            this.$router.push({ path: '/logfail' });
          }
        })
        .catch(() => {

        })
        .finally(() => {
          this.deleteArticleLocally(title)
        });
    },
    articles() {
      this.articlesLoading = true;
      getArticles(this.messageToPost, this.userToken)
        .then((data) => {
          this.articlesList = data;
          this.articlesLoading = false;
        })
        .catch(() => {

        })
        .finally(() => {

        });
    },
  },
  created() {
   // this.$store.dispatch('fetchAdminMessage', this.userToken);
  //  this.$store.dispatch(actionTypes.CLEAR_MESSAGE);
    this.articles();
  },
  data() {
    return {
      articlesLoading: false,
      messageToPost: 'ListOfArticlesMainPage',
      articlesList: [
        { id: 'nie ma ID', title: 'Nie wczytano tytułu', content: 'Nie wczytano artykułu', dateCreated: new Date(), image: 'base64-encoded-image-1' }
      ],
    }
  },
};
</script>

<style  scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
  color: #333;
}

.red-icon {
  color: red !important;
  /* Use !important to override Font Awesome styles */
}

.hr-my {
  height: 12px;
  background-color: violet;
  background-image: linear-gradient(90deg, violet, transparent);

  border: 0;
  height: 1px;
}

.right-align-date {
  text-align: right;
  color: pink;
  font-size: 20px;
}

.main-article {

  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  width: 1000px;
  /* Set the width to 300 pixels */

}

header {
  text-align: left;
  margin-bottom: 20px;
}

h1 {
  color: #333;
}

.article-meta {
  text-align: left;
  color: #777;
  font-size: 20px;
}

.article-content {
  line-height: 1.6;
}

/* Style links within the article */
a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.bounce-enter-active {
  animation: bounce-in 1.5s;
}

.bounce-leave-active {
  animation: bounce-in 1.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}




.button-71 {
  background-color: #0078d0;
  border: 0;
  border-radius: 56px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 600;
  outline: 0;
  padding: 16px 21px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-71:before {
  background-color: initial;
  background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
  border-radius: 125px;
  content: "";
  height: 50%;
  left: 4%;
  opacity: .5;
  position: absolute;
  top: 0;
  transition: all .3s;
  width: 92%;
}

.button-71:hover {
  box-shadow: rgba(255, 255, 255, .2) 0 3px 15px inset, rgba(0, 0, 0, .1) 0 3px 5px, rgba(0, 0, 0, .1) 0 10px 13px;
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .button-71 {
    padding: 16px 48px;
  }
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.image-description {
  color: #777;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
}

.gradient-line {
  height: 1px;
  background-color: violet;
  background-image: linear-gradient(90deg, violet, transparent);
  border: 0;
  width: 100%;
}

.share-buttons {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  /* Increase the distance between icons */
}

.share-button {
  font-size: 40px;
  /* Increase the icon size */
  margin-right: 20px;
  /* Increase the distance between icons */
}
</style>
