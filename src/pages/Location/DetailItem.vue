<template>
  <div class="container bootdey mg__top__50">
    <div class="col-md-12">
      <section class="panel">
        <div class="panel-body row">
          <div class="col-md-6">
            <div class="pro-img-details">
              <Carousel>
                <Slide v-for="slide in 3" :key="slide">
                  <div class="carousel__item image__main">
                    <img :src="test[slide]" />
                  </div>
                </Slide>
                <template #addons>
                  <Navigation />
                </template>
              </Carousel>
            </div>
            <div
              class="d-flex justify-content-around"
              style="margin-top: 10px; margin-left: -13px"
            >
              <a href="#">
                <img class="render__image" :src="test[1]" />
              </a>
              <a href="#">
                <img class="render__image" :src="test[2]" />
              </a>
              <a href="#">
                <img class="render__image" :src="test[3]" />
              </a>
            </div>
          </div>
          <div class="col-md-6">
            <h1 class="pro-d-title" style="font-size: 2rem; margin-top: -2rem">
              {{ ItemLocation.NameLocation }}
            </h1>
            <div style="border-top: 1px solid #eee">
              <p>
                {{ ItemLocation.InfoLocation }}
              </p>
            </div>
            <div class="product_meta">
              <span class="posted_in">
                <strong>Tên chủ hộ:</strong> {{ ItemLocation.FullName }}.</span
              >
              <span class="tagged_as"
                ><strong>Số điện thoại: </strong>{{ ItemLocation.SDT }}.</span
              >
              <span class="tagged_as"
                ><strong>Dịa chỉ Email: </strong>{{ ItemLocation.Gmail }}.</span
              >
            </div>
            <div class="product_meta">
              <span class="tagged_as"
                ><strong>Thời gian hoạt động: </strong
                >{{ ItemLocation.TimeStar }}.</span
              >
              <span class="tagged_as"
                ><strong>Địa chỉ: </strong>{{ ItemLocation.Address }}.</span
              >
              <span class="tagged_as"
                ><strong>Mô hình kinh doanh: </strong
                >{{ ItemLocation.Model }}.</span
              >
            </div>
            <div class="m-bot15">
              <strong>Giá : </strong>
              <span style="font-size: 19px">{{ ItemLocation.Price }} VND</span>
              <!-- <span class="pro-price"> $300.00</span> -->
            </div>
            <p>
              <a
                class="read_more"
                style="max-width: 100%"
                @click="addLocation($route.params.id)"
                >Thêm Vào lịch trình</a
              >
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="with__map mg__top__200">
    <div class="text__center">
      <h2>Vị Trí trên bản đồ</h2>
    </div>
      <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 500px"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-point :coordinates="[ItemLocation.PointSpace]"></ol-geom-multi-point>
          <ol-style>
            <ol-style-circle :radius="radius">
              <ol-style-fill :color="fillColor"></ol-style-fill>
              <ol-style-stroke
                :color="strokeColor"
                :width="strokeWidth"
              ></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-line-string
            :coordinates="lisAddress"
          ></ol-geom-multi-line-string>
          <ol-style>
            <ol-style-stroke
              :color="strokeColorAddress"
              :width="5"
            ></ol-style-stroke>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
  </div>
  <div class="container mg__top__20">
    <h2>Bình luận gần đây</h2>
    <div class="row">
      <div class="col-8" style="height: 100%">
          <div
            v-for="item in listComment"
            :key="item.IdComment"
            class="comment mt-4 text-justify float-left"
          >
            <div class="select_main">
              <div class="p-2">
                <h4>{{ item.FullName }}</h4>
                <span style="line-height: 20px">{{ item.DateComment }}</span>
              </div>
              <div class="ml-auto p-2">
                <vue3-star-ratings
                  style="margin: 0px; padding: 0px; margin-top: -4px"
                  :starSize="12"
                  :showControl="false"
                  v-model="item.Star"
                  :disableClick="true"
                />
              </div>
            </div>
            <p style="margin: 10px 0">
              {{ item.Comment }}
            </p>
          </div>
      </div>
      <div class="col-4" style="height: 100%">
        <form id="request" class="main_form">
          <div class="row">
            <div class="col-md-12">
              <input
                class="cont_in"
                placeholder="Họ và tên"
                type="type"
                name=" Name"
                v-model="form.fullName"
              />
            </div>
            <div class="col-md-12">
              <input
                class="cont_in"
                placeholder="Số điện thoại"
                type="type"
                v-model="form.number"
                name="Phone Number"
              />
            </div>
            <div class="col-md-12">
              <textarea
                class="textarea"
                style="color: #676767"
                placeholder="Nội dung phản hồi"
                type="type"
                name="Message"
                v-model="form.comment"
              >
              </textarea>
            </div>
            <vue3-star-ratings :showControl="false" v-model="form.star" />
            <div class="col-md-12">
              <button @click="onSubmit" class="send_btnt">Gửi</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
// import { registerRuntimeCompiler, toRefs } from "vue";
import { ref } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import axios from "../../axios";

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      ItemLocation: {},
      test: [],
      star: 2,
      form: {
        number: null,
        fullName: null,
        star: null,
        comment: null,
      },
      listComment: [],
      lisAddress: []
    };
  },
  computed: {
    address() {
        return this.ItemLocation.PointAddress
    }
  },
  mounted() {
    axios
      .post("/location/get-info-location-by-id", {
        IdLocation: this.$route.params.id,
      })
      .then((response) => {
        this.ItemLocation = response.data;
        this.test = response.data.ListImage;
      })
      .catch((error) => console.log(error));

    axios
      .post("/comment/get-all-comment-location", {
        IdLocation: this.$route.params.id,
      })
      .then((response) => {
        this.listComment = response.data;
      })
      .catch((error) => console.log(error));

    axios
      .get("/space-admin/get-all-space_admin")
      .then((response) => (this.lisAddress = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      await axios
        .post("/comment/create-comment", {
          SDT: this.form.number,
          Star: this.form.star,
          FullName: this.form.fullName,
          Comment: this.form.comment,
          IdLocation: this.$route.params.id,
        })
        .then(() => {
          alert("Bình luận thành công");
        })
        .catch((error) => console.log(error));
    },
    addLocation(value) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const check = users.find(element => element == value)
        console.log(check)
        if(!check){
            users.push(value);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Đã được thêm');
            return;
        }
        alert('Đã có trong lịch trình');
    }
  },
  setup() {
    const center = ref([105.748565, 10.085029]);
    const projection = ref("EPSG:4326");
    const zoom = ref(16);
    const rotation = ref(0);
    const radius = ref(10);
    const strokeWidth = ref(4);
    const strokeColorAddress = ref("#FF9999");
    const strokeColor = ref("#000000");

    // strokeColor

    const fillColor = ref("white");

    return {
      center,
      projection,
      zoom,
      rotation,
      radius,
      strokeWidth,
      strokeColorAddress,
      strokeColor,
      fillColor,
    };
  },
};
</script>   

<style scoped>
.image__main {
  width: 100%;
  object-fit: cover;
  height: 550px;
}
.render__image {
  height: 132px;
  width: 175px;
  object-fit: cover;
}
.comment {
  float: left;
  border-radius: 5px;
  padding-left: 40px;
  padding-right: 30px;
  padding-top: 10px;
  box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px,
    rgb(0 0 0 / 30%) 0px 1px 3px -1px;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  color: white;
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
}

.carousel__next {
  margin-right: -22px;
  right: 0;
}

.text__center {
  text-align: center;
  margin-bottom: 25px;
}
.with__map {
  width: 1600px;
  margin: auto;
}
.mg__top__50 {
  margin-top: 80px;
}

.mg__top__20 {
  margin-top: 20px;
}

.mg__top__200 {
  margin-top: 100px;
}

.panel {
  border: none;
  box-shadow: none;
}

.panel-heading {
  border-color: #eff2f7;
  font-size: 16px;
  font-weight: 300;
}

.panel-title {
  color: #2a3542;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0;
  margin-top: 0;
  font-family: "Open Sans", sans-serif;
}

/*product list*/

.prod-cat li a {
  border-bottom: 1px dashed #d9d9d9;
}

.prod-cat li a {
  color: #3b3b3b;
}

.prod-cat li ul {
  margin-left: 30px;
}

.prod-cat li ul li a {
  border-bottom: none;
}
.prod-cat li ul li a:hover,
.prod-cat li ul li a:focus,
.prod-cat li ul li.active a,
.prod-cat li a:hover,
.prod-cat li a:focus,
.prod-cat li a.active {
  background: none;
  color: #ff7261;
}

.pro-lab {
  margin-right: 20px;
  font-weight: normal;
}

.pro-sort {
  padding-right: 20px;
  float: left;
}

.pro-page-list {
  margin: 5px 0 0 0;
}

.product-list img {
  width: 100%;
  border-radius: 4px 4px 0 0;
  -webkit-border-radius: 4px 4px 0 0;
}

.product-list .pro-img-box {
  position: relative;
}
.adtocart {
  background: #fc5959;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  color: #fff;
  display: inline-block;
  text-align: center;
  border: 3px solid #fff;
  left: 45%;
  bottom: -25px;
  position: absolute;
}

.adtocart i {
  color: #fff;
  font-size: 25px;
  line-height: 42px;
}

.pro-title {
  color: #5a5a5a;
  display: inline-block;
  margin-top: 20px;
  font-size: 16px;
}

.product-list .price {
  color: #fc5959;
  font-size: 15px;
}

.pro-img-details {
  margin-left: -15px;
}

.pro-img-details img {
  width: 100%;
}

.pro-d-title {
  font-size: 16px;
  margin-top: 0;
}

.product_meta {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  margin: 15px 0;
}

.product_meta span {
  display: block;
  margin-bottom: 10px;
}
.product_meta a,
.pro-price {
  color: #fc5959;
}

.pro-price,
.amount-old {
  font-size: 18px;
  padding: 0 10px;
}

.amount-old {
  text-decoration: line-through;
}

.quantity {
  width: 120px;
}

.pro-img-list {
  margin: 10px 0 0 -15px;
  width: 100%;
  display: inline-block;
}

.pro-img-list a {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}

.pro-d-head {
  font-size: 18px;
  font-weight: 300;
}
</style>