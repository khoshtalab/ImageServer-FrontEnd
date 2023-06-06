import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
import AboutView from "@/views/AboutView";
import PlansListView from "@/views/Auth/PlansListView";
import LibraryView from "@/views/Auth/LibraryView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true, title: 'صفحه پروفایل'}
  },{
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {verified: true, title: 'صفحه درباره ما'}
  },{
    path: '/plans',
    name: 'Plans',
    component: PlansListView,
    meta: {verified: true, title: 'صفحه پلن ها'}
  },{
    path: '/library',
    name: 'Library',
    component: LibraryView,
    meta: {verified: true, title: 'صفحه فایل ها'}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Auth/LoginView.vue'),
    meta: {guest: true, title: 'ورود'}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Auth/RegisterView.vue'),
    meta: {guest: true, title: 'ثبت نام'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {


  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['auth/authenticated']) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters['auth/authenticated']) {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.verified)){

    if (!store.getters['auth/verified']) {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })

    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})


export default router
