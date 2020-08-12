import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Registration from '../views/Registration.vue'
import Lessons from '../views/Lessons'
import Lesson from '../views/Lesson'
import Settings from '../views/Settings'
import Admin from '../views/Admin'

Vue.use(VueRouter);
// TODO re-enable history mode; it cant be used with github pages
export const router = new VueRouter({
 // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Registration
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/lessons',
      name: 'Lessons',
      component: Lessons,
    },
    {
      path: '/lessons/:id/:key',
      name: 'Lesson',
      component: Lesson,
      props: true
    },
    {
      path: '/settings/:id',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
    },
    { // redirct to login
      path: '*',
      redirect: '/'
    }
  ]
})

//check for auth on page
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// })
