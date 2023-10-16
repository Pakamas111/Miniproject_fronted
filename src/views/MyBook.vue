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
              <v-col>
                <v-card
                  v-for="(item, index) in bookItems"
                  :key="index"
                  style="margin-top: 20px"
                >
                  <v-col>
                    <v-card-title
                      >courseName: {{ item.course.courseName }}</v-card-title
                    >
                    <v-card-text>bookDate: {{ item.bookDate }}</v-card-text>
                    <v-card-text
                      >trainerName:
                      {{ item.course.trainer.trainerName }}</v-card-text
                    >
                    <div style="display: flex; justify-content: flex-end">
                      <v-btn
                        @click="cancelBook(item)"
                        color="#d01716"
                        style="color: #fff"
                        >ยกเลิกการจอง</v-btn
                      >
                    </div>
                  </v-col>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

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

    async cancelBook(item) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการยกเลิกการจอง ${item.course.courseName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              process.env.VUE_APP_NOT_SECRET_CODE + `/book/${item.id}`
            );
            if (response.status === 200) {
              Swal.fire({
                title: "ยกเลิกสำเร็จ!",
                icon: "success",
                confirmButtonText: "ตกลง",
                timer: 1500,
              });
               this.getAllBook();
            }
          } catch (err) {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              icon: "error",
              confirmButtonText: "ตกลง",
              timer: 1500,
            });
            console.error(err);
          }
        }
      });
    },
  },
};
</script>
