<template>
  <v-main>
    <Navbar />
    <v-container>
      <v-row align="center">
        <span class="text-h5 grey--text text--darken-1 font-weight-medium"
          >Experience</span
        >
        <v-spacer></v-spacer>
        <v-dialog v-model="addExpDialog" max-width="600px" scrollable>
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
              <span class="headline">Add Experience</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Designation"
                      v-model="newExp.designation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Company Name"
                      v-model="newExp.companyName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Start Month-Year"
                      v-model="newExp.start"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="End Month-Year"
                      v-model="newExp.end"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Company Website URL"
                      v-model="newExp.companyWebsiteURL"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Company Logo URL"
                      v-model="newExp.companyLogoURL"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Work Description"
                      clearable
                      auto-grow
                      v-model="newExp.brief"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addExpDialog = false">
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  {
                    addExpDialog = false;
                    addExpData();
                  }
                "
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row>
        <v-simple-table fixed-header class="mt-2" height="400">
          <template v-slot:default>
            <thead>
              <tr class="py-5">
                <th class="text-left">
                  Designation
                </th>
                <th class="text-left">
                  Company
                </th>
                <th class="text-left">
                  Duration
                </th>
                <th class="text-left">
                  Description
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="(exp, index) in experiences" :key="index">
              <ExpData @expCardtoExp="readExpData" :exp="exp" />
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import FDK from "@/config/firebase.js";
import Navbar from "@/components/Navbar.vue";
import ExpData from "@/components/ExpData";

export default {
  components: { Navbar, ExpData },
  data: () => {
    return {
      addExpDialog: false,
      experiences: null,
      loading: false,
      newExp: {
        brief: null,
        companyLogoURL: null,
        companyName: null,
        companyWebsiteURL: null,
        designation: null,
        end: null,
        start: null,
      },
      editExpDialog: false,
    };
  },
  methods: {
    setNewSkillData: function() {
      this.newExp.brief = null;
      this.newExp.companyLogoURL = null;
      this.newExp.companyName = null;
      this.newExp.companyWebsiteURL = null;
      this.newExp.designation = null;
      this.newExp.end = null;
      this.newExp.start = null;
    },
    addExpData: async function() {
      await FDK.firestore()
        .collection("experiences")
        .add(this.newExp);
      this.readExpData();
    },
    readExpData: function() {
      this.loading = true;
      this.experiences = [];
      FDK.firestore()
        .collection("experiences")
        .get()
        .then((doc) => {
          doc.forEach((doc) => {
            this.experiences.push({ id: doc.id, ...doc.data() });
          });
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
  mounted: function() {
    this.readExpData();
  },
};
</script>
