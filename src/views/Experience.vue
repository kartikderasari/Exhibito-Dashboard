<template>
  <v-container class="mt-15">
    <v-row align="center">
      <span class="text-h5 grey--text text--darken-1 font-weight-medium"
        >Experience</span
      >
      <v-spacer></v-spacer>
      <v-dialog v-model="addExpDialog" max-width="600px" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab dark color="indigo" v-bind="attrs" v-on="on">
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
                  <v-text-field label="Designation"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Company Name"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Start Month-Year"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="End Month-Year"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Company Website URL"></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field label="Company Logo URL"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Work Description"
                    clearable
                    auto-grow
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
            <v-btn color="blue darken-1" text @click="addExpDialog = false">
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
            <v-dialog v-model="editExpDialog" max-width="600px" scrollable>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon small v-bind="attrs" v-on="on">
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
                        <v-text-field label="Designation"></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="Company Name"></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="Start Month-Year"></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="End Month-Year"></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="Company Website URL"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field label="Company Logo URL"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          label="Work Description"
                          clearable
                          auto-grow
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
                    @click="editExpDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="editExpDialog = false"
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

          <v-card-text>
            <v-row class="py-4" justify="center">
              <v-col cols="4" align="center">
                <v-img
                  class="rounded-circle"
                  src="https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4"
                  width="100"
                  height="100"
                ></v-img>
              </v-col>
              <v-col cols="8" class="d-flex flex-column  justify-center">
                <h5 class="title">exp.designation</h5>
                <p class="my-0">exp.companyName</p>
                <p class="my-0">exp.start - exp.end</p>
              </v-col>
            </v-row>
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
      addExpDialog: false,
      editExpDialog: false,
    };
  },
};
</script>
