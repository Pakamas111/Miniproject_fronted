<template>
  <div>
    <h1>Book List</h1>

    <ul v-if="dataLoaded">
      <li v-for="(book, index) in bookData" :key="index">
        {{ book.title }} by {{ book.author }} - Date: {{ book.bookDate }} -
        Course: {{ book.course }}
      </li>
    </ul>
    <!-- Displaying the list of books -->
    <ul v-if="dataLoaded">
      <li v-for="(book, index) in bookData" :key="index">
        {{ book.title }} - {{ book.author }}
      </li>
    </ul>

    <!-- Display an error message if there's an issue with the API request -->
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookData: [], // เก็บข้อมูลหนังสือที่ได้จาก backend
      error: null, // เก็บข้อผิดพลาดถ้ามี
      dataLoaded: false, // สถานะการโหลดข้อมูล
    };
  },
  created() {
    this.Book(); // เรียกเมื่อคอมโพเนนต์ถูกสร้างขึ้น
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("URL_API_BOOKS"); // เปลี่ยน URL_API_BOOKS เป็น URL ของ backend API ของคุณ
        this.bookData = response.data; // นำข้อมูลที่ได้มาเก็บไว้ในตัวแปร
        this.dataLoaded = true; // เปลี่ยนสถานะการโหลดเมื่อข้อมูลเสร็จสิ้น
      } catch (error) {
        console.error(error);
        this.error = "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ"; // จัดการข้อผิดพลาด
      }
    },
  },
};
</script>

<style>
/* CSS styles ที่คุณต้องการเพิ่ม */
</style>
