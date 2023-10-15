<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <v-row justify="center">
      <v-col cols="12" xs="10" sm="10" md="12">
        <v-card style="padding: 20px">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h2>My Book</h2>
              </v-col>
              <v-card v-for="(item, index) in bookItems" :key="index">
                <v-card-title>courseName: {{ item.course.courseName }}</v-card-title>
                <v-card-text>bookDate: {{ item.bookDate }}</v-card-text>
                <v-card-text>trainerName: {{ item.course.trainer.trainerName }}</v-card-text>
              </v-card>
              <v-col cols="12" sm="12" md="12"> </v-col>
              <v-col cols="12" sm="12" md="12"> </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      trainerName: "",
      trainertel: "",
      userId: null,
      bookItems: [],
    };
  },
  created() {
    (this.userId = JSON.parse(localStorage.getItem("auth"))?.userId),
      this.getAllBook();
  },

  methods: {
    async getAllBook() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/book`
        );
        this.bookItems = response.data;
        this.bookItems = this.bookItems.filter(
          (item) => item.user.userId === this.userId
        );
        console.log("bookItems", this.bookItems);
      } catch (error) {
        console.error(error.message);
        this.error = "Failed to fetch courses data";
      }
    },
  },
};
</script>
