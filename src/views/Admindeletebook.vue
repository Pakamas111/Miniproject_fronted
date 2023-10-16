<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <v-row justify="center">
      <v-col cols="12" xs="10" sm="10" md="12">
        <v-card style="padding: 20px">
          <v-container>
            <v-form @submit.prevent="Admindeletebook">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="CourseName"
                    label="ชื่อ"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-model="trainerId"
                    :items="tainers"
                    label="เทรนเนอร์"
                    item-value="trainerId"
                    item-text="trainerName"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="Trainertel"
                    label="เบอร์มือถือ"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <div
                style="
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  margin-top: 10px;
                "
              >
                <v-btn color="primary" @click="Admindeletebook()">ยืนยัน</v-btn>
                <v-btn style="margin-left: 10px" @click="$router.go(-1)"
                  >ยกเลิก</v-btn
                >
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      CourseName: "",
      trainerId: "",
      tainers: [],
    };
  },
  created() {
    this.getTrainer();
  },
  methods: {
    async Admindeletebook() {
      try {
        const response = await axios.post(
          process.env.VUE_APP_NOT_SECRET_CODE + `/course`,
          {
            courseName: this.CourseName,
            user: {
              userId: JSON.parse(localStorage.getItem("auth"))?.userId,
            },
            trainer: {
              trainerId: this.trainerId,
            },
          }
        );
        if (response.status === 201) {
          Swal.fire({
            title: "ลบการจองสำเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
            timer: 1500,
          });
          this.$router.go(-1);
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          icon: "error",
          confirmButtonText: "ตกลง",
          timer: 1500,
        });
      }
    },
    async getTrainer() {
      try {
        const response = await axios.get(
          process.env.VUE_APP_NOT_SECRET_CODE + `/trainer`
        );
        if (response.status === 200) {
          this.tainers = response.data;
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          icon: "error",
          confirmButtonText: "ตกลง",
          timer: 1500,
        });
      }
    },
  },
};
</script>
