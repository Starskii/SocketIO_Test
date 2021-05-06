import Vue from "vue";
import VueRouter,{ RouteConfig } from "vue-router";
import AppLogin from "./components/AppLogin.vue";
import Chat from "./components/Chat.vue";


Vue.use(VueRouter);
const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
    component: AppLogin
  },
  {
    name: "Chat",
    path: "/Chat",
    component: Chat
  }
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history"
});   
