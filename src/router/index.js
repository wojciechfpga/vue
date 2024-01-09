import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const Contact = () => import('../views/ContactView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');
const MessagesFromAdmin = () => import('../views/MessagesFromAdmin.vue');
const Projects = () => import('../views/Projects.vue');
const Education = () => import('../views/Education.vue');
const Experience = () => import('../views/Experience.vue');
const Links = () => import('../views/Links.vue');
const Copyrights = () => import('../views/Copyrights.vue');
const Register = () => import('../views/Register.vue');

const Login = () => import('../views/Login.vue');
const Logout = () => import('../views/Logout.vue');
const Registered=()=>import('../views/Registered.vue');
const RegisterFail=()=>import('../views/RegisterFail.vue');
//const ReCaptcha=()=>import('../views/ReCaptcha.vue');
const Log=()=>import('../views/Log.vue');
const LogFail=()=>import('../views/LogFail.vue');
const Problem=()=>import('../views/Problem.vue');
const WriteArticle=()=>import('../views/WriteArticle.vue');
const Users=()=>import('../views/Users.vue');
const OperationResult=()=>import('../views/OperationResult.vue');//AdminMessageForm
const AdminMessageForm=()=>import('../views/AdminMessageForm.vue');
const Certificates=()=>import('../views/Certificates.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/certificates',
      name: 'certificates',
      component: Certificates,
    },
    {
      path: '/adminessageform',
      name: 'adminmessageform',
      component: AdminMessageForm,
    },
    {
      path: '/operationresult',
      name: 'operationresult',
      component: OperationResult,
      props: route => ({ result: route.query.result }),
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/writearticle',
      name: 'writearticle',
      component: WriteArticle,
    },
    {
      path: '/problem',
      name: 'problem',
      component: Problem,
    },
    {
      path: '/logfail',
      name: 'logfail',
      component: LogFail,
    },
    {
      path: '/log',
      name: 'log',
      component: Log,
    },
    {
      path: '/registerfail',
      name: 'registerfail',
      component: RegisterFail,
    },
    {
      path: '/registered',
      name: 'registered',
      component: Registered,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/copyrights',
      name: 'Copyrights',
      component: Copyrights,
    },
    {
      path: '/links',
      name: 'Links',
      component: Links,
    },
    {
      path: '/experience',
      name: 'Experience',
      component: Experience,
    },
    {
      path: '/education',
      name: 'Education',
      component: Education,
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },
    {
      path: '/messagesfromadmin',
      name: 'AdminMessages',
      component: MessagesFromAdmin,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/404',
      name: 'PageNotExist',
      component: () => import('../views/NotFoundView.vue'),
    }
  ]
})

export default router
