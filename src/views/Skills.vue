<template>
  <v-main>
    <Navbar />
    <v-container>
      <v-row align="center">
        <span class="text-h5 grey--text text--darken-1 font-weight-medium"
          >Skills</span
        >
        <v-spacer></v-spacer>
        <v-dialog v-model="addSkillsDialog" max-width="600px" scrollable>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              color="indigo"
              v-bind="attrs"
              v-on="on"
              @click="setNewSkillData()"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Skills</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      clearable
                      label="Skill"
                      v-model="newSkill.skill"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      clearable
                      label="Image URL"
                      type="url"
                      v-model="newSkill.skillLogoURL"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="addSkillsDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  {
                    addSkillsDialog = false;
                    addNewSkill();
                  }
                "
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row v-if="loading">
        <v-progress-circular
          class="mx-auto my-15 py-15"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-row>
      <v-row v-if="!loading">
        <v-col cols="4" v-for="(skill, index) in skills" :key="index">
          <skillCard :skill="skill" v-on:skillCardtoSkill="readSkillsData" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import FDK from "@/config/firebase.js";
import skillCard from "@/components/skillCard.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  data: () => {
    return {
      loading: false,
      addSkillsDialog: false,
      skills: null,
      newSkill: {
        skill: null,
        skillLogoURL: null,
      },
    };
  },
  components: { skillCard, Navbar },
  methods: {
    setNewSkillData: function() {
      this.newSkill.skill = null;
      this.newSkill.skillLogoURL = null;
    },
    addNewSkill: async function() {
      await FDK.firestore()
        .collection("skills")
        .add(this.newSkill);
      this.readSkillsData();
    },
    readSkillsData: function() {
      this.loading = true;
      this.skills = [];
      FDK.firestore()
        .collection("skills")
        .get()
        .then((doc) => {
          doc.forEach((doc) => this.skills.push({ id: doc.id, ...doc.data() }));
        })
        .then(() => (this.loading = false));
    },
  },
  mounted: function() {
    this.readSkillsData();
  },
};
</script>
