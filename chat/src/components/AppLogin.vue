<template>
<div>
  <div id="app">
  <v-app id="inspire">
    <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>

      <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="blue"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

         <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    </v-card-title> 
    <v-card-text>
      <v-form>
        <v-text-field 
          label="Email" 
          prepend-icon="mdi-account-circle"
          input name="Email" id="Email" type="text"  placeholder="Email" v-model="userEmail" 
        />
      </v-form>
      
      <v-form>
        <v-text-field 
        label="Display Name" 
        prepend-icon="mdi-account-circle"
        input name="DisplayName" id="DisplayName" type="text"  placeholder="Display Name" v-model="displayName" 
        />
      </v-form>

      <v-form>
        <v-text-field  
        input name="Password" id="Password"  placeholder="Password" v-model="userPassword" 
          type="password"
          label="Password" 
          prepend-icon="mdi-lock"
        />
      </v-form>
    </v-card-text>
     {{ message }} 
      <v-divider></v-divider>
    <v-card-actions>
        <v-btn  elevation= "18" color= "blue" :disabled="noInput" @click="createAccount">SignUp</v-btn>
          <v-spacer></v-spacer>
        <v-btn elevation="18" color ="blue" :disabled="noInput" @click="authenticate">LogIn</v-btn>
    </v-card-actions>
    </v-card>
  </v-app>
</div>
</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";


@Component
export default class AppLogin extends Vue {
 
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  private userEmail = "";
  private userPassword = "";
  private displayName = "";
  private message = "";
  private items: string[] = [
    "Login",
    "Sign Up"
  ]
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

        this.$router.push({ path: "/Chat" });
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
        this.$router.push({ path: "/Chat" });
      })
      .catch((err) => {
        this.showMessage(`Unable to login ${err}`);
      });
  }
}
</script>


<style scoped>

#inspire{
  color: red;
  background: url("../assets/background.jpg") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

</style>
