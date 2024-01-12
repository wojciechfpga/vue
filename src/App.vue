<template>
  <div id="appl">
    <the-header />
    <login-register :IsToken="userStatus || adminStatus" />
    <div class="main-container">
      <router-view class="routerc" />
      <div>
        <!-- MessagesBox component goes here -->
        <messages-box :messagefromadmin="message" />
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import LoginRegister from '@/components/LoginRegister.vue';
import MessagesBox from '@/components/MessagesBox.vue';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useMessegesFromAdminStore } from '@/stores/messegesFromAdmin';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    LoginRegister,
    MessagesBox,
  },
  setup() {
    const userStore = useUserStore();
    const messegesStore = useMessegesFromAdminStore();

    // Access state
//    const userData = ref(userStore.userData);
   // const userLoading = ref(userStore.userLoading);
  //  const userToken = ref(userStore.token);

    // Access messegesFromAdmin state
  //  const messegesFromAdminState = ref(messegesStore.messagestoadminFirst);

    // Access getters
    const userStatus = computed(() => userStore.GET_CURRENT_USER_STATUS);
    const adminStatus = computed(() => userStore.GET_CURRENT_USER_ADMIN_STATUS);
    const message = computed(() => messegesStore.GET_MESSAGEAF_LIST);
    // Call actions
    /*const loginUser = async (email, password) => {
      await userStore.LOGIN({ email, password });
    };

    const logoutUser = () => {
      userStore.LOGOUT();
    };

    const fetchCurrentUser = async () => {
      await userStore.FETCH_CURRENT_USER();
    };

    const fetchAdminMessageAF = async () => {
      await messegesStore.fetchAdminMessageAF();
    };
    onMounted(() => {
      // Call the action to fetch messages when the component is mounted
      messegesStore.fetchAdminMessageAF();
    });*/
    onMounted(() => {
      // Call the action to fetch messages when the component is mounted
      console.log('wywolane  - messeges AF - on mounted')
      messegesStore.fetchAdminMessageAF();
    });
    // Use onMounted hook to dispatch the action when the component is mounted
    //onMounted(() => {
    // fetchAdminMessageAF();
    //});

    return {
   //   userData,
    //  userLoading,
   //   userToken,
      userStatus,
    //  loginUser,
     // logoutUser,
    //  fetchCurrentUser,
  //    messegesFromAdminState,
      adminStatus,
      message,
    };
  },
 
  created() {
  //  console.log('wywolane create - messeges AF')
 //   const myStore = useMessegesFromAdminStore();
  //  myStore.fetchAdminMessageAF();
  },
};
</script>

<style lang="scss">
#appl {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-container {
  display: flex;
  justify-content: center;
  /* Space between router-view and messages-area */
}

.messages-area {
  width: 200px;
  padding: 16px;
  background-color: #ffffff;
  border: 2px solid #e74c3c;
  /* Red border */
  border-radius: 8px;
  margin-left: 16px;
  /* Adjust margin as needed */
  margin-right: 0;
}

.routerc {
  width: 80%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}</style>
