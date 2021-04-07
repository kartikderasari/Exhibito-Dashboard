<template>
  <v-main>
    <v-container>
      <v-card class="mt-15 py-15 grey lighten-4" elevation="2" outlined>
        <v-row no-gutters>
          <v-col align="center" cols="12" sm="12" md="5" lg="5">
            <v-img
              class="rounded-lg"
              lazy
              src="https://raw.githubusercontent.com/kartikderasari/Portfolio-Assets/main/Projects/Portfolio-Dashboard.svg"
              max-width="50vh"
            ></v-img>
          </v-col>
          <v-col
            class="d-flex flex-column justify-center align-center align-sm-center align-md-start align-lg-start"
            cols="12"
            sm="12"
            md="7"
            lg="7"
          >
            <v-card-title
              class="headline font-weight-medium teal--text text--darken-2 pb-0"
              >Exhibito Dashboard</v-card-title
            >
            <v-card-text
              class="body-1 text-center text-sm-center text-md-start text-lg-start"
            >
              Login to your account to access your dashboard!
            </v-card-text>
            <v-card-actions>
              <v-btn class="ml-2 px-5" color="primary" @click="googleLogin()"
                >Login with Google</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import FDK from "@/config/firebase.js";
export default {
  methods: {
    googleLogin: function () {
      var provider = new FDK.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/plus.login");
      FDK.auth()
        .signInWithPopup(provider)
        .then(() => (window.location.href = "./about"));
    },
    checkState: function () {
      FDK.auth().onAuthStateChanged(function (user) {
        if (user) {
          window.location.href = "./about";
        } else {
          //Do nothing
          setTimeout(() => {
            console.log("Nothing happens");
          }, 5000);
          return;
        }
      });
    },
  },
  created: function () {
    //this.checkState();
  },
};
</script>
