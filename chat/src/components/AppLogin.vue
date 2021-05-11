<template>
<div>
  <div id="app">
  <v-app id="inspire">
    <v-card width="30%" class="mx-auto mt-5">
    <v-card-title width="100%">

     <v-tabs
      v-model="tab"
      fixed-tabs
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-card flat width="400px">
          <v-card-text>
            
            <v-form
            v-for="form in item.content.forms"
            :key="form.name"
            >

            <v-text-field
            :label=form.name
            :type=form.type
            :placeholder=form.placeholder
            v-model="form.model"
            >
            </v-text-field>

            </v-form>
          {{ message }} 

        <v-btn  elevation= "100" color= "blue" top :style="{left: '42%', transform:'translateX(-50%)'}" @click="buttonPressed(item.content.createAccount, item.content)">{{item.content.buttonText}}</v-btn>

          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-card-title> 
    </v-card>
  </v-app>
</div>
</div>
</template>

<script lang="ts">

interface DataFormat{
  forms : [
    {
      name: string,
      model: string
    }
  ]
}

import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";


@Component
export default class AppLogin extends Vue {

  data () {
      return {
        tab: null,
        items: [
          { 
            tab: 'Login', content: {
              forms: [
                {name: "Email", type:"text", placeholder: "Email", model: ""},
                {name: "Password", type: "password", placeholder: "Password", model: ""}
              ],
              buttonText: "Login",
              createAccount: false
          } },
          { 
            tab: 'Sign Up', content: {
              forms: [
                {name: "Display Name", type: "text", placeholder: "Display Name", model: ""},
                {name: "Email", type:"text", placeholder: "Email", model: ""},
                {name: "Password", type: "password", placeholder: "Password", model: ""}
              ],
              buttonText: "SignUp",
              createAccount: true
          } }
        ],
      }
    }
 
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

  buttonPressed(createAccount: boolean, formList: DataFormat): void {
    let uEmail = "";
    let uPass = "";
    let uDisplay = "";

    if(createAccount){
      //SignUp
      for(let form in formList.forms){
        if(formList.forms[form].name == "Display Name"){
          uDisplay = formList.forms[form].model;
        }else if(formList.forms[form].name == "Email"){
          uEmail = formList.forms[form].model;
        }else{
          uPass = formList.forms[form].model;
        }
      }
      console.log(
        "\nuEmail: " + uEmail +
        "\nuPass: " + uPass +
        "\nuDisplay: " + uDisplay
      );
      this.createAccount(uEmail, uPass, uDisplay);
    }else{
      //Login
      for(let form in formList.forms){
        if(formList.forms[form].name == "Email"){
          uEmail = formList.forms[form].model;
        }else{
          uPass = formList.forms[form].model;
        }
      }
      console.log(
        "\nuEmail: " + uEmail +
        "\nuPass: " + uPass +
        "\nuDisplay: " + uDisplay
      );
      this.authenticate(uEmail, uPass);
    }
  }

  
  createAccount(uEmail: string, uPass: string, uDisplay: string): void {
    this.$appAuth
      .createUserWithEmailAndPassword(uEmail, uPass)
      .then((u) => {
        this.showMessage(`User create UID ${u.user?.uid}`);
          this.$appDB
          .collection('users/')
            .add({      
              userEmail: uEmail,
              displayName: uDisplay
            });

        this.$router.push({ path: "/Chat" });
      })
      .catch((err) => {
        this.showMessage(`Unable to create account ${err}`);
      });
  }
  authenticate(uEmail: string, uPass: string): void {
    this.$appAuth
      .signInWithEmailAndPassword(uEmail, uPass)
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
