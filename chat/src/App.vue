<template id="fullApp">

  <v-app>  
<div id="app">
  <v-app>
    <v-main>
      <v-container> 
        <v-app-bar app src="./assets/header.jpg" color="#6495ED" height=90px>
          <v-toolbar-title style="color: white">JakeChat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn v-if="userLoggedIn()" @click="doLogout" color=red>LogOut </v-btn>
          <v-btn v-else-if="doLogout" @click="userLoggedIn()" color=green >SignUp Below</v-btn>
        </v-app-bar>
      </v-container>
    </v-main>
  <router-view></router-view>
  </v-app>
</div>
   
    <v-tab> 
    <v-btn v-if="userLoggedIn()" @click="doLogout">SignOut</v-btn>
  </v-tab>
    
  </v-app>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import AppLogin from "./components/AppLogin.vue";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";


@Component({
  components: {
    AppLogin
  },
})
export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  $router: any;

  // This function is automatically called when
  // the App component is added to the DOM tree
  mounted(): void {
    //
  }

  goCreateGroupScreen(): void{
    this.$router.push({ path: "/CreateGroup" });
  }

  goActiveGroupScreen(): void{
    this.$router.push({ path: "/group" });
  }

  goRestoSearchScreen(): void{
    this.$router.push({ path: "/restosearch" });
  }

  doLogout(): void {
    this.$appAuth.signOut();
    this.$router.push({path: "/"}); // Go backward in the "history stack"
  }
  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }
}
</script>

<style>
button{
  margin: 10px;
  margin-left: 30px;
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #363611;
  margin-top: 1000px;
}
#top {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas: "input summary" "donut expenses";
}
.v-container{
  padding: auto;

}

#fullApp color{
  color: red;
  background: url("./assets/background.jpg") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>