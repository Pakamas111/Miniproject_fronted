<template>
  <div>
    <template>
      <v-container>
        <v-card width="100%">
          <v-container>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" style="">
                <v-col cols="12" xs="12" sm="12" md="12" class="card-container">
                  <h2>{{ courseData.courseName }}</h2></v-col
                >
                <v-col cols="12" xs="12" sm="12" md="12" class="card-container">
                  <h3>Course Information</h3></v-col
                >
                <v-col cols="12" xs="12" sm="12" md="12" class="card-container">
                  <p>Course Name: {{ courseData.courseName }}</p></v-col
                >
                <v-col cols="12" xs="12" sm="12" md="12" class="card-container">
                  <h3>Trainer Information</h3></v-col
                >
                <v-col cols="12" xs="12" sm="12" md="12" class="card-container">
                  <p>
                    Trainer Name: {{ courseData.trainer.trainerName }}
                  </p></v-col
                >
              </v-col>
              <v-col justify="space-around" cols="12" xs="12" sm="12" md="6">
                <v-col cols="12" xs="12" sm="12" md="12" class="card-container">
                  <v-date-picker
                    v-model="dateBook"
                    color="#fbc02d"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" class="card-container">
                  วันที่จอง: {{ dateBook }}
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" class="card-container">
                  <v-btn @click="bookCourse"> ยืนยันการจอง </v-btn>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      courseData: null,
      dataLoaded: false,
      error: null,
      dateBook: "",
    };
  },
  methods: {
    async getCourse() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/course/${this.$route.params.courseId}`
        );
        this.courseData = response.data;
        this.dataLoaded = true;
      } catch (error) {
        console.error(error.message);
        this.error = "Failed to fetch course data";
      }
    },
    async bookCourse() {
      try {
        const data = {
          bookDate: this.dateBook,
          user: {
            userId: JSON.parse(localStorage.getItem("auth"))?.userId,
          },
          course: {
            courseId: this.courseData.courseId,
          },
        };
        const response = await axios.post(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/book`,
          data
        );
        if (response.status === 201) {
          if (response.status === 201) {
            Swal.fire({
              title: "จองสำเร็จ!",
              icon: "success",
              confirmButtonText: "ตกลง",
              timer: 1500,
            });
            this.$router.go(-1);
          }
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
  created() {
    // You can call the getCourse method here when the component is created
    this.getCourse();
  },
};
</script>

<style scoped>
.course-details {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.course-info,
.trainer-info {
  margin-top: 20px;
}

.error-message {
  color: red;
  font-size: 18px;
}

.loading-message {
  font-size: 18px;
  font-style: italic;
}
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
