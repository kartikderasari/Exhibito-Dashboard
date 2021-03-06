<template>
  <h1>Home</h1>
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
        .then(() => (this.userLoggedIn = true));
    },
    checkState: function() {
      //let ref = this;
      FDK.auth().onAuthStateChanged(function(user) {
        if (user) {
          // ref.userDetails = user;
          // ref.userLoggedIn = true;
          // ref.readData();
        } else {
          // ref.userLoggedIn = false;
        }
      });
    },
  },
};
</script>
