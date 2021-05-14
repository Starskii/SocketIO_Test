<template>
<v-card height="400px" width="90%" class="mx-auto mt-5" color="rgb(255,255,255,.75)">
  <chat-window></chat-window>
  <v-divider></v-divider>
  <chat-input align="end"></chat-input>
</v-card>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";
import ChatInput from "./ChatInput.vue";
import ChatWindow from "./ChatWindow.vue";


@Component({
  components: {
    ChatInput,
    ChatWindow
  },
})
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
