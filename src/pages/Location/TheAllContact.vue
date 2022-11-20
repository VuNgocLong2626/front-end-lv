<template>
  <div class="customers">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="titlepage text_align_center">
            <h2>Khách Hàng Đánh giá</h2>
          </div>
        </div>
      </div>
      <Carousel>
        
        <Slide v-for="slide in 5" :key="slide">
          <div class="carousel__item" v-if="listFeedBack[slide-1]">
            <div>
              <p class="center__p">{{listFeedBack[slide-1].Message}}</p>
              <div style="margin-top: 25px">
                <h4 >
                  Họ và Tên: {{listFeedBack[slide-1].Fullname}}
                </h4>
                <h6>Ngày: {{listFeedBack[slide-1].DateFeedback}}</h6>
              </div>
            </div>
          </div>
          <div v-else>
            <h3>Hiện chưa có đánh giá</h3>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import axios from "../../axios.js";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      listFeedBack: [],
      number: 0,
    };
  },
  computed: {
    isLength() {
      return this.listFeedBack.length;
    },
  },
  mounted() {
    axios
      .get("/feedback/get-all-true?display=true")
      .then((response) => {
        this.listFeedBack = response.data;
        this.number = response.data.length;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
.center__p {
  width: 70%;
  margin: auto;
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--carousel-color-primary);
  color: var(--carousel-color-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>