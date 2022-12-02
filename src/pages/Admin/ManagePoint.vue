<template>
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

    <ol-vector-layer v-if="!allInfo">
      <ol-source-vector :projection="projection">
        <ol-interaction-draw
          v-if="drawEnable"
          :type="drawType"
          @drawend="drawstart"
          @drawstart="draTest"
        >
        </ol-interaction-draw>
      </ol-source-vector>

      <ol-style>
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
        <ol-style-circle :radius="7">
          <ol-style-fill color="blue"></ol-style-fill>
        </ol-style-circle>
      </ol-style>
    </ol-vector-layer>

        <!-- <ol-overlay :position="[105.74432520257396, 10.08826079632529]">
        <template v-slot="slotProps">
            <div class="overlay-content">
                Hello world!<br>
                Position: {{ slotProps.position }}
            </div>
        </template>
    </ol-overlay> -->

    <!-- Điểm trên bản đò -->

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-point :coordinates="listPoint"></ol-geom-multi-point>
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

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-line-string
            :coordinates="[focusAddress]"
          ></ol-geom-multi-line-string>
          <ol-style>
            <ol-style-stroke :color="strokeColor" :width="3"></ol-style-stroke>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-line-string
            :coordinates="[SpacePoint]"
          ></ol-geom-multi-line-string>
          <ol-style>
            <ol-style-stroke :color="strokeColorS" :width="3"></ol-style-stroke>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
  <div v-if="!allInfo" class="col-md-8 offset-md-2 mg__top__25">
    <b-form @submit="onSubmit" class="main_form">
      <div class="row">
        <div>
          <b-form-select
            v-model="focusAddress"
            :options="options"
            @click="updateSpacePoint"
          ></b-form-select>
          <div class="mt-3">
            Selected: <strong>{{ focusAddress }}</strong>
          </div>
        </div>
        <div>
          <div class="col-md-12">
            <input
              class="cont_in"
              type="type"
              :value="
                SpacePoint[1] ? 'Điểm giao : ' + SpacePoint[0] : 'Điểm giao '
              "
              readonly
            />
          </div>
          <b-button @click="sumX">Cộng X</b-button>
          <b-button @click="subX" class="mg__left__25px">Trừ X</b-button>
          <b-button @click="sumY" class="mg__left__25px">Cộng Y</b-button>
          <b-button @click="subY" class="mg__left__25px">Trừ Y</b-button>
        </div>
        <div class="col-md-12">
          <input
            class="cont_in"
            placeholder="Tên Địa Điểm"
            type="type"
            name="NameLocation"
            v-model="form.NameLocation"
          />
        </div>
        <div class="col-md-12">
          <input
            v-model="form.model"
            class="cont_in"
            placeholder="Mô hình kinh doanh"
            type="type"
          />
        </div>
        <div class="input-create mb-3">
          <label>Hình ảnh địa điểm</label>
          <input
            ref="file"
            type="file"
            @change="uploadFile"
            class="form-control"
            multiple
          />
        </div>
        <div class="col-md-12">
          <input
            class="cont_in"
            placeholder="Giá giao động: 56000-120000"
            type="type"
            v-model="form.Price"
          />
        </div>
        <div class="col-md-12">
          <input
            class="cont_in"
            v-model="form.Address"
            placeholder="Địa chỉ"
            type="type"
          />
        </div>
        <div class="col-md-12">
          <input
            class="cont_in"
            placeholder="Thời gian hoạt đông: 7h-18h"
            type="type"
            v-model="form.TimeStar"
          />
        </div>
        <div class="col-md-12">
          <textarea
            class="textarea"
            style="color: #676767"
            placeholder="Giới thiệu thông tin địa điểm"
            type="type"
            name="Message"
            v-model="form.InfoLocation"
          >
          </textarea>
        </div>
        <div class="col-md-12">
          <b-button variant="danger" @click="onSubmit">Tạo Đường đi</b-button>
        </div>
      </div>
    </b-form>
  </div>
  <div v-else class="col-md-8 offset-md-2 mg__top__25">
    <b-form @submit="updateInfo" class="main_form">
      <div class="row">
        <div class="col-md-12">
          <input
            class="cont_in"
            placeholder="Tên Địa Điểm"
            type="type"
            name="NameLocation"
            v-model="allInfo.NameLocation"
          />
        </div>
        <div class="col-md-12">
          <input
            v-model="allInfo.Model"
            class="cont_in"
            placeholder="Mô hình kinh doanh"
            type="type"
          />
        </div>
        <div class="col-md-12">
          <input
            class="cont_in"
            placeholder="Giá giao động: 56000-120000"
            type="type"
            v-model="allInfo.Price"
          />
        </div>
        <div class="col-md-12">
          <input
            class="cont_in"
            v-model="allInfo.Address"
            placeholder="Địa chỉ"
            type="type"
          />
        </div>
        <div class="col-md-12">
          <input
            class="cont_in"
            placeholder="Thời gian hoạt đông: 7h-18h"
            type="type"
            v-model="allInfo.TimeStar"
          />
        </div>
        <div class="col-md-12">
          <textarea
            class="textarea"
            style="color: #676767"
            placeholder="Giới thiệu thông tin địa điểm"
            type="type"
            name="Message"
            v-model="allInfo.InfoLocation"
          >
          </textarea>
        </div>
        <div class="col-md-12">
          <b-button variant="success" @click="updateInfo"
            >Cập nhật thông tin</b-button
          >
        </div>
      </div>
    </b-form>
  </div>
</template>

 
<script>
import { ref } from "vue";
import axios from "../../axios";

export default {
  data() {
    return {
      test: [],
      lisAddress: [],
      listPoint: [],
      form: {
        NameLocation: null,
        model: null,
        Price: null,
        Address: null,
        InfoLocation: null,
        TimeStar: null,
        OnAddress: null,
        PointAddress: null,
        PointSpace: null,
        PointCross: null,
        Gamil: null,
        file: null,
      },
      options: [],
      focusAddress: [],
      SpacePoint: [],
      allInfo: null,
    };
  },
  computed: {
    tes() {
      return this.focusAddress[0];
    },
  },
  methods: {
    sumX() {
      this.SpacePoint[0][0] += 0.00005;
    },
    subX() {
      this.SpacePoint[0][0] -= 0.00005;
    },
    sumY() {
      this.SpacePoint[0][1] += 0.00005;
    },
    subY() {
      this.SpacePoint[0][1] -= 0.00005;
    },
    uploadFile() {
      this.form.file = this.$refs.file.files;
      for (const i in this.$refs.file.files.length) {
        console.log(this.$refs.file.files[i]);
      }
      console.log(this.form.file);
    },
    updateSpacePoint() {
      if (this.SpacePoint) this.SpacePoint.pop();
      this.SpacePoint.push(this.tes);
      // console.log(this.tes)
    },
    draTest(event) {
      //   console.log(event.target.sketchCoords_);
      this.SpacePoint.push(event.target.sketchCoords_);
      // return event.target.sketchCoords_;
    },
    async onSubmit(event) {
      event.preventDefault();
      if (this.SpacePoint.length < 2) {
        alert("Chưa Chọn đường hoặc điểm kinh doanh");
        return;
      }
      if (!this.form.NameLocation) {
        alert("Chưa Nhập Tên");
        return;
      }
      if (!this.form.model) {
        alert("Chưa nhập mô hình kinh doanh");
        return;
      }
      //   if (!this.$refs.file.files.length < 2) {
      //     alert("Chưa Thêm đủ hình, Phải là 3 hình");
      //   }
      const formData = new FormData();
      const IdAddress = this.options.find(
        (element) => element.value == this.focusAddress
      ).IdSpace;

      const dataInfo = {
        NameLocation: this.form.NameLocation,
        Model: this.form.model,
        Price: this.form.Price,
        Address: this.form.Address,
        InfoLocation: this.form.InfoLocation,
        TimeStar: this.form.TimeStar,
        OnIdAddress: IdAddress,
        PointAddress: this.focusAddress,
        PointSpace: this.SpacePoint[1],
        PointCross: this.SpacePoint[1],
        GmailBussiness: localStorage.getItem("gmail"),
      };

      console.log(dataInfo);
      for (var i = 0; i < this.$refs.file.files.length; i++) {
        let file = this.$refs.file.files[i];
        formData.append("Path", file);
      }
      const responid = await axios
        .post("/location/create-location", dataInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (response) {
          console.log(response.response);
        });
      console.log(responid);
      formData.append("IdLocation", responid.IdLocation);
      await axios
        .post("/location/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          alert("Tạo Điểm thành công");
        })
        .catch(function (response) {
          console.log(response.response);
        });
      console.log(responid);
    },
    async updateInfo(event) {
      event.preventDefault();
      const dataInfo = {
        NameLocation: this.allInfo.NameLocation,
        Model: this.allInfo.Model,
        Price: this.allInfo.Price,
        Address: this.allInfo.Address,
        InfoLocation: this.allInfo.InfoLocation,
        TimeStar: this.allInfo.TimeStar,
        SK: this.allInfo.SK,
        PK: this.allInfo.PK,
      };
      console.log(dataInfo)
      await axios
        .put("/location/update-info-location", dataInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function () {
          alert("Cập nhật Điểm thành công");
        })
        .catch(function (response) {
          console.log(response.response);
        });
    },
  },
  mounted() {
    axios
      .get("/space-admin/get-all-space_admin")
      .then((response) => (this.lisAddress = response.data))
      .catch((error) => console.log(error));
    axios
      .get("/space-admin/get-all-space-selection")
      .then((response) => (this.options = response.data))
      .catch((error) => console.log(error));
    axios
      .get("/location/get-all-location-point")
      .then((response) => (this.listPoint = response.data))
      .catch((error) => console.log(error));
    axios
      .post("/location/get-info-location-by-gmail", {
        GmailBussiness: localStorage.getItem("gmail"),
      })
      .then((response) => (this.allInfo = response.data))
      .catch((error) => console.log(error));
  },
  setup() {
    const center = ref([105.748565, 10.085029]);
    const projection = ref("EPSG:4326");
    const zoom = ref(16);
    const rotation = ref(0);
    const radius = ref(10);
    const strokeWidth = ref(3);
    const strokeColor = ref("red");
    const strokeColorAddress = ref("#FF9999");
    const fillColor = ref("white");
    const strokeColorS = ref("#66FFFF");

    const drawEnable = ref(true);
    const drawType = ref("Point");

    const drawstart = (event) => {
      console.log(event);
    };

    const drawend = (event) => {
      // console.log(event);
      return event.target.sketchCoords_;
    };

    const webglPointsStyle = {
      symbol: {
        symbolType: "circle",
        size: [
          "interpolate",
          ["linear"],
          ["get", "population"],
          40000,
          8,
          2000000,
          28,
        ],
        color: "#ffed02",
        rotateWithView: false,
        offset: [105.748565, 10.085031],
        opacity: [
          "interpolate",
          ["linear"],
          ["get", "population"],
          40000,
          0.6,
          2000000,
          0.92,
        ],
      },
    };

    return {
      center,
      projection,
      zoom,
      rotation,
      drawEnable,
      drawType,
      drawstart,
      drawend,
      webglPointsStyle,
      radius,
      strokeWidth,
      strokeColor,
      strokeColorAddress,
      strokeColorS,
      fillColor,
    };
  },
};
</script>
 
<style>
.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
}
.mg__top__25 {
  margin-top: 25px;
}
.mg__left__25px {
  margin-left: 25px;
}
.test{
    color: red;
}
</style>