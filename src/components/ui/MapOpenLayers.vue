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

    <!-- <ol-overlay :position="[105.748565, 10.085029]">
        <template v-slot="slotProps">
            <div class="overlay-content">
                Hello world!<br>
                Position: {{ slotProps.position }}
            </div>
        </template>
    </ol-overlay> -->

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

    <!-- Điểm trên bản đò -->

    <!-- <ol-vector-layer>
        <ol-source-vector>
            <ol-feature>
                <ol-geom-multi-point :coordinates="[test]"></ol-geom-multi-point>
                <ol-style>
                    <ol-style-circle :radius="radius">
                        <ol-style-fill :color="fillColor"></ol-style-fill>
                        <ol-style-stroke :color="strokeColor" :width="strokeWidth"></ol-style-stroke>
                    </ol-style-circle>
                </ol-style>
            </ol-feature>
        </ol-source-vector>
    </ol-vector-layer> -->



    <!-- <ol-webglpoints-layer :style="webglPointsStyle">
      <ol-source-webglpoints />
    </ol-webglpoints-layer> -->

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-line-string
            :coordinates="[
test
            ]"
          ></ol-geom-multi-line-string>
          <ol-style>
            <ol-style-stroke
              :color="strokeColor"
              :width="strokeWidth"
            > </ol-style-stroke>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
  <div>
    asadsa {{test}}
  </div>
</template>

 
<script>
import { ref } from "vue";
export default {
  data() {
    return {
      test: []
    }
  },
  methods: {
    draTest(event) {
      console.log(event.target.sketchCoords_);
      this.test.push(event.target.sketchCoords_);
      // return event.target.sketchCoords_;
    },
  },
  setup() {
    const center = ref([105.748565, 10.085029]);
    const projection = ref("EPSG:4326");
    const zoom = ref(16);
    const rotation = ref(0);
    const radius = ref(10);
    const strokeWidth = ref(6);
    const strokeColor = ref("red");
    const fillColor = ref("white");

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
      fillColor
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