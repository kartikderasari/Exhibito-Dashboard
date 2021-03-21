<template>
  <v-container class="pt-15 px-xs-5 px-sm-5" fluid>
    <v-container class="grey lighten-4 rounded-lg pa-10">
      <v-row v-if="loading">
        <v-progress-circular
          class="mx-auto my-15 py-15"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-row>
      <v-row align="center" v-if="!loading">
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-dialog v-model="userDialog" max-width="600px" scrollable>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="float-right"
                icon
                small
                v-bind="attrs"
                v-on="on"
                @click="setUserData()"
              >
                <v-icon>mdi-circle-edit-outline</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Edit User Data</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Name"
                      v-model="editUserData.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="E-mail address"
                      v-model="editUserData.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Profile Photo URL"
                      type="url"
                      v-model="editUserData.profilePhotoURL"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Facebook URL"
                      type="url"
                      v-model="editUserData.Facebook"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="GitHub URL"
                      type="url"
                      v-model="editUserData.GitHub"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Instagram URL"
                      type="url"
                      v-model="editUserData.Instagram"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="LinkedIn URL"
                      type="url"
                      v-model="editUserData.LinkedIn"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      clearable
                      label="Twitter URL"
                      type="url"
                      v-model="editUserData.Twitter"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    {
                      userDialog = false;
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
        <v-col cols="12" sm="12" md="8" lg="8">
          <BioDialog :editUserData="editUserData" />
          <v-card color="transparent" flat>
            <v-card-title
              class="py-0 blue font-weight-medium grey--text text--darken-1"
              >Short-bio</v-card-title
            >
            <v-card-text class="grey--text text--darken-3">
              {{ userData.shortBio }}
            </v-card-text>
            <v-card-title
              class="py-0 font-weight-medium grey--text text--darken-1"
              >About</v-card-title
            >
            <v-card-text class="grey--text text--darken-3">
              {{ userData.about }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import FDK from "@/config/firebase.js";
import BioDialog from "@/components/BioDialog";
export default {
  components: { BioDialog },
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
      editUserData: {
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
    setUserData: function() {
      this.editUserData.name = this.userData.name;
      this.editUserData.email = this.userData.email;
      this.editUserData.profilePhotoURL = this.userData.profilePhotoURL;
      this.editUserData.about = this.userData.about;
      this.editUserData.shortBio = this.userData.shortBio;
      this.editUserData.Facebook = this.userData.Facebook;
      this.editUserData.Instagram = this.userData.Instagram;
      this.editUserData.GitHub = this.userData.GitHub;
      this.editUserData.LinkedIn = this.userData.LinkedIn;
      this.editUserData.Twitter = this.userData.Twitter;
    },
    updateUserData: function() {
      FDK.firestore()
        .collection("userInfo")
        .doc("data")
        .set(this.editUserData);
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
  created: function() {
    this.readData();
  },
};
</script>
