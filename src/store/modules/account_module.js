/*  TODO error checking for login
    TODO error checking for registration TODO store username in Users collection 
    TODO see if we can login with either userrname or email
         ...currently juse email is supported
*/
import { router } from '../../router';
import { parsingHelpers } from '../../utils';
import Vue from 'vue';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

const actions = {
   // Login to directus
   login({ dispatch, commit }, { email, password }) {
      commit('loginRequest', { email });

      // _vm.$client is the global directus SDK instance, defined in main.js
      // Attempts to signs into the directus SDK client
      this._vm.$client
         .login({ email: email, password: password })
         .then((data) => {
            const newUser = parsingHelpers.accountNormalizer(data['data']);
            localStorage.setItem('user', JSON.stringify(newUser));
            commit('loginSuccess', newUser);
            router.push('/');
         })
         .catch((error) => {
            commit('loginFailure', error);
            dispatch('alert/error', error, { root: true });
         });
   },
   // Ensure login status, logout and clear local storage
   logout({ commit }) {
      if (state.status.loggedIn) {
         this._vm.$client.logout();
         localStorage.removeItem('user');
      }
      commit('logout');
   },
   // Register prev directus_user and push to login page on success
   register({ dispatch, commit }, user) {
      commit('registerRequest', user);
      // Send user payload to directus_user RESTpoint
      this._vm.$client.api
         .post('/users', {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password,
            role: '4', // public member role (low permission access)
            status: 'active',
         })
         .then((data) => {
            commit('registerSuccess', data);
            router.push('/login');
            setTimeout(() => {
               dispatch('alert/success', 'Registration successful', { root: true });
            });
         })
         .catch((error) => {
            commit('registerFailure', error);
            dispatch('alert/error', error, { root: true });
         });
   },
   updateField({ commit, dispatch }, params) {
      const type = params[0];
      const update = params[1];
      var prev = JSON.parse(localStorage.getItem('user'));
      if (!prev) {
         dispatch('alert/error', "Hmmm you don't seem to be properly logged in.", { root: true });
      } else {
         switch (type) {
            case 'name':
               prev['first_name'] = update.split(' ')[0];
               prev['last_name'] = update.split(' ')[1];
               commit('updateName', update);
               break;
            case 'email':
               prev['email'] = update;
               commit('updateEmail', update);
               break;
         }
         localStorage.setItem('user', JSON.stringify(prev));
      }
   },
};

const mutations = {
   loginRequest(state, user) {
      state.status = { loggingIn: true };
      Vue.set(state, 'user', user);
   },
   loginSuccess(state, user) {
      state.status = { loggedIn: true };
      Vue.set(state, 'user', user);
   },
   loginFailure(state) {
      state.status = {};
      state.user = null;
   },
   logout(state) {
      state.status = {};
      state.user = null;
   },
   registerRequest(state) {
      state.status = { registering: true };
   },
   registerSuccess(state) {
      state.status = {};
   },
   registerFailure(state) {
      state.status = {};
   },
   updateEmail(state, update) {
      state.user['email'] = update;
   },
   updateName(state, update) {
      state.user['first_name'] = update.split(' ')[0];
      state.user['last_name'] = update.split(' ')[1];
   },
};

export const account = {
   namespaced: true,
   state,
   actions,
   mutations,
};
