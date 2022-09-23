<template>
    <div id="map" style="width: 100%; height: 550px;" ></div>
</template>
 
<script>
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
 
export default {
    mounted() {
        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [11771900, 1128430],
                zoom: 16
            })
        })
    }
}
</script>