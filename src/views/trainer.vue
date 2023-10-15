<template>
  <div>
    <div class="imgContainer">
      <h1 style="color: #ffff; padding: 10px">Trainer List</h1>

      <!-- Displaying the list of trainers -->
      <ul v-if="dataLoaded">
        <li v-for="(trainer, index) in trainerData" :key="index">
          <h3 style="color: #ffff">{{ trainer.trainerName }}</h3>
          <p style="color: #ffff">Tel: {{ trainer.trainertel }}</p>
          <v-img></v-img>
          
          <!-- Add more fields as needed -->
        </li>
      </ul>
    </div>

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
      trainerData: [],
      error: null,
      dataLoaded: false,
    };
  },
  created() {
    this.getTrainerData();
  },
  methods: {
    async getTrainerData() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_NOT_SECRET_CODE}/trainer`
        );
        this.trainerData = response.data;
        this.dataLoaded = true;
      } catch (error) {
        console.error(error.message);
        this.error = "Failed to fetch trainer data.";
      }
    },
  },
};
</script>

<style>
.imgContainer {
  width: 100%;
  height: 700px; /* Set an appropriate height for the container */
  background-image: url("../assets/dumbbell-1966247_1920.jpg");
  background-size: cover; /* Ensure the image covers the entire container */
  background-position: center; /* Center the image within the container */
}
/* Add your CSS styles here */
</style>
