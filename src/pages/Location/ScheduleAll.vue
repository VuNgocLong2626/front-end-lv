<template>
  <div v-if="isLichTrinh" class="customers">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="titlepage text_align_center">
            <h2>Lịch trình sẽ đi</h2>
          </div>
        </div>
      </div>
      <div>
        <table class="table mb-4">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên Địa điểm</th>
              <th scope="col">Thời gian hoạt động</th>
              <th scope="col">Giá giao động</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.NameLocation }}</td>
              <td>{{ item.TimeStar }}</td>
              <td>{{ item.PriceMin }} - {{ item.PriceMax }}</td>
              <td>
                <button
                  type="submit"
                  @click="deleteItem(index)"
                  class="btn btn-danger"
                >
                  Xóa
                </button>
                <button
                  v-if="index != items.length - 1"
                  type="submit"
                  class="btn btn-success ms-1"
                  @click="changeOrderDown(item, index)"
                >
                  Xuống
                </button>
                <b-button
                  @click="changeOrderUp(item, index)"
                  v-if="index != 0"
                  class="ms-1"
                  variant="secondary"
                  >Lên</b-button
                >
              </td>
            </tr>
            <tr>
              <td>Giá nhỏ nhất phải trả: {{ fromatMin }}</td>
              <td>Giá lớn nhất phải trả: {{ fromatMax }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container">
      <div class="row mg__bttom__25">
        <div v-if="address">
          <div>
            <label>Con đường đang đướng</label>
            <b-form-select
              v-model="focusAddress"
              :options="options"
            ></b-form-select>
          </div>
          <div v-if="current">
                {{current}}
          </div>
          <div class="col-md-12" style="margin-top:20px">
            <b-button variant="success" @click="tipAddressPoint()"
              >Gợi ý đi đường</b-button
            >
            <b-button variant="danger" @click="reset()" style="margin-left: 25px">Hủy</b-button>
          </div>
        </div>
        <div v-else>
          <div class="col-md-12">
            <b-button variant="success" @click="hintPonitPoint()">Tìm đường đi tếp theo</b-button>
          </div>
        </div>
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

        <!-- <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-multi-point
              :coordinates="[ItemLocation.PointSpace]"
            ></ol-geom-multi-point>
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
      </ol-vector-layer> -->

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

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-multi-line-string
                :coordinates="[focusAddress]"
              ></ol-geom-multi-line-string>
              <ol-style>
                <ol-style-stroke
                  :color="strokeColor"
                  :width="2"
                ></ol-style-stroke>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-multi-line-string
                :coordinates="searchListAddress"
              ></ol-geom-multi-line-string>
              <ol-style>
                <ol-style-stroke
                  :color="strokeColor"
                  :width="2"
                ></ol-style-stroke>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </ol-map>
    </div>
  </div>
  <div v-else class="customers">
    <div class="row">
      <div class="col-sm-12">
        <div class="titlepage text_align_center">
          <h2>Lịch trình chưa có</h2>
        </div>
      </div>
    </div>
  </div>
  {{content}}
</template>


<script>
import axios from "../../axios";
import { ref } from "vue";

export default {
  data() {
    return {
      items: [],
      search: "",
      lisAddress: [],
      searchListAddress: [],
      address: true,
      options: [],
      focusAddress: [],
      showBtn: true,
      current: '',
      content: ''
    };
  },
  methods: {
    changeOrderDown(item, index) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      var temp1 = users[index];
      users[index] = users[index + 1];
      users[index + 1] = temp1;
      localStorage.setItem("users", JSON.stringify(users));
      let temp = item;
      this.items[index] = this.items[index + 1];
      this.items[index + 1] = temp;
    },
    changeOrderUp(item, index) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      var temp1 = users[index];
      users[index] = users[index - 1];
      users[index - 1] = temp1;
      localStorage.setItem("users", JSON.stringify(users));
      let temp = item;
      this.items[index] = this.items[index - 1];
      this.items[index - 1] = temp;
    },
    deleteItem(index) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.splice(index, 1);
      this.items.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
    },
    async hintAddressPoint() {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const endPoint = users.shift();
      // this.items.shift();

      const IdAddress = this.options.find(
        (element) => element.value == this.focusAddress
      ).IdSpace;
      const listAddress = await axios
        .post("/neighbour/search-addresss", {
          IdStar: IdAddress,
          IdEnd: endPoint,
          Address: this.address,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => console.log(error));
      this.searchListAddress = listAddress;
      this.address = false;
    },
    async hintPonitPoint() {
      this.focusAddress = []
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const starPoint = users.shift();
      this.items.shift();
      const endPoint = users[0];
      // this.items.shift();
      localStorage.setItem("users", JSON.stringify(users));
      if(users.length == 0) {
        alert('Lịch dẫ hết')
        this.$router.push('/Pakages')
        return
      }

      const listAddress = await axios
        .post("/neighbour/search-addresss", {
          IdStar: starPoint,
          IdEnd: endPoint,
          Address: this.address,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => console.log(error));
      this.searchListAddress = listAddress;
      this.address = false;
    },
    async tipAddressPoint() {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if(users.length == 0) {
        alert('Lịch dẫ hết')
        this.$router.push('/Pakages')
        return
      }
      const endPoint = users.shift();
      this.items.shift();
      localStorage.setItem("users", JSON.stringify(users));

      const IdAddress = this.options.find(
        (element) => element.value == this.focusAddress
      );
      const data = await axios
        .post("/neighbour/search-addresss", {
          IdStar: IdAddress.IdSpace,
          IdEnd: endPoint,
          Address: this.address,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => console.log(error));
      this.searchListAddress = data.ListAddress;
      this.current = data.Address;
      this.content = data.Script;
    },
    reset(){
      this.focusAddress = [];
      this.searchListAddress = []
    }
  },
  mounted() {
    axios
      .post("/location/get-info-list-id", localStorage.getItem("users"))
      .then((response) => (this.items = response.data))
      .catch((error) => console.log(error));
    axios
      .get("/space-admin/get-all-space_admin")
      .then((response) => (this.lisAddress = response.data))
      .catch((error) => console.log(error));

    axios
      .get("/space-admin/get-all-space-selection")
      .then((response) => (this.options = response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    sumPriceMin() {
      return this.items.reduce((accumulator, object) => {
        return accumulator + object.PriceMin;
      }, 0);
    },
    fromatMin() {
      return (
        this.sumPriceMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " VND"
      );
    },
    sumPriceMax() {
      return this.items.reduce((accumulator, object) => {
        return accumulator + object.PriceMax;
      }, 0);
    },
    fromatMax() {
      return (
        this.sumPriceMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " VND"
      );
    },
    formatPriceElement: function (index) {
      return index;
    },
    isLichTrinh() {
      return JSON.parse(localStorage.getItem("users" || "[]")).length != 0;
    },
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
.mg__bttom__25 {
  margin-bottom: 25px;
}
</style>