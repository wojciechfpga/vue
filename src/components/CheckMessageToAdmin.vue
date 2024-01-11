<template>
    <div>
        <input type="button" class="button-message" value="Sprawdź wiadomości od użytkowników"
        v-on:click="reversedMessage" />
    </div>
</template>

<script>
import * as actionTypes from '@/stores/action-types';

import * as getterTypes from '@/stores/getter-types';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
export default {
  name: 'CheckMessageToAdmin',
  props: {
    messagetoadmin: [Number, String],
  },
  setup() {
    const userStore = useUserStore();

    const userStatus = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const adminStatus = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);
    const userToken = computed(() =>userStore.GET_CURRENT_USER_TOKEN);

    const fetchAdminMessage = async () => {
      await messegesStore.fetchAdminMessage();
    };

    // Use onMounted hook to dispatch the action when the component is mounted
    onMounted(() => {
      messeges.dispatch('fetchAdminMessageAF');
    });

    return {
      userToken,
      fetchAdminMessage,

    };
  },
  methods: {
    reversedMessage() {
    this.$store.dispatch('fetchAdminMessage', this.userToken);
    },

  },

};
</script>

<style scoped>
.button-message {
    margin-top:10px;
    margin-bottom:10px;
    align-items: center;
    background-color: #0A66C2;
    border: 0;
    border-radius: 100px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-flex;

    font-family: -apple-system, system-ui, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
     "Lucida Grande", Helvetica, Arial, sans-serif;

    font-size: 16px;
    font-weight: 600;
    justify-content: left;
    line-height: 20px;
    max-width: 480px;
    min-height: 40px;
    min-width: 0px;
    overflow: hidden;
    padding: 0px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    touch-action: manipulation;

    transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s
    cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;

    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
}

    .button-message:hover, .button-message:focus {
        background-color: #16437E;
        color: #ffffff;
    }

    .button-message:active {
        background: #09223b;
        color: rgb(255, 255, 255, .7);
    }

    .button-message:disabled {
        cursor: not-allowed;
        background: rgba(0, 0, 0, .08);
        color: rgba(0, 0, 0, .3);
    }
</style>
