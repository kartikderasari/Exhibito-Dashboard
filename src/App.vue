<template>
  <v-app>
    <Navbar v-if="pathname != '/'" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer v-if="pathname != '/'" />
    <BottomNav v-if="pathname != '/' && this.$vuetify.breakpoint.width < 800" />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
export default {
  name: "App",
  data: () => {
    return {
      pathname: null,
    };
  },
  components: { Footer, BottomNav, Navbar },
  created: function() {
    this.pathname = window.location.pathname;
  },
};
</script>
