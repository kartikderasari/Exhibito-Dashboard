<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
    <BottomNav
      v-if="this.pathname != '/' && this.$vuetify.breakpoint.width < 800"
    />
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
  mounted: function() {
    this.pathname = window.location.pathname;
  },
};
</script>
