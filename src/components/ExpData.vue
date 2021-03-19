<template>
  <tr>
    <td>{{ exp.designation }}</td>
    <td>{{ exp.companyName }}</td>
    <td>{{ exp.start }} - {{ exp.end }}</td>
    <td v-if="exp.brief != null && exp.brief.length >= 50">
      {{ exp.brief.slice(0, 50) }}...
    </td>
    <td v-else>{{ exp.brief }}</td>
    <td>
      <v-dialog v-model="viewDialog" width="700" retain-focus>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <v-row class="pt-4">
              <v-col cols="3" align="center">
                <v-img
                  class="rounded-lg"
                  :src="exp.companyLogoURL"
                  max-width="80"
                  max-height="80"
                ></v-img>
              </v-col>
              <v-col cols="9" class="">
                <h5 class="title ">
                  {{ exp.designation }}
                </h5>
                <p class="my-0">{{ exp.companyName }}</p>
                <p class="my-0">{{ exp.start }} - {{ exp.end }}</p>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            {{ exp.brief }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              outlined
              :href="exp.companyWebsiteURL"
              target="_blank"
            >
              Learn More
            </v-btn>
            <v-btn color="primary" text @click="viewDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    </td>
  </tr>
</template>

<script>
import FDK from "@/config/firebase";
export default {
  props: ["exp"],
  data: () => {
    return {
      viewDialog: false,
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
