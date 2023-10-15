<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <v-row justify="center">
      <v-col cols="12" xs="10" sm="10" md="12">
        <v-card style="padding: 20px">
          <v-container>
            <v-form @submit.prevent="addGun">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <h2>เพิ่ม Trainer</h2>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="trainerName"
                    label="ชื่อ"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="trainertel"
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
                <v-btn color="primary" @click="addTrainer()">ยืนยัน</v-btn>
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
      trainerName: "",
      trainertel: "",
    };
  },

  methods: {
    async addTrainer() {
      try {
        const response = await axios.post(
          process.env.VUE_APP_NOT_SECRET_CODE + `/trainer`,
          { trainerName: this.trainerName, trainertel: this.trainertel }
        );
        if (response.status === 201) {
          Swal.fire({
            title: "เพิ่มสำเร็จ!",
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
  },
};
</script>
