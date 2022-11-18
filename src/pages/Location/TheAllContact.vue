<template>
<div class="customers">
         <div class="container">

        
            <div class="row">
               <div class="col-sm-12">
                  <div class="titlepage text_align_center">
                     <h2>Customers Says </h2>
                  </div>
               </div>
            </div>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">
        <div>
          <p class="center__p">
            text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            typetext of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type
          </p>
          <i><img src="../../images/test2.png" alt="#"/></i>
        </div>
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
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  components: {
    Carousel,
    Slide,
    Navigation,
  },
});
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