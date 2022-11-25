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
  </ol-map>
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
      tess: null,
      listPoint: [],
    };
  },
  methods: {},
  mounted() {
    axios
      .get("/space-admin/get-all-space_admin")
      .then((response) => (this.lisAddress = response.data))
      .catch((error) => console.log(error));
    axios
      .get("/location/get-all-location-point")
      .then((response) => (this.listPoint = response.data))
      .catch((error) => console.log(error));
  },
  setup() {
    const center = ref([105.748565, 10.085029]);
    const projection = ref("EPSG:4326");
    const zoom = ref(16);
    const rotation = ref(0);
    const radius = ref(10);
    const strokeWidth = ref(4);
    const strokeColorAddress = ref("#FF9999");
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
</style>