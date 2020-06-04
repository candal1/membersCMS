/*  TODO error checking for login
    TODO error checking for registration 
    TODO store username in Users collection 
    TODO see if we can login with either userrname or email
         ...currently juse email is supported
*/
import { router } from '../router';
import DirectusSDK from "@directus/sdk-js";
//import { helperFunctions } from '../services';

// Directus SDK configured to use local storage for api session
const client = new DirectusSDK({
    url: "http://localhost:8082",
    project: "_",
    storage: "cookie"
})

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    
    // Login to directus 
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });
        
        // Signs into the directus api storing token in local storage
        client.login({email: email, password: password, mode: "cookie"})
        .then( data => {

            localStorage.setItem('user', JSON.stringify(data));
            commit('loginSuccess', data);
            router.push('/');
        })
        .catch( error => {
            commit('loginFailure', error);
            dispatch('alert/error', error, {root: true});
        })
    },
    // Ensure login status, logout and clear local storage
    logout({ commit }) {
        if (state.status.loggedIn) {
            client.logout(); 
            localStorage.removeItem('user');
        }
        commit('logout');
    },
    // Register new directus_user and push to login page on success
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
        // Send user payload to directus_user RESTpoint 
        client.api.post( "/users", {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password,
            role: "4", // public member role (low permission access)
            status: "active"
        })
        .then ( data => {
            commit('registerSuccess', data);
            router.push('/login');
            setTimeout(() => {
                dispatch('alert/success', 'Registration successful', { root: true });
            })
        })
        .catch ( error => {
            commit('registerFailure', error);
            dispatch('alert/error', error, {root: true});
        })
        // TODO Create user in Users collection and assign directus_user to it
        //      - call getUsers() to find the user just registered and store the ID
        //      - call createItem() to add new item to "users" collection with ID ^

    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
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
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};