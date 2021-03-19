<template>
  <v-main>
    <v-container>
      <v-card class="mt-15 py-15 grey lighten-4" elevation="2" outlined>
        <v-row>
          <v-col align="center" cols="5">
            <v-img
              class="rounded-lg"
              lazy
              src="https://raw.githubusercontent.com/kartikderasari/Portfolio-Assets/main/Projects/News-Flash.svg?token=AJSPHOMJMQ5X73DFCSNWFVLAK6VMK"
              max-width="30vw"
            ></v-img>
          </v-col>
          <v-col class="d-flex flex-column justify-center">
            <v-card-title
              class="headline font-weight-medium teal--text text--darken-2 pb-0"
              >Portfolio Dashboard</v-card-title
            >
            <v-card-text class="body-1"
              >Login to your account to manage your dashboard!</v-card-text
            >
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
    googleLogin: function() {
      var provider = new FDK.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/plus.login");
      FDK.auth()
        .signInWithPopup(provider)
        .then(() => (window.location.href = "./about"));
    },
    checkState: function() {
      FDK.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location.href = "./about";
        } else {
          //Do nothing
        }
      });
    },
  },
  mounted: function() {
    this.checkState();
  },
};
</script>
