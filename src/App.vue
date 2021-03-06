<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-divider></v-divider>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FDK from "@/config/firebase.js";
export default {
  name: "App",
  components: { Navbar, Footer },
  methods: {
    logoutUser: function() {
      FDK.auth()
        .signOut()
        .then(function() {
          this.userLoggedIn = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>
