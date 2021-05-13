<template>
<v-card width="90%" class="mx-auto mt-5" color="rgb(150,150,255,.4)">
  <h1> This is JakeChat</h1>
  <v-divider></v-divider>
  <h1>Send a message</h1>
</v-card>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";


@Component
export default class Chat extends Vue {
 
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  $router: any;
  
  mounted(): void {
      if(!this.userLoggedIn()){
          this.$router.push({path: "/"});
      }
  }

   userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }

}
</script>


<style scoped>

#inspire {
  background: url("../assets/background.jpg") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

</style>
