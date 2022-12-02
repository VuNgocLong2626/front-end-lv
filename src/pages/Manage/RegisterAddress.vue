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

    <ol-vector-layer>
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

    <ol-vector-layer :key="tess">
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-line-string
            :coordinates="[test]"
          ></ol-geom-multi-line-string>
          <ol-style>
            <ol-style-stroke
              :color="strokeColor"
              :width="strokeWidth"
            ></ol-style-stroke>
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
            :coordinates="[ponitFocus]"
          ></ol-geom-multi-line-string>
          <ol-style>
            <ol-style-stroke
              :color="strokeColorFocus"
              :width="6"
            ></ol-style-stroke>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
  <div class="col-md-8 offset-md-2">
    <b-form @submit="onSubmit" class="main_form">
      <div class="row">
        <div class="col-md-12">
          <input
            class="cont_in"
            placeholder="Tên con đường"
            type="type"
            name=" Address"
            v-model="form.Address"
          />
        </div>
        <div class="col-md-12">
          <input
            class="cont_in"
            placeholder="Loại: đường đi"
            type="type"
            readonly
          />
        </div>
        <div class="col-md-12">
          <b-button variant="danger" @click="onSubmit">Tạo Đường đi</b-button>
        </div>
      </div>
    </b-form>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Tên đường</th>
        <th scope="col">#</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in listAllAddress" :key="item.SpaceName">
        <th>{{ item.SpaceName }}</th>
        <td>
          <b-button @click="showAddress(item.Point, item.IdSpace, 0)"
            >Thêm điểm Phải trên</b-button
          >
          <b-button
            class="mg__left__25px"
            @click="
              showAddress(item.Point, item.IdSpace, item.Point.length - 1)
            "
            >Thêm điểm Trái dưới</b-button
          >
        </td>
      </tr>
    </tbody>
  </table>
  <!-- {{ idAddressFocus }}
  ----
  <br />
  {{ IdSpace }} -->
</template>



 
<script>
import { ref } from "vue";
import axios from "../../axios";
export default {
  data() {
    return {
      test: [],
      form: {
        Address: null,
        type: "Address",
      },
      lisAddress: [],
      listAllAddress: [],
      ponitFocus: [],
      idAddressFocus: null,
      tess: null,
      IdSpace: null,
    };
  },
  methods: {
    draTest(event) {
      console.log(event.target.sketchCoords_);
      this.test.push(event.target.sketchCoords_);
      // return event.target.sketchCoords_;
    },
    async onSubmit(event) {
      event.preventDefault();
      if (!this.form.Address) {
        alert("Chưa nhập tên đường");
        return;
      }
      if (this.test.length < 2) {
        alert("Chưa tạo thành đường");
        return;
      }
      this.IdSpace = await axios
        .post("/space-admin/create-space_admin", {
          Point: this.test,
          Type: this.form.type,
          SpaceName: this.form.Address,
        })
        .then(function (resopnse) {
          console.log(resopnse.data);
          return resopnse.data;
        })
        .catch((error) => console.log(error));

      await axios
        .post("/neighbour/create-neighbour", {
          IdSpace: this.IdSpace,
        })
        .then(function (resopnse) {
          console.log(resopnse.data);
        })
        .catch((error) => console.log(error));

      await axios
        .put("/neighbour/update-list-address", {
          IdSpaceCurrent: this.IdSpace,
          IdSpaceNeighbour: this.idAddressFocus
        })
        .then(function (resopnse) {
          console.log(resopnse.data);
        })
        .catch((error) => console.log(error));

      alert("Tạo Đường thành công");

      // this.lisAddress.push([105.7456256341958, 10.085393780426026])
      // this.$forceUpdate();
      // this.tess = 1
    },
    showAddress(value, value1, op) {
      this.idAddressFocus = value1;
      if (this.ponitFocus) this.test.pop();
      this.ponitFocus = value;
      this.test.push(value[op]);
      console.log(value);
    },
  },
  mounted() {
    axios
      .get("/space-admin/get-all-space_admin")
      .then((response) => (this.lisAddress = response.data))
      .catch((error) => console.log(error));
    axios
      .get("/space-admin/get-all-space")
      .then((response) => (this.listAllAddress = response.data))
      .catch((error) => console.log(error));
  },
  setup() {
    const center = ref([105.748565, 10.085029]);
    const projection = ref("EPSG:4326");
    const zoom = ref(16);
    const rotation = ref(0);
    const radius = ref(10);
    const strokeWidth = ref(8);
    const strokeColor = ref("#66FFFF");
    const strokeColorAddress = ref("#000000");
    const strokeColorFocus = ref("red");

    const fillColor = ref("white");

    const drawEnable = ref(true);
    const drawType = ref("Point");

    const drawstart = (event) => {
      console.log(event);
    };

    const drawend = (event) => {
      console.log(event);
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
      radius,
      strokeWidth,
      strokeColor,
      strokeColorAddress,
      strokeColorFocus,
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
.mg__left__25px {
  margin-left: 25px;
}
</style>