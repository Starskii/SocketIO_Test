import Vue from "vue";
import VueRouter,{ RouteConfig } from "vue-router";
import AppLogin from "./components/AppLogin.vue";


Vue.use(VueRouter);
const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
    component: AppLogin,
  }
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});   
