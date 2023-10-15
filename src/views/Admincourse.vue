<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>ชื่อ Course</h2>
    <v-row>
      <v-col
        style="display: flex; justify-content: flex-end; margin-bottom: 20px"
      >
        <v-btn color="var(--color-main)" to="/manageCourseAdd">เพิ่ม</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="indexedCourseItems"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      CourseItems: [],
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "index",
        },
        {
          text: "ชื่อ",
          align: "start",
          sortable: false,
          value: "courseName",
        },
        {
          text: "ชื่อเทรนเนอร์",
          align: "start",
          sortable: false,
          value: "trainer.trainerName",
        },
        {
          text: "เบอร์มือถือ",
          align: "start",
          sortable: false,
          value: "trainer.trainertel",
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    this.getAllCourse();
  },

  computed: {
    indexedCourseItems() {
      return this.CourseItems.map((item, index) => {
        return { ...item, index: index + 1 };
      });
    },
  },

  methods: {
    async getAllCourse() {
      try {
        const response = await axios.get(
          process.env.VUE_APP_NOT_SECRET_CODE + `/course`
        );
        if (response.status == 200) {
          this.CourseItems = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async deleteItem(item) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบ ${item.courseName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              process.env.VUE_APP_NOT_SECRET_CODE + `/course/${item.courseId}`
            );
            if (response.status === 200) {
              Swal.fire({
                title: "ลบสำเร็จ!",
                icon: "success",
                confirmButtonText: "ตกลง",
                timer: 1500,
              });
              this.getAllCourse();
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
