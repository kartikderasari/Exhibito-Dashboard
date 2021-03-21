<template>
  <v-bottom-navigation v-model="value" app grow color="blue">
    <v-btn class="white" value="about" to="/about">
      <span>About</span>
      <v-icon>mdi-human-greeting</v-icon>
    </v-btn>

    <v-btn class="white" value="skills" to="skills">
      <span>Skills</span>
      <v-icon>mdi-account-star</v-icon>
    </v-btn>

    <v-btn class="white" value="experience" to="experience">
      <span>Experience</span>
      <v-icon>mdi-file-document</v-icon>
    </v-btn>

    <v-btn class="white" value="projects" to="projects">
      <span>Projects</span>
      <v-icon>mdi-folder-zip</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({ value: "about" }),
};
</script>
