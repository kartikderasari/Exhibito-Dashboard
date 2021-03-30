<template>
  <v-card flat outlined>
    <v-card-title class="text-caption grey lighten-4 py-2">
      <v-spacer></v-spacer>
      <v-dialog v-model="editProjectDialog" max-width="600px" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            small
            v-bind="attrs"
            v-on="on"
            @click="setEditProjectData()"
          >
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Experience</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    clearable
                    label="Project Title*"
                    v-model="newProject.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    clearable
                    label="Project Image URL*"
                    v-model="newProject.projectImageURL"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    clearable
                    label="Live URL"
                    v-model="newProject.liveURL"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    clearable
                    label="GitHub URL"
                    v-model="newProject.githubURL"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    clearable
                    label="Tech Stack*"
                    v-model="newProject.techStack"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Project Description*"
                    clearable
                    auto-grow
                    v-model="newProject.brief"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="editProjectDialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                {
                  editProjectDialog = false;
                  updateExpData();
                }
              "
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn icon small @click="deleteExpData()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row class="py-2" justify="center" no-gutters>
        <v-col cols="12" align="center">
          <v-img
            class="rounded-circle"
            :src="project.projectImageURL"
            width="100"
            height="100"
          ></v-img>
        </v-col>
        <v-col cols="12" class="d-flex flex-column  justify-center">
          <v-card-title class="py-0">{{ project.title }}</v-card-title>
          <v-card-text
            v-if="project.brief != null && project.brief.length >= 90"
            class="my-0 grey--text text--darken-3"
            >{{ project.brief.slice(0, 90) }}...
          </v-card-text>
          <v-card-text v-else class="my-0 grey--text text--darken-3">{{
            project.brief
          }}</v-card-text>
          <v-card-actions class="py-0 pl-4">
            <v-btn
              class="primary"
              :href="project.liveURL"
              small
              target="_blank"
              elevation="0"
              >Visit Project</v-btn
            >
            <v-btn outlined :href="project.githubURL" small target="_blank"
              >View Code</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import FDK from "@/config/firebase.js";

export default {
  props: ["project"],
  data: () => {
    return {
      editProjectDialog: false,
      newProject: {
        brief: null,
        githubURL: null,
        liveURL: null,
        projectImageURL: null,
        techStack: null,
        title: null,
      },
    };
  },
  methods: {
    setEditProjectData: function() {
      this.newProject.brief = this.project.brief;
      this.newProject.githubURL = this.project.githubURL;
      this.newProject.liveURL = this.project.liveURL;
      this.newProject.projectImageURL = this.project.projectImageURL;
      this.newProject.techStack = this.project.techStack;
      this.newProject.title = this.project.title;
    },
    deleteExpData: async function() {
      await FDK.firestore()
        .collection("projects")
        .doc(this.project.id)
        .delete();
      this.$emit("projectCardtoProject");
    },
    updateExpData: function() {
      if (
        (this.newProject.brief != null &&
          this.newProject.projectImageURL != null &&
          this.newProject.techStack != null &&
          this.newProject.title != null) ||
        (this.newProject.brief.length != 0 &&
          this.newProject.projectImageURL.length != 0 &&
          this.newProject.techStack.length != 0 &&
          this.newProject.title.length != 0)
      ) {
        FDK.firestore()
          .collection("projects")
          .doc(this.project.id)
          .update(this.newProject)
          .then(() => this.$emit("projectCardtoProject"))
          .catch((e) => console.log(e));
      } else {
        alert("Please check the inputs!");
      }
    },
  },
};
</script>
