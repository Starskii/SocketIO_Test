import Vue from "vue";
import VueRouter,{ RouteConfig } from "vue-router";
import AppLogin from "./components/AppLogin.vue";
import Chat from "./components/chat.vue";


Vue.use(VueRouter);
const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
    component: AppLogin
  },
  {
    name: "chat",
    path: "/chat",
    component: Chat
  }
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history"
});   
