<template>
  <div class="appbar">
    <a class="textBlock" @click="gotohome()">
      <img
        src="../assets/letter-f (1).png"
        alt="Image Alt Text"
        style="width: 35px; height: 35px"
      />
      <v-toolbar-title>Fit wonder</v-toolbar-title>
    </a>

    <div class="textList">
      <v-btn @click="gotoCourses()" text>Courses</v-btn>
      <v-btn @click="gotoTrainer()" text>trainers </v-btn>
      <div v-if="!isAuth">
        <!-- <v-btn text>Membership</v-btn> -->
        <v-btn class="joinButton" @click="gotoregister">Join now</v-btn>
      </div>

      <v-menu bottom min-width="200px" rounded offset-y v-if="isAuth">
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar size="48">
              <img
                src="../assets/letter-f (2).png"
                alt="Avatar Image"
                style="width: 100%; height: 100%"
              />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <img
                  src="../assets/letter-f (2).png"
                  alt="Avatar Image"
                  style="width: 100%; height: 100%"
                />
              </v-avatar>
              <h4 class="mt-1">
                {{ auth.usertype === "1" ? "Admin" : "Customer" }}
              </h4>
              <h4 class="mt-1">{{ auth.userName }}</h4>
              <h5>{{ auth.firstName }} {{ auth.lastName }}</h5>
              <p>{{ auth.usertel }}</p>

              <v-divider class="my-3" v-if="isAdmin"></v-divider>
              <v-btn depressed rounded text v-if="isAdmin" @click="gotoManageTrainer()"
                >MANAGE Trainer</v-btn
              >

              <v-divider class="my-3" v-if="isAdmin"></v-divider>
              <v-btn depressed rounded text v-if="isAdmin" @click="gotoManageCourses()"
                >MANAGE Courses</v-btn
              >

              <v-divider class="my-3" v-if="!isAdmin"></v-divider>
              <v-btn depressed rounded text v-if="!isAdmin" @click="gotoMyBook()" >
                MY BOOK</v-btn>

              <v-divider class="my-3" ></v-divider>
              <v-btn depressed rounded text @click="logOut">LOGOUT</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    imageUrl: "/path-to-image.jpg",
    colors: ["white"],
    auth: null,
    isAuth: false,
    isAdmin: false,
  }),
  created() {
    this.getAuth();
  },
  methods: {
    async getAuth() {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      this.isAuth = this.auth !== null; // Set isAuth based on the auth data
      this.isAdmin = this.auth.usertype === "1"; // Set isAuth based on the auth data
    },
    gotoregister() {
      this.$router.push({ path: "/register" }).catch(() => {});
    },
    gotohome() {
      this.$router.push({ path: "/" }).catch(() => {});
    },
    gotoAccount() {
      this.$router.push({ path: "/account" }).catch(() => {});
    },
    gotoTrainer() {
      this.$router.push({ path: "/trainer" }).catch(() => {});
    },
    gotoCourses() {
      // this.$router.push({ path: "/courses" }).catch(() => {});
      window.location.href = "/courses";
    },
    gotoManageTrainer() {
      this.$router.push({ path: "/manageTrainer" }).catch(() => {});
    },
    gotoManageCourses() {
      this.$router.push({ path: "/manageCourse" }).catch(() => {});
    },
    gotoMyBook() {
      this.$router.push({ path: "/mybook" }).catch(() => {});
    },
    logOut() {
      localStorage.removeItem("auth");
      this.$router.push({ path: "/login" }).catch(() => {});
      this.isAuth = false;
    },
  },
};
</script>

<style scoped>
.appbar {
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #ecf0f1;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
}

.textBlock {
  display: flex;
  flex: 4;
  flex-direction: row;
  align-items: center;
  color: black;
}

.textList {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.textList {
  display: flex;
  flex: 4;
  justify-content: flex-end;
  align-items: center;
}

/* .textList div:hover {
  background-color: #d0d3d4;
  border-radius: 5px;
  padding: 5px;
} */

.joinButton {
  background-color: #fff;
  padding: 8px;
  border-radius: 5%;
  color: #e67e22;
  text-align: center;
}

.joinButton:hover {
  background-color: #e67e22;
  color: #fff;
}
</style>
