<template>
  <GoogleMap api-key="AIzaSyDHLHpUVR6850QajwNW4NjKJc9K4_QZQIg" style="width: 100%; height: 500px" :center="center" :zoom="16">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 10.085329, lng: 105.748565 };

    return { center };
  },
});
</script>

// AIzaSyBNHFac4c3LRNzl29s4RyFhKPCli3sfNDo
