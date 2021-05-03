import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app"
import "firebase/firestore"
import VueApexCharts from "vue-apexcharts"
import { AppRouter } from "./app-routing";
import "@firebase/auth";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(VueApexCharts)
Vue.config.productionTip = false
Vue.use(Vuetify);

const firebaseConfig = {
  apiKey: "AIzaSyAYy_bjqB7WSOZn3EcpwPDsGvi_ezoCX5A",
  authDomain: "socketiochat-76972.firebaseapp.com",
  projectId: "socketiochat-76972",
  storageBucket: "socketiochat-76972.appspot.com",
  messagingSenderId: "450414338222",
  appId: "1:450414338222:web:dca92baa393fc708fa0d3f",
  measurementId: "G-BMWC94WFG0"
};

firebase.initializeApp(firebaseConfig);
Vue.prototype.$appDB = firebase.firestore();
Vue.prototype.$appAuth = firebase.auth();

new Vue({
  router: AppRouter,
  vuetify: new Vuetify(),
  render: (h) => h(App)
}).$mount('#app')
