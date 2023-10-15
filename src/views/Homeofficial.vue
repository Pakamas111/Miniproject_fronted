<template>
  <div>
    <!-- <slide /> -->
    <div class="imgContainer">
      <div class="homeofficialContainer">
        <div class="titlehomeofficial">
          <img src="../assets/istockphoto-1013913640-2048x2048.jpg" />
          <div class="home">เปิดบริการทุกวัน</div>
          <div class="home1">เวลา 06.00 น.- 22.00 น.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slide from "@/components/Slide.vue";

export default {
  components: { slide },
};
</script>

<style scoped>
.home {
  text-align: center;
  font-size: 30px;
  margin-top: 30px;
  font-family: "Prompt", sans-serif;
}
.home1 {
  text-align: center;
  font-size: 25px;
  margin-top: 25px;
}

.imgContainer {
  justify-content: center;
  align-items: center;
  margin-top: 2px;
}

.imgContainer img {
  width: 100%;
}
</style>
