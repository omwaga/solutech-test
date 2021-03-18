import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import axios from 'axios';
import './forms-handler.js';

Vue.use(VueRouter);

Vue.use(axios);

let app = new Vue({
    el: '#app',

    router: new VueRouter(routes)
});
