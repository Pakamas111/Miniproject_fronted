<template>
  <v-container style="padding-top: 50px; padding-bottom: 60px">
    <v-btn text @click="$router.go(-1)" style="margin-bottom: 20px">
      <v-icon left>mdi-arrow-left</v-icon> ย้อนกลับ
    </v-btn>
    <h2>รายการการจอง</h2>
    <v-row>
      <v-col
        style="display: flex; justify-content: flex-end; margin-bottom: 20px"
      >
        <!-- <v-btn color="var(--color-main)" to="/manageBookAdd">เพิ่ม</v-btn> -->
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="indexedbookItems"
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
      bookItems: [],
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "index",
        },
        {
          text: "ชื่อ course",
          align: "start",
          sortable: false,
          value: "course.courseName",
        },
        {
          text: "ชื่อเทรนเนอร์",
          align: "start",
          sortable: false,
          value: "course.trainer.trainerName",
        },
        {
          text: "เบอร์มือถือ",
          align: "start",
          sortable: false,
          value: "course.trainer.trainertel",
        },
        {
          text: "ชื่อลูกค้า",
          align: "start",
          sortable: false,
          value: "fullname",
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    this.getAllBook();
  },

  computed: {
    indexedbookItems() {
      return this.bookItems.map((item, index) => {
        return {
          ...item,
          index: index + 1,
          fullname:
            item.course.user.firstName + " " + item.course.user.lastName,
        };
      });
    },
  },

  methods: {
    async getAllBook() {
      try {
        const response = await axios.get(
          process.env.VUE_APP_NOT_SECRET_CODE + `/book`
        );
        if (response.status == 200) {
          this.bookItems = response.data;
        }
      } catch (err) {
        console.error(err);
      }
    },

    async deleteItem(item) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: `คุณต้องการลบการจอง?`,
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
                title: "ลบสำเร็จ!",
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
