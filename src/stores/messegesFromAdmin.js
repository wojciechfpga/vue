// store/messegesfromadminStore.js
import { defineStore } from 'pinia';
import getMessages from '@/utlis/apiadminmesseges';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';

export const useMessegesFromAdminStore = defineStore('messegesFromAdminStore', {
  state: () => ({
    messagestoadminFirst: { message: 'nie ma ID', createDate: new Date() },
    messagestoadminLoading: false,
    messagestoadminError: 0,
  }),
  getters: {
    GET_MESSAGEAF_LIST: (state) => state.messagestoadminFirst,
    GET_MESSAGEAF_LOADING: (state) => state.messagestoadminLoading,
    GET_MESSAGEAF_ERROR: (state) => state.messagestoadminError,
  },
  actions: {
    [actionTypes.FETCH_MESSAGEAF]({ state, commit, dispatch }) {
      if (state.messagestoadminLoading || state.messagestoadminFirst.length) return;

    //  commit(mutationTypes.SET_MESSAGEAF_LOADING, true);
      getMessages()
        .then((data) => {
          commit(mutationTypes.SET_MESSAGEAF_LIST, data);
        })
        .catch(() => {
          commit(mutationTypes.SET_MESSAGEAF_ERROR, 'Server error');
          dispatch(actionTypes.CLEAR_MESSAGEAF);
        })
        .finally(() => {
          commit(mutationTypes.SET_MESSAGEAF_LOADING, false);
        });
    },
    fetchAdminMessageAF() {
      if (this.messagestoadminLoading || !Array.isArray(this.messagestoadminFirst) || this.messagestoadminFirst.length === 0) return;
      console.log('Enter');
    //  commit(mutationTypes.SET_MESSAGEAF_LOADING, true);
      getMessages()
      .then((data) => {
        console.log('Data from API:', data);
        this.updateMesseges(data);
      })
      .catch((error) => {
    //    console.error('Error from API:', error);
    //    commit(mutationTypes.SET_MESSAGEAF_ERROR, 'Server error');
    //    dispatch(actionTypes.CLEAR_MESSAGEAF);
      })
      .finally(() => {
    //    commit(mutationTypes.SET_MESSAGEAF_LOADING, false);
      });
    },
    updateMesseges(payload) {
      this.messagestoadminFirst = payload
    },
    updateMesseges(payload) {
      this.messagestoadminFirst = payload
    },
    [actionTypes.CLEAR_MESSAGEAF]({ commit }) {
      commit(mutationTypes.SET_MESSAGEAF_LOADING, false);
      commit(mutationTypes.SET_MESSAGEAF_ERROR, 0);
      commit(mutationTypes.SET_MESSAGEAF_LIST, { id: 0, body: 'nie ma', deactivateStatus: 0 });
    },
  },
});
