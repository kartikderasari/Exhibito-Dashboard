<template>
  <v-app-bar app color="white" dense elevation="1">
    <div class="headline text-no-wrap" style="width: 250px;">
      <router-link
        class="font-weight-medium grey--text text--darken-1 text-decoration-none"
        to="/about"
        style="width: 250px;"
      >
        Portfolio Dashboard
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-tabs right v-if="this.$vuetify.breakpoint.width > 800">
      <v-tab to="about">About</v-tab>
      <v-tab to="skills">Skills</v-tab>
      <v-tab to="experience">Experience</v-tab>
      <v-tab to="projects">Projects</v-tab>
    </v-tabs>
    <v-btn color="primary" outlined small @click="logoutUser()">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import FDK from "@/config/firebase.js";
export default {
  methods: {
    logoutUser: function() {
      FDK.auth()
        .signOut()
        .then(function() {
          window.location.href = "/";
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    checkState: function() {
      FDK.auth().onAuthStateChanged(function(user) {
        if (user) {
          //Do Nothing
        } else {
          window.location.href = "/";
        }
      });
    },
  },
  created: function() {
    this.checkState();
  },
};
</script>
