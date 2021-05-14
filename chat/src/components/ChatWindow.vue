<template>
    <v-row>
      <v-col cols="12" class="scrollable">
        <v-list subheader color="rgb(255,255,255,.0)">
          <v-list-item v-for="message in messages" v-bind:key="message">
            <v-list-item-content>
              <v-list-item-title>{{message}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";


@Component
export default class ChatWindow extends Vue {
 
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  $router: any;

  messages: string[] = [
    "Hey",
    "Hello!",
    "My name is Jake",
    "Wow dude that's awesome!",
    "Yeah man wbu?",
    "Goodbye"
  ]

}
</script>


<style scoped>

</style>
