<template>

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

}
</script>


<style scoped>

</style>
