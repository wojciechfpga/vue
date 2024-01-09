<template>
  <div>
    <h1>Lista użytkowników</h1>
    <table>
      <thead>
        <tr>
          <th>Adres email</th>
          <th>Aktywny</th>
          <th>Admin</th>
          <th>Banuj</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in users" :key="x.emailAdress">
          <td>{{ x.emailAdress }}</td>
          <td>{{ x.isActive }}</td>
          <td>{{ x.isAdmin }}</td>
          <td><button v-on:click="setBanUser(x.emailAdress)">Banuj</button></td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
    <h1>Zabanowane IP</h1>
    <table>
      <thead>
        <tr>
          <th>Adres IP</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in ipbanned" :key="x.bannedIP">
          <td>{{ x.bannedIP }}</td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
    <h1>Adresy IP w pamieci</h1>
    <table>
      <thead>
        <tr>
          <th>Adres</th>
          <th>Ilość zapytań</th>
          <th>Ban</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in ipadresses" :key="x.message">
          <td>{{ x.ip }}</td>
          <td>{{ x.requestCount }}</td>
          <td><button v-on:click="setBan(x.ip)">Ban IP</button></td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
    <h1>Subsckrybcje</h1>
    <table>
      <thead>
        <tr>
          <th>Opis</th>
          <th>Częstotliwość</th>
          <th>Aktywna</th>
          <th>Typ</th>
          <th>Adres e-mail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in subscribtions" :key="x.message">
          <td>{{ x.description }}</td>
          <td>{{ x.frequency }}</td>
          <td>{{ x.isActive }}</td>
          <td>{{ x.type }}</td>
          <td>{{ x.userEMail }}</td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

const MAX_DELAY = 2500;

const getSub = (url,token) => new Promise((resolve, reject) => {
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

const getSubscribtions = (token) => getSub('/getallsubscribtion',token);
const getIP = (url,token) => new Promise((resolve, reject) => {
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

const getIPs = (token) => getIP('/getips',token);
const getU = (url,token) => new Promise((resolve, reject) => {
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

const getUsers= (token) => getU('/allusers',token);
const postBan = (url,ipAdress,token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      IPAdress:ipAdress
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



const ban = (ipAdress,token) => postBan('/ban',ipAdress,token);
const getBanned = (url,token) => new Promise((resolve, reject) => {
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

const getBans= (token) => getBanned('/bannedips',token);
const postSetBan = (url,name,token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.post(url, {
      Name:name
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



const banUser = (name,token) => postSetBan('/banuser',name,token);
import * as getterTypes from '@/store/getter-types';
import { mapGetters } from 'vuex';
export default {
  name: 'users',
  computed: {
    ...mapGetters({
      userToken: getterTypes.GET_CURRENT_USER_TOKEN,
      adminStatus: getterTypes.GET_CURRENT_USER_ADMIN_STATUS,
    }),

  },
  methods: {
    convertdate(DateA) {
      let dt = new Date(DateA);
      return dt.toLocaleDateString('pl-PL');
    },
    checkAdmin() {
      if (!this.adminStatus) {
        this.$router.push({ path: '/' });
      }
    },
    getAllSubs() {
      getSubscribtions(this.userToken)
        .then((data) => {
          this.subscribtions = data;
        })
        .catch(() => {

        })
        .finally(() => {
        });
    },

    getAllIPs() {
      getIPs(this.userToken)
        .then((data) => {
          this.ipadresses = data;
        })
        .catch(() => {

        })
        .finally(() => {
        });
    },
    getAllUsers() {
      getUsers(this.userToken)
        .then((data) => {
          this.users = data;
        })
        .catch(() => {

        })
        .finally(() => {
        });
    },
    getAllBannedIPs() {
      getBans(this.userToken)
        .then((data) => {
          this.ipbanned = data;
        })
        .catch(() => {

        })
        .finally(() => {
        });
    },
    setBan(ip) {
      ban(ip, this.userToken)
        .then((data) => {
        })
        .catch(() => {
        })
        .finally(() => {

        });
      setTimeout(() => this.$router.push({ path: '/' }), 1000);

    },

    setBanUser(user) {
      banUser(user, this.userToken)
        .then((data) => {
          this.$router.push({name: 'operationresult', query: { result: data.success }});
        })
        .catch(() => {
        })
        .finally(() => {

        });

    },

  },
  data() {
    return {
      subscribtions: [
        { description: 'no', type: 'no', frequency: 0, isActive: false, userEMail: "no mail" }
      ],
      ipadresses: [
        { ip: 'nie ma adresu IP', requestCount: 0 }
      ],
      users: [
        { emailAdress: 'nie ma adresu email', isActive: false, isAdmin: false }
      ],
      ipbanned: [
        { bannedIP: 'pusta lista' }
      ],
    }
  },

  created() {
    this.checkAdmin();
    if (this.adminStatus) {
      this.getAllSubs();
      this.getAllIPs();
      this.getAllUsers();
      this.getAllBannedIPs();
    }
  },
}
</script>

<style  scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

th,
td {
  padding: 15px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background: linear-gradient(to bottom, #4CAF50, #45a049);
  color: white;
}

td:nth-child(1) {
  background: linear-gradient(to bottom, #3498db, #2980b9);
  color: white;
}

td:nth-child(2) {
  background: linear-gradient(to bottom, #e74c3c, #c0392b);
  color: white;
}

td:nth-child(3) {
  background: linear-gradient(to bottom, #f39c12, #d35400);
  color: white;
}

td:nth-child(4) {
  background: linear-gradient(to bottom, #9b59b6, #8e44ad);
  color: white;
}

td:nth-child(5) {
  background: linear-gradient(to bottom, orange, red);
  color: white;
}
</style>
