<template>
  <div>
    <div class="container">
      <div class="header">
        <!-- <h1>Account</h1> -->
        <!-- <v-container fluid style="height: 300px">
          <v-row justify="space-between">

          </v-row>
        </v-container> -->
        <!-- <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="brown">
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text> Edit Account </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text> Disconnect </v-btn>
          </div>
        </v-list-item-content>
      </v-card> -->
      </div>

      <!-- Displaying the user data -->
      <div v-if="isAuth" class="user-data">
        <p><strong>User ID:</strong> {{ auth.userId }}</p>
        <p>
          <strong>Name:</strong>
          {{ auth.firstName + " " + auth.lastName }}
        </p>
        <p><strong>Tel:</strong> {{ auth.usertel }}</p>
        <!-- Add more fields as needed -->
      </div>

      <!-- Display an error message if there's an issue with the API request -->
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <!-- Logout button -->
      <button v-if="isAuth" @click="logOut">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        initials: "PD",
        fullName: "Pakamas Detsuwan",
      },
      auth: null,
      isAuth: false,
      error: null,
    };
  },
  created() {
    this.getAuth();
  },
  methods: {
    async getAuth() {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      this.isAuth = this.auth !== null;
    },
    logOut() {
      localStorage.removeItem("auth");
      this.$router.push({ path: "/" }).catch(() => {});
      this.isAuth = false;
    },
  },
};
</script>

<style>
.container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.user-data {
  font-size: 16px;
}

.user-data strong {
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>
