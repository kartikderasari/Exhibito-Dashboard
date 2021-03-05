<template>
  <v-container class="mt-15">
    <v-row align="center">
      <span class="text-h5 grey--text text--darken-1 font-weight-medium"
        >Skills</span
      >
      <v-spacer></v-spacer>
      <v-dialog v-model="addSkillsDialog" max-width="600px" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab dark color="indigo" v-bind="attrs" v-on="on">
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
                  <v-text-field label="Skill"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Image URL" type="url"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="addSkillsDialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="addSkillsDialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="x in 3" :key="x">
        <v-card flat outlined>
          <v-card-title class="text-caption grey lighten-4">
            <v-spacer></v-spacer>

            <v-dialog v-model="editSkillsDialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon small v-bind="attrs" v-on="on">
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
                        <v-text-field label="Skill"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Image URL"
                          type="url"
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
                    @click="editSkillsDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="editSkillsDialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn icon small>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="d-flex flex-column align-center py-4">
            <v-img
              src="https://vrijraj.xyz/img/firebase.1a1dfb3f.svg"
              width="50"
            ></v-img>
            <p class="subtitle-1 pt-3">New</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      addSkillsDialog: false,
      editSkillsDialog: false,
    };
  },
};
</script>
