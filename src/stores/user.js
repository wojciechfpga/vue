// store/userStore.js
import { defineStore } from 'pinia';

import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as getterTypes from './getter-types';
import router from '@/router/index';

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

const loguser = (emailAdress, password) => post('/api/login', emailAdress, password);

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: { success: false, userSuccess: false, adminSuccess: false, token: 'no' },
    userLoading: false,
    token: null,
    isAdmin: false,
    isUser: false,
    log: false,
  }),
  mutations: {
    mutationOfUser(state, userData) {
      console.log('user mutation');
      state.userData = userData;
    },
    [mutationTypes.SET_CURRENT_USER](state, userData) {
      state.userData = userData;
    },
    [mutationTypes.SET_CURRENT_USER_LOADING](state, isLoading) {
      state.userLoading = isLoading;
    },
    [mutationTypes.SET_CURRENT_STATUS](state, logresult) {
      state.log = logresult;
    },
  },
  getters: {
    [getterTypes.GET_CURRENT_USER](state) {
      return state.userData;
    },
    [getterTypes.GET_CURRENT_USER_LOADING](state) {
      return state.userLoading;
    },
    [getterTypes.GET_CURRENT_USER_TOKEN](state) {
      return state.token;
    },
    [getterTypes.GET_CURRENT_USER_ADMIN_STATUS](state) {
      return state.userData.adminSuccess;
    },
    [getterTypes.GET_CURRENT_USER_STATUS](state) {
      return state.userData.userSuccess;
    },
    [getterTypes.GET_CURRENT_USER_TOKEN](state) {
      return state.userData.token;
    },
    [getterTypes.GET_CURRENT_USER_TOKEN](state) {
      return state.userData.token;
    },
    getMyToken: (state) => {
      return state.userData.token;
    },
  },
  actions: {
    async [actionTypes.LOGIN]({ commit }, { email, password }) {
      console.log('Login begin');
    //  commit(mutationTypes.SET_CURRENT_USER_LOADING, true);
      await loguser(email, password)
        .then((userData) => {
          console.log('Login:', userData);
          this.updateMesseges(userData);
        })
        .catch(() => {
          router.push({ path: '/logfail' });
        })
        .finally(() => {
          commit(mutationTypes.SET_CURRENT_USER_LOADING, false);
          if (this.log == false) {
            // router.push({ path: '/logfail' });
          }
          console.log('Login done');
          router.push({ path: '/log' });
        });
    },
    async logto( email, password ){
      console.log('Login begin');
    //  commit(mutationTypes.SET_CURRENT_USER_LOADING, true);
      await loguser(email, password)
        .then((data) => {
          console.log('Login dane:', data);
          this.userData=data;
        })
        .catch((error) => {
          console.log('Login blad');
          console.error("An error occurred:", error.message);
          router.push({ path: '/logfail' });
        })
        .finally(() => {
          console.log('Login koniec');
         // commit(mutationTypes.SET_CURRENT_USER_LOADING, false);
          if (this.log == false) {
            // router.push({ path: '/logfail' });
          }
          console.log('Login done');
          router.push({ path: '/log' });
        });
    },
    updateUser(payload) {
      this.mutationOfUser(payload)
    },
    [actionTypes.LOGOUT]({ commit }) {
      commit(mutationTypes.SET_CURRENT_USER, { success: false, userSuccess: false, adminSuccess: false, token: 'no' });
      // return logout();
    },
    [actionTypes.FETCH_CURRENT_USER]({ commit, getters }) {
      if (getters.GET_CURRENT_USER) {
        return Promise.resolve();
      }
      commit(mutationTypes.SET_CURRENT_USER_LOADING, true);
      return;
    },
  },
});
