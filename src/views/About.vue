<template>
  <v-container class="mt-15 grey lighten-4 rounded-lg pa-10">
    <v-row>
      <v-col cols="4" align="right">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">User Profile</span>
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
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="8" align="right">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">User Profile</span>
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
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="4">
        <v-card
          color="transparent"
          flat
          class="d-flex flex-column align-center"
        >
          <v-img
            class="rounded-circle"
            width="150"
            height="150"
            src="https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4"
          ></v-img>

          <span
            class="text-h5 mt-4 font-weight-medium grey--text text--darken-1"
          >
            Kartik Derasari
          </span>

          <div>
            <v-btn icon>
              <v-icon>mdi-email</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="8">
        <span class="text-h6 grey--text text--darken-1">Short-bio</span>
        <p>
          I love exploring Web technologies while building appealing and
          interactive websites.
        </p>
        <span class="text-h6 grey--text text--darken-1">About</span>
        <p>
          I’m a Final Year Computer Engineering Student passionate about
          Developer Community Building & creating impacts through building
          relationships, d
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      dialog: false,
    };
  },
};
</script>
