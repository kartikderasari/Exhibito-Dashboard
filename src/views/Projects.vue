<template>
  <v-main>
    <Navbar />
    <v-container>
      <v-row align="center">
        <span class="text-h5 grey--text text--darken-1 font-weight-medium"
          >Projects</span
        >
        <v-spacer></v-spacer>
        <v-dialog v-model="addProjectDialog" max-width="600px" scrollable>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              color="indigo"
              v-bind="attrs"
              v-on="on"
              @click="setNewProjectData()"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Project</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      clearable
                      label="Project Title"
                      v-model="newProject.title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Project Image URL"
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
                      label="Tech Stack"
                      v-model="newProject.techStack"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Project Description"
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
                @click="addProjectDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  {
                    addProjectDialog = false;
                    addProject();
                  }
                "
              >
                Add
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
        <v-col cols="4" v-for="(project, index) in projects" :key="index">
          <ProjectCard
            :project="project"
            v-on:projectCardtoProject="readProjectData"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import FDK from "@/config/firebase.js";
import ProjectCard from "@/components/ProjectCard.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  data: () => {
    return {
      addProjectDialog: false,
      projects: null,
      loading: false,
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
  components: { ProjectCard, Navbar },
  methods: {
    setNewProjectData: function() {
      this.newProject.brief = null;
      this.newProject.githubURL = null;
      this.newProject.liveURL = null;
      this.newProject.projectImageURL = null;
      this.newProject.techStack = null;
      this.newProject.title = null;
    },
    addProject: async function() {
      await FDK.firestore()
        .collection("projects")
        .add(this.newProject);
      this.readProjectData();
    },
    readProjectData: function() {
      this.loading = true;
      this.projects = [];
      FDK.firestore()
        .collection("projects")
        .get()
        .then((doc) => {
          doc.forEach((doc) =>
            this.projects.push({ id: doc.id, ...doc.data() })
          );
        })
        .then(() => (this.loading = false));
    },
  },
  mounted: function() {
    this.readProjectData();
  },
};
</script>
