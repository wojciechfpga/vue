<template>
  <div v-if="userStatus || adminStatus">
    <div v-if="isLoading == false">
      <div v-if="adminStatus">
        <form @submit.prevent="asubmitForm">
          <div class="form-group">
            <label for="content">Content:</label>
            <input type="text" v-model="educationForm.content" required />
          </div>

          <div class="form-group">
            <label for="schoolTitle">School Title:</label>
            <input type="text" v-model="educationForm.schoolTitle" required />
          </div>

          <div class="form-group">
            <label for="dateOfBegin">Date of Begin:</label>
            <input type="date" v-model="educationForm.dateOfBegin" required />
          </div>

          <div class="form-group">
            <label for="dateOfEnd">Date of End:</label>
            <input type="date" v-model="educationForm.dateOfEnd" required />
          </div>

          <div class="form-group">
            <label for="degree">Degree:</label>
            <input type="text" v-model="educationForm.degree" required />
          </div>

          <div class="form-group">
            <label for="id">Id:</label>
            <input type="text" v-model="educationForm.id" required />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <div class="allForm">
          <div class="filterinForm">
            <div>
              <div class="filteringcontainer">
                <div class="filtering">
                  <label class="labelstyle">Data zakończenia:</label>
                  <input type="date" v-model="upperDateFilter" class="date-input select" />
                </div>

                <div class="filtering">
                  <label class="labelstyle">Data rozpoczęcia:</label>
                  <input type="date" v-model="lowerDateFilter" class="date-input select" />
                </div>

                <div class="filtering">
                  <label class="labelstyle">Stopień naukowy:</label>
                  <div class="select">
                    <select v-model="degreeFilter" class="textin">
                      <option value="">Wszystkie</option>
                      <option value="brak">Brak</option>
                      <option value="mgr inż.">mgr inż.</option>
                      <option value="inż.">inż.</option>
                      <!-- Add other degree options as needed -->
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="eduForm">
            <div class="edu-container-wrapper">
              <div v-for="x in filteredEduList" :key="x.content" class="edu-container">
                <h1>{{ x.schooltitle }}</h1>
                <p>{{ x.content }}</p>
                <div class="edu-details">
                  <p>Date rozpoczęcia: {{ formatDate(x.dateOfBegin) }}</p>
                  <p>Data zakończenia: {{ formatDate(x.dateOfEnd) }}</p>
                  <p>Tytuł naukowy: {{ x.degree }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
import * as getterTypes from '@/stores/getter-types';
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
const MAX_DELAY = 2500;
const getEdu = (url, token) => new Promise((resolve, reject) => {
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

const postEdu = (url, education, token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      id: education.id,
      Content: education.content,
      SchoolTitle: education.schoolTitle,
      DateOfBegin: education.dateOfBegin,
      DateOfEnd: education.dateOfEnd,
      Degree: education.degree,
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
  name: 'Education,',
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
      eduList: [
        { id: 'nie ma ID', schooltitle: 'Nie wczytano tytułu', content: 'Nie wczytano artykułu', dateOfBegin: new Date(), dateOfEnd: new Date(), degree: "nodegree" },
        { id: 'nie ma ID', schooltitle: 'Nie wczytano tytułu', content: 'Nie wczytano artykułu', dateOfBegin: new Date(), dateOfEnd: new Date(), degree: "nodegree" }
      ],
      upperDateFilter: null,
      lowerDateFilter: null,
      degreeFilter: '',
      educationForm: {
        id: "",
        content: "",
        schoolTitle: "",
        dateOfBegin: "",
        dateOfEnd: "",
        degree: "",
      },
    }
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
    filteredEduList() {
      const upperDate = this.upperDateFilter ? new Date(this.upperDateFilter) : null;
      const lowerDate = this.lowerDateFilter ? new Date(this.lowerDateFilter) : null;

      return this.eduList.filter((edu) => {
        const eduBeginDate = new Date(edu.dateOfBegin);
        const eduEndDate = new Date(edu.dateOfEnd);

        // Check if the dates are within the filter range
        const dateFilterPassed =
          (!upperDate || eduBeginDate <= upperDate) && (!lowerDate || eduEndDate >= lowerDate);

        // Check if the degree matches the filter
        const degreeFilterPassed = !this.degreeFilter || edu.degree === this.degreeFilter;

        return dateFilterPassed && degreeFilterPassed;
      });
    },
},
  methods: {
    asubmitForm() {
      console.log('Before postmessage');
      postEdu('https://wojciechlasowskiapi.azurewebsites.net/neweducation', this.educationForm, this.userToken)
        .then((data) => {
          console.log('Data received:', data);
          console.log('In THEN');
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
    filterEduList() {
      // Perform filtering when the button is clicked
      // Update the eduList with the filtered data
      console.log('Filtering');
      this.eduList = this.filteredEduList;
    },
    edu() {
      // Perform HTTP POST request using the data
      console.log('Before postmessage');
      this.isLoading = true;
      getEdu('https://wojciechlasowskiapi.azurewebsites.net/geteducation', this.userToken)
        .then((data) => {
          console.log('Data received:', data);
          console.log('In THEN');
          this.eduList = data;
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
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'numeric' };
      return new Date(dateString).toLocaleDateString('pl-PL', options);
    },
  },
  created() {
    this.edu();
  },

};

</script>

<style lang="scss" scoped>
.textin {
  background: darkcyan;
}

.filteringcontainer {
  display: flex;
}

.allForm>div {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  /* Align the divs to the top */

}

.filterinForm {}

.eduForm {
  padding-left: 200px;
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

  background-color: #ffffff;
  border: 4px solid violet;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 16px;
  width: 600px;
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
  margin: 0;
  padding: 0;
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
