<template>
  <v-dialog v-model="bioDialog" max-width="800px" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex align-end">
        <v-btn class="grey" icon small v-bind="attrs" v-on="on">
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit User Data</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Short Bio"
                clearable
                auto-grow
                v-model="editUserData.shortBio"
              ></v-textarea>
              <v-textarea
                label="About"
                clearable
                auto-grow
                v-model="editUserData.about"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="
            {
              bioDialog = false;
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
              bioDialog = false;
              updateUserData();
            }
          "
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    bioDialog: false,
  }),
  props: ["editUserData"],
};
</script>
