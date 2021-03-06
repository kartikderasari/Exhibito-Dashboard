<template>
  <v-container class="my-15 grey lighten-4 rounded-lg pa-10">
    <v-row v-if="loading">
      <v-progress-circular
        class="mx-auto my-15 py-15"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-row>
    <v-row v-if="!loading">
      <v-col cols="4" align="right">
        <v-dialog v-model="userDialog" max-width="600px" scrollable>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Edit User Data</span>
            </v-card-title>
            <v-card-text>
              <v-text-field label="Name" v-model="userData.name"></v-text-field>
              <v-text-field
                label="E-mail address"
                v-model="userData.email"
              ></v-text-field>
              <v-text-field
                label="Profile Photo URL"
                type="url"
                v-model="userData.profilePhotoURL"
              ></v-text-field>
              <v-text-field
                label="Facebook URL"
                type="url"
                v-model="userData.Facebook"
              ></v-text-field>
              <v-text-field
                label="GitHub URL"
                type="url"
                v-model="userData.GitHub"
              ></v-text-field>
              <v-text-field
                label="Instagram URL"
                type="url"
                v-model="userData.Instagram"
              ></v-text-field>
              <v-text-field
                label="LinkedIn URL"
                type="url"
                v-model="userData.LinkedIn"
              ></v-text-field>
              <v-text-field
                label="Twitter URL"
                type="url"
                v-model="userData.Twitter"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  {
                    userDialog = false;
                    readData();
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
                    userDialog = false;
                    updateUserData();
                  }
                "
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="8" align="right">
        <v-dialog v-model="bioDialog" max-width="600px" scrollable>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-btn>
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
                      v-model="userData.shortBio"
                    ></v-textarea>
                    <v-textarea
                      label="About"
                      clearable
                      auto-grow
                      v-model="userData.about"
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
                @click="
                  {
                    bioDialog = false;
                    readData();
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
      </v-col>
    </v-row>
    <v-row align="center" v-if="!loading">
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
            :src="userData.profilePhotoURL"
          ></v-img>

          <span
            class="text-h5 mt-4 font-weight-medium grey--text text--darken-1"
          >
            {{ userData.name }}
          </span>

          <div>
            <v-btn icon :href="`mailto:${userData.email}`">
              <v-icon>mdi-email</v-icon>
            </v-btn>
            <v-btn icon :href="userData.Facebook" target="_blank">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon :href="userData.Instagram" target="_blank">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon :href="userData.LinkedIn" target="_blank">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon :href="userData.GitHub" target="_blank">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn icon :href="userData.Twitter" target="_blank">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="8">
        <span class="text-h6 grey--text text--darken-1">Short-bio</span>
        <p>
          {{ userData.shortBio }}
        </p>
        <span class="text-h6 grey--text text--darken-1">About</span>
        <p>
          {{ userData.about }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FDK from "@/config/firebase.js";

export default {
  data: () => {
    return {
      loading: false,
      userDialog: false,
      bioDialog: false,
      userData: {
        name: null,
        email: null,
        profilePhotoURL: null,
        about: null,
        shortBio: null,
        Facebook: null,
        Instagram: null,
        GitHub: null,
        LinkedIn: null,
        Twitter: null,
      },
    };
  },
  methods: {
    updateUserData: function() {
      FDK.firestore()
        .collection("userInfo")
        .doc("data")
        .set(this.userData);
    },
    readData: function() {
      this.loading = true;
      FDK.firestore()
        .collection("userInfo")
        .doc("data")
        .get()
        .then((doc) => (this.userData = doc.data()))
        .then(() => (this.loading = false));
    },
  },
  mounted: function() {
    this.readData();
  },
};
</script>
