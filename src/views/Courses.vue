<template>
  <div class="course-container">
    <div class="courses-list">
      <h1 class="title">Courses & Trainers</h1>

      <!-- Displaying the list of trainers -->
      <v-container fluid v-if="dataLoaded">
        <v-row>
          <v-col
            v-for="(course, index) in coursesData"
            :key="index"
            cols="12"
            xs="12"
            sm="12"
            md="3"
          >
            <v-card class="course-item" min-width="200px">
              <h3 class="course-name">{{ course.courseName }}</h3>
              <div class="trainer-info">
                <p class="trainer-name">
                  Trainer: {{ course.trainer.trainerName }}
                </p>
                <p class="trainer-tel">Tel: {{ course.trainer.trainertel }}</p>
              </div>
              <div v-if="!admin">
                <v-btn
                  v-if="!course.book"
                  text
                  style="color: #fbc02d"
                  @click="gotoCourse(course.courseId)"
                >
                  reserve</v-btn
                >
                <h1 v-if="course.book" style="color: #d01716; font-size: 22px">
                  Already reserved
                </h1>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Display an error message if there's an issue with the API request -->
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      coursesData: [],
      error: null,
      dataLoaded: false,
      book: [],
      error: null,
      bookData: false,
      bookItems: [],
      role: null,
      admin: null,
    };
  },
  methods: {
    async getbookCourse(id) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/course/${id}/book`
        );
        // ตรวจสอบสถานะการจอง
        if (response.status === 200) {
          // ดำเนินการเมื่อจองสำเร็จ
          console.log("Course booked successfully");
          // สามารถอัปเดตข้อมูลอื่น ๆ หรือเปลี่ยนสถานะตามความต้องการ
        } else {
          // ดำเนินการเมื่อจองไม่สำเร็จ
          console.error("Failed to book the course");
        }
      } catch (error) {
        console.error(error.message);
        this.error = "Failed to book the course";
      }
    },
    async getAllCourses() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/course`
        );
        this.coursesData = response.data;
        await this.getAllBook();
        this.coursesData = this.coursesData.map((item) => {
          const foundBookItem = this.bookItems.find(
            (e) => e.course.courseId === item.courseId
          );
          return foundBookItem
            ? { ...item, book: true }
            : { ...item, book: false };
        });

        this.dataLoaded = true;
      } catch (error) {
        console.error(error.message);
        this.error = "Failed to fetch courses data";
      }
    },
    async getAllBook() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/book`
        );
        this.bookItems = response.data;
      } catch (error) {
        console.error(error.message);
        this.error = "Failed to fetch courses data";
      }
    },
    gotoCourse(id) {
      this.$router.push({ path: `/course/${id}` });
    },
  },
  created() {
    this.getAllBook();
    this.getAllCourses();
    this.role = JSON.parse(localStorage.getItem("auth"))?.usertype;
    this.admin = this.role === "1";
  },
};
</script>

<style scoped>
.course-container {
  background-image: url("../assets/dumbbell-1966247_1920.jpg");
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.courses-list {
  font-family: Arial, sans-serif;
  /* max-width: 300px; */
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fbf9f9;
}

.course-list-container {
  list-style: none;
  padding: 0;
}

.course-item {
  border-top: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 0 0 5px 5px;
  background-color: #4e4e4e7b;
}

.course-name {
  font-size: 18px;
  margin: 0;
  color: #fff;
}

.trainer-info {
  margin-top: 10px;
  color: #fff;
}

.trainer-name {
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.error-message {
  color: red;
  font-size: 16px;
  margin-top: 20px;
}
</style>
