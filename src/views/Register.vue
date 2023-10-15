<template>
  <div class="imgContainer">
    <div class="registerContainer">
      <div class="whiteBlock">
        <div class="titleRegister">
          <img
            src="../assets/letter-f (1).png"
            style="width: 70px; padding: 10px"
          />
          <h2>Fit Wonder</h2>
        </div>
        <div style="padding: 1px; text-align: center">
          <h3 style="color: #fca33e">Let's get you started!</h3>
        </div>

        <div style="padding: 10px">
          <p style="font-size: 12px; margin-left: 10px">
            Enter your details to sign in or press sign-up
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
            required
            type="password"
          ></v-text-field>
          <v-text-field
            solo
            :rules="firstNameRules"
            label="firstname"
            placeholder="firstname"
            v-model="firstName"
            required
          ></v-text-field>
          <v-text-field
            solo
            :rules="lastNameRules"
            label="lastname"
            placeholder="lastname"
            v-model="lastName"
            required
          ></v-text-field>
          <v-text-field
            solo
            :rules="TelRules"
            label="Tel."
            placeholder="Tel."
            v-model="usertel"
            required
          ></v-text-field>
          <v-btn
            style="background-color: #fca33e"
            rounded
            block
            @click="register"
            >Register</v-btn
          >
          <router-link to="/login" style="text-decoration: none">
            <v-text style="color: #ffff; margin-left: 10px">Log in</v-text>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // usertel: "",
      // password: "",
      // firstName: "",
      // lastName: "",
      // userName: "",
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "กรุณากรอกชื่อผู้ใช้",
        (v) =>
          (v && v.length <= 20) || "กรุณากรอกชื่อผู้ใช้ไม่เกิน 20 ตัวอักษร",
      ],

      firstName: "",
      firstNameRules: [(v) => !!v || "กรุณากรอกชื่อจริง"],

      lastName: "",
      lastNameRules: [(v) => !!v || "กรุณากรอกชื่อนามสกุล"],

      password: "",
      passwordRules: [(v) => !!v || "กรุณากรอกรหัสผ่าน"],

      Tel: "",
      TelRules: [(v) => !!v || "กรุณากรอกเบอร์โทร"],
    };
  },
  // created() {
  //   this.getTrainerData();
  // },
  methods: {
    async register() {
      try {
        const data = {
          usertype: "0",
          usertel: this.usertel,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
        };
        console.log("data", data);
        const response = await axios.post(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/register`,
          data
        );
        if (response.status === 201) {
          alert("Register Sucsess");
          this.$router.push({ path: "/login" }).catch(() => {});
        }
        if (response.status === 200) {
          alert("Username exits");
        }
      } catch (error) {
        console.error(error.message);
        this.error = "Failed to fetch trainer data.";
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
  background-image: url("../assets/istockphoto-966295620-2048x2048.jpg");
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
  background-color: #ffffff87;
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
