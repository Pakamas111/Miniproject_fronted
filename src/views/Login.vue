<template>
  <div class="imgContainer">
    <div class="registerContainer">
      <div class="whiteBlock">
        <div class="titleRegister">
          <img
            src="../assets/letter-f (1).png"
            style="width: 70px; padding: 10px"
          />
          <h2 style="color: #ffff">Fit Wonder</h2>
        </div>
        <div style="padding: 10px; text-align: center">
          <h3 style="color: #fca33e">Let's get you started!</h3>
        </div>

        <div style="padding: 10px">
          <p style="font-size: 12px; margin-left: 10px; color: #ffff">
            Enter your details to sign in or press sign up
          </p>
          <v-text-field
            solo
            :counter="20"
            :rules="nameRules"
            label="username"
            placeholder="username"
            v-model="userName"
            required
          ></v-text-field>
          <v-text-field
            solo
            :rules="passwordRules"
            label="password"
            placeholder="password"
            v-model="password"
            type="password"
            required
          ></v-text-field>
          <v-btn
            style="background-color: #fca33e"
            rounded
            block
            @click="onLogin"
            >Login</v-btn
          >
          <router-link to="/register" style="text-decoration: none">
            <v-text style="color: #ffff; margin-left: 10px">Sign up</v-text>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      password: "",

      userName: "",
      valid: true,

      // name: "",
      nameRules: [
        (v) => !!v || "กรุณากรอกชื่อผู้ใช้",
        (v) =>
          (v && v.length <= 20) || "กรุณากรอกชื่อผู้ใช้ไม่เกิน 20 ตัวอักษร",
      ],

      // password: "",
      passwordRules: [(v) => !!v || "กรุณากรอกรหัสผ่าน"],
    };
  },

  methods: {
    // async login() {
    //   try {
    //     const data = {
    //       password: this.password,

    //       userName: this.userName,
    //     };
    //     console.log("data", data);
    //     const response = await axios.post(
    //       `${process.env.VUE_APP_NOT_SECRET_CODE}/login`,
    //       data
    //     );
    //     if (response.status === 200) {
    //       localStorage.setItem("auth", JSON.stringify(response.data));
    //       this.$router.push({ path: "/" }).catch(() => {});
    //       window.location.reload();
    //     }
    //   } catch (error) {
    //     console.error(error.message);
    //     this.error = "Failed to fetch trainer data.";
    //   }
    // },
    async onLogin() {
      try {
        const data = {
          password: this.password,

          userName: this.userName,
        };
        const response = await axios.post(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/login`,
          data
        );
        if (response.status === 200) {
          this.open = false;
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
            timer: 1000,
          }).then(() => {
            localStorage.setItem("auth", JSON.stringify(response.data));
            location.href = "/";
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Login failed!",
          text: "Please check your username. and password again",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error login:", error);
      }
    },
  },
};
</script>

<style scoped>
.imgContainer {
  position: relative; /* Relative positioning for the container */
}

.imgContainer {
  width: 100%;
  height: 700px; /* Set an appropriate height for the container */
  background-image: url("../assets/dumbbell-1966247_1920.jpg");
  background-size: cover; /* Ensure the image covers the entire container */
  background-position: center; /* Center the image within the container */
}

/* Style for the image box */
.imageBox::after {
  content: "";
  position: absolute; /* Absolute positioning */
  top: 205px; /* Adjust the top position as needed */
  left: 925px; /* Adjust the left position as needed */
  width: 500px; /* Width of the box */
  height: 600px; /* Height of the box */
  background-color: rgba(
    255,
    255,
    255,
    0.565
  ); /* Background color of the box */
  border-radius: 20px; /* Border-radius for rounded corners */
}

.whiteBlock {
  background-color: #65656587;
  border-radius: 20px;
  width: 30%;
}

.titleRegister {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.registerContainer {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}
</style>
