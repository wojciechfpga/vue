import { defineStore } from 'pinia';
import getMessages from '@/utlis/api';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';

export const useMessageStore = defineStore('messageToAdminStore', {
  state: () => ({
    messagestoadminFirst: { id: 0, body: 'nie ma', deactivateStatus: 0 },
    messagestoadminLoading: false,
    messagestoadminError: 0,
  }),
  getters: {
    GET_MESSAGE_LIST: (state) => state.messagestoadminFirst,
    GET_MESSAGE_LOADING: (state) => state.messagestoadminLoading,
    GET_MESSAGE_ERROR: (state) => state.messagestoadminError,
  },
  actions: {
    [actionTypes.FETCH_MESSAGE](token) {
      if (this.messagestoadminLoading || this.messagestoadminFirst.length) return;

      this.SET_MESSAGE_LOADING(true);
      getMessages(token)
        .then((data) => {
          this.SET_MESSAGE_LIST(data);
        })
        .catch(() => {
          this.SET_MESSAGE_ERROR('Server error');
          this.CLEAR_MESSAGE();
        })
        .finally(() => {
          this.SET_MESSAGE_LOADING(false);
        });
    },
    [actionTypes.CLEAR_MESSAGE]() {
      this.SET_MESSAGE_LOADING(false);
      this.SET_MESSAGE_ERROR(0);
      this.SET_MESSAGE_LIST({ id: 0, body: 'nie ma', deactivateStatus: 0 });
    },
  },
  actions: {
    FETCH_MESSAGE: (token) => {
      if (this.messagestoadminLoading || this.messagestoadminFirst.length) return;

      this.SET_MESSAGE_LOADING(true);
      getMessages(token)
        .then((data) => {
          this.SET_MESSAGE_LIST(data);
        })
        .catch(() => {
          this.SET_MESSAGE_ERROR('Server error');
          this.CLEAR_MESSAGE();
        })
        .finally(() => {
          this.SET_MESSAGE_LOADING(false);
        });
    },
    fetchAdminMessage(token) {
      if (this.messagestoadminLoading || this.messagestoadminFirst.length) return;
      let tokensend=token;
      //commit(mutationTypes.SET_MESSAGE_LOADING, true);
      getMessages(tokensend)
        .then((data) => {
          this.updateMesseges(data);
        })
        .catch(() => {
       //   commit(mutationTypes.SET_MESSAGE_ERROR, 'Server error');
        //  dispatch(actionTypes.CLEAR_MESSAGE);
        })
        .finally(() => {
         // commit(mutationTypes.SET_MESSAGE_LOADING, false);
        });

    },
    updateMesseges(payload) {
      this.messagestoadminFirst = payload
    },
    CLEAR_MESSAGE: () => {
      this.SET_MESSAGE_LOADING(false);
      this.SET_MESSAGE_ERROR(0);
      this.SET_MESSAGE_LIST({ id: 0, body: 'nie ma', deactivateStatus: 0 });
    },
  },
});
