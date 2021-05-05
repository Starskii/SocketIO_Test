<template>
<h1> This is JakeChat </h1>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";


@Component
export default class Chat extends Vue {
 
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  private userEmail = "";
  private userPassword = "";
  private displayName = "";
  private message = "";
  $router: any;
  get noInput(): boolean {
    return this.userEmail.length === 0 || this.userPassword.length === 0;
  }
  showMessage(m: string): void {
    this.message = m;
    setTimeout(() => {
      // Auto disappear after 5 seconds
      this.message = "";
    }, 5000);
  }

  
  createAccount(): void {
    this.$appAuth
      .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((u) => {
        this.showMessage(`User create UID ${u.user?.uid}`);
          this.$appDB
          .collection('users/')
            .add({      
              userID: this.$appAuth.tenantId,
              userEmail: this.userEmail,
              displayName: this.displayName
            });

        this.$router.push({ path: "/chat" });
      })
      .catch((err) => {
        this.showMessage(`Unable to create account ${err}`);
      });
  }
  authenticate(): void {
    this.$appAuth
      .signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((u) => {
        this.showMessage(`Login successful UID ${u.user?.uid}`);
        this.$router.push({ path: "/chat" });
      })
      .catch((err) => {
        this.showMessage(`Unable to login ${err}`);
      });
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
