<template>
  <v-card flat outlined>
    <v-card-title class="text-caption grey lighten-4 py-2">
      <v-spacer></v-spacer>
      <v-dialog v-model="editExpDialog" max-width="600px" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            small
            v-bind="attrs"
            v-on="on"
            @click="setEditSkillData()"
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
                <v-col cols="6">
                  <v-text-field
                    label="Designation"
                    v-model="newExp.designation"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Company Name"
                    v-model="newExp.companyName"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Start Month-Year"
                    v-model="newExp.start"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="End Month-Year"
                    v-model="newExp.end"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Company Website URL"
                    v-model="newExp.companyWebsiteURL"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
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
            <v-btn color="blue darken-1" text @click="editExpDialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                {
                  editExpDialog = false;
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
      <v-row class="py-4" justify="center">
        <v-col cols="4" align="center">
          <v-img
            class="rounded-circle"
            :src="exp.companyLogoURL"
            width="100"
            height="100"
          ></v-img>
        </v-col>
        <v-col cols="8" class="d-flex flex-column  justify-center">
          <h5 class="title">{{ exp.designation }}</h5>
          <p class="my-0">{{ exp.companyName }}</p>
          <p class="my-0">{{ exp.start }} - {{ exp.end }}</p>
        </v-col>
      </v-row>
      <p class="subtitle-1 pt-3">{{ exp.brief }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import FDK from "@/config/firebase.js";

export default {
  props: ["exp"],
  data: () => {
    return {
      editExpDialog: false,
      newExp: {
        brief: null,
        companyLogoURL: null,
        companyName: null,
        companyWebsiteURL: null,
        designation: null,
        end: null,
        start: null,
      },
    };
  },
  methods: {
    setEditSkillData: function() {
      this.newExp.brief = this.exp.brief;
      this.newExp.companyLogoURL = this.exp.companyLogoURL;
      this.newExp.companyName = this.exp.companyName;
      this.newExp.companyWebsiteURL = this.exp.companyWebsiteURL;
      this.newExp.designation = this.exp.designation;
      this.newExp.end = this.exp.end;
      this.newExp.start = this.exp.start;
    },
    deleteExpData: async function() {
      await FDK.firestore()
        .collection("experiences")
        .doc(this.exp.id)
        .delete();
      this.$emit("expCardtoExp");
    },
    updateExpData: function() {
      FDK.firestore()
        .collection("experiences")
        .doc(this.exp.id)
        .update(this.newExp)
        .then(() => this.$emit("expCardtoExp"))
        .catch((e) => console.log(e));
    },
  },
};
</script>
