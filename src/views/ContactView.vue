<template>
  <div v-if="isLoading == false">
    <div v-if="userStatus || adminStatus">
      <div v-if="adminStatus">
        <form @submit.prevent="asubmitForm">
          <div class="form-group">
            <label for="content">Content:</label>
            <input type="text" v-model="contactForm.content" required />
          </div>

          <div class="form-group">
            <label for="schoolTitle">School Title:</label>
            <input type="text" v-model="contactForm.type" required />
          </div>

          <div class="form-group">
            <label for="id">Id:</label>
            <input type="text" v-model="contactForm.id" required />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div class="edu-page-container">
        <div class="edu-filter-container">

          <div class="filter-container">


            <div class="select-container">
              <label class="labelstyle">Rodzaj kontaktu:</label>
              <div class="select">
                <select v-model="typeFilter" class="textin">
                  <option value="">Wszystkie</option>
                  <option value="Telefon">Telefon</option>
                  <option value="Adres e-mail">E-mail</option>
                  <!-- Add other degree options as needed -->
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="edu-container-wrapper">
        <div v-for="x in filteredContactList" :key="x.content" class="edu-container">
          <h1>{{ x.type }}</h1>
          <p>{{ x.content }}</p>
        </div>
      </div>
    </div>


    <div v-else>
      <h1>Proszę się zalogować (dane w CV) aby zobaczyć tę stronę</h1>
    </div>
  </div>
  <div v-else>
    <loader />
  </div>
</template>

<script>
import * as getterTypes from '@/stores/getter-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
const MAX_DELAY = 2500;
const getContact = (url, token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.get(url, {
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

const postContact = (url, contact, token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      id: contact.id,
      Content: contact.content,
      Type: contact.type,
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
import Loader from '@/components/Loader.vue';
export default {
  name: 'Contact',
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
      contactList: [
        { id: 'nie ma ID', type: 'Nie wczytano tytułu', content: 'Nie wczytano artykułu' },
        { id: 'nie ma ID', type: 'Nie wczytano tytułu', content: 'Nie wczytano artykułu' }
      ],
      typeFilter: '',
      contactForm: {
        id: "",
        content: "",
        type: "",
      },
    }
  },
  methods: {
    asubmitForm() {
      console.log('Before postmessage');
      this.isLoading = true;
      postContact('/api/newcontact', this.contactForm, this.userToken)
        .then((data) => {
          console.log('Data received:', data);
          console.log('In THEN');
          this.isLoading = false;
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
    filterContactList() {
      // Perform filtering when the button is clicked
      // Update the eduList with the filtered data
      console.log('Filtering');
      this.eduList = this.filteredContactList;
    },
    contact() {
      // Perform HTTP POST request using the data
      console.log('Before postmessage');
      this.isLoading = true;
      getContact('/api/contacts', this.userToken)
        .then((data) => {
          console.log('Data received:', data);
          console.log('In THEN');
          this.contactList = data;
          this.isLoading = false;
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
computed:{
    filteredContactList() {

      return this.contactList.filter((contact) => {

        // Check if the degree matches the filter
        const typeFilterPassed = !this.typeFilter || contact.type === this.typeFilter;

        return typeFilterPassed;
      });
    },
  },
  created() {
    this.contact();
  },
};
</script>

<style lang="scss" scoped>
.textin {
  background: darkcyan;
}

.button-container {
  width: 100%;
  margin-top: 10px;
  /* Adjust margin as needed */
}

.edu-filter-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Center both filter-container and edu-container-wrapper horizontally */
  align-items: center;
  /* Center both filter-container and edu-container-wrapper vertically */
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 600px;
  /* Adjust max-width as needed */
  margin-bottom: 20px;
}

.filter-container label {
  display: block;
  margin-bottom: 5px;
}

.edu-container-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  /* Stack elements vertically */
  align-items: center;
  /* Center items vertically */
}

.edu-container {
  max-width: 600px;
  background-color: #ffffff;
  border: 4px solid violet;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 16px;
  width: 400px;
  /* Set the width to 300 pixels */
  height: 200px;
}

.edu-details {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.edu-details p {
  margin: 0;
  width: 100%;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #23b499;
  font-family: 'Open Sans', sans-serif;
  color: #fff;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #5c6664;
  background-image: none;
  flex: 1;
  padding: 0 .5em;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  font-family: 'Open Sans', sans-serif;
}

select::-ms-expand {
  display: none;
}

.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  line-height: 3;
  background: darkcyan;
  overflow: hidden;
  border-radius: .25em;
}

.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
  background: darkblue;
  cursor: pointer;
  pointer-events: none;
  transition: .25s all ease;
}

.select:hover::after {
  color: #23b499;
}

.date-container {
  flex: 1;
  margin-bottom: 10px;
}

/* Style for the calendar icon */
.date-container::before {
  content: "\1F4C5";
  /* Unicode character for the calendar icon */
  font-size: 24px;
  /* Adjust the size as needed */
  color: pink;
  /* Set the color to pink or your preferred color */
  position: absolute;
  top: 50%;
  left: 8px;
  /* Adjust the distance from the left as needed */
  transform: translateY(-50%);
}

/* Style for the date input */
.date-input {
  padding-left: 30px;
  /* Ensure enough space for the icon */
  font-size: 16px;
  /* Adjust the font size as needed */
  border: 2px solid pink;
  /* Set the border color to pink or your preferred color */
  border-radius: 10px;
  /* Set the border radius for rounded edges */
  outline: none;
  /* Remove default focus outline */
  width: 200px;
  /* Set the width as needed */
}

.select-container {
  flex: 1;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
}

.labelstyle {
  font-size: 2em;
  font-weight: bold;
}
</style>
