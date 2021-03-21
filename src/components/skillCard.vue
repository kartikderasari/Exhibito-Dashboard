<template>
  <v-card flat outlined height="200">
    <v-card-title class="text-caption grey lighten-4 py-2">
      <v-spacer></v-spacer>

      <v-dialog v-model="editSkillsDialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on" @click="setEditSkillData">
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Skills</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    clearable
                    label="Skill*"
                    v-model="skillData.skill"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    clearable
                    label="Image URL*"
                    type="url"
                    v-model="skillData.skillLogoURL"
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
              @click="
                {
                  editSkillsDialog = false;
                }
              "
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                {
                  updateSkillsData();
                  editSkillsDialog = false;
                }
              "
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn icon small @click="deleteSkill()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text
      class="d-flex flex-column align-center pt-6 grey--text text--darken-3"
    >
      <v-img :src="skill.skillLogoURL" max-width="50" max-height="80"></v-img>
      <p class="subtitle-1 pt-3">{{ skill.skill }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import FDK from "@/config/firebase.js";

export default {
  data: () => {
    return {
      editSkillsDialog: false,
      skillData: {
        skill: null,
        skillLogoURL: null,
      },
    };
  },
  props: ["skill"],
  methods: {
    setEditSkillData: function() {
      this.skillData.skill = this.skill.skill;
      this.skillData.skillLogoURL = this.skill.skillLogoURL;
    },
    updateSkillsData: function() {
      if (
        this.skillData.skill.length != 0 &&
        this.skillData.skillLogoURL.length != 0
      ) {
        FDK.firestore()
          .collection("skills")
          .doc(this.skill.id)
          .update(this.skillData)
          .then(() => {
            this.$emit("skillCardtoSkill");
          })
          .catch((e) => console.log(e));
      } else {
        alert("Please check the inputs!");
      }
    },
    deleteSkill: async function() {
      await FDK.firestore()
        .collection("skills")
        .doc(this.skill.id)
        .delete();
      await this.$emit("skillCardtoSkill");
    },
  },
};
</script>
