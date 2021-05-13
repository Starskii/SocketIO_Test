<template>
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="10">
                        <v-text-field
                        type="text"
                        :placeholder=inputPlaceholder
                        v-model="userInput"
                        width="90%"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn elevation= "100" color= "green" top @click="sendButtonPressed">Send</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";


@Component
export default class ChatInput extends Vue {
 
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  $router: any;

  userInput = "";
  inputPlaceholder = "Type message ";

  sendButtonPressed(): void {
      this.userInput = "";
  }

}
</script>


<style scoped>

</style>
