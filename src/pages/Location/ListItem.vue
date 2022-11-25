<template>
  <div class="packages">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="titlepage text_align_center">
            <h2>Tất cả địa điểm du lịch</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="item in listItem" :key="item.IdLocation" class="col-md-6">
          <div id="ho_img" class="packages_box" data-aos="fade-right">
            <figure><img class="render__image" :src="item.Path" alt="#" /></figure>
            <div class="tuscany">
              <div class="tusc text_align_left">
                <div class="italy">
                  <h2>{{ item.NameLocation }}</h2>
                  <span><img src="../../images/loca.png" alt="#" />Thời gian hoạt động: {{item.TimeStar}}</span>
                </div>
                <div class="italy_right">
                  <!-- <h3>Giá</h3>
                  <span>{{ item.Price }}</span> -->
                </div>
              </div>
              <p class="test">
                {{item.InfoLocation}}
              </p>
              <div class="tusc">
                <a class="read_more" @click="showDetail(item.IdLocation)">Xem chi tiết</a>
                <a class="read_more" @click="addLocation(item.IdLocation)">Vào lịch trình</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";


export default {
  data() {
    return {
      listItem: []
    };
  },
  computed: {
    isPermission() {
      return !!this.$store.getters["info/permission"];
    },
  },
  methods: {
    showDetail(value) {
      this.$router.push('/detail-item/'+value)
    },
    showAll() {
      this.$router.push('/Pakages')
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
  mounted() {
    axios
      .get("/location/get-main-info-location-all")
      .then((response) => (this.listItem = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.test {
  display: -webkit-box;
  max-height: 9.5rem;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 5;
  line-height: 1.6rem;
}
.render__image{
    height: 450px;
    object-fit: cover;
}
</style>