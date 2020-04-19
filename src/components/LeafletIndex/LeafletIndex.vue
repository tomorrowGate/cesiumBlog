<template>
  <div >
      <div id="map"></div>
  </div>
</template>

<script>
import L from "leaflet";

import "leaflet/dist/leaflet.css";
export default {
    name: 'LeafIndex',

    data () {
        return {
            map:null,
            mapLayer:null,
            zoom:10,
            center:[29.0252, 118.88940],
            v_TiandituSLLabelPath:"http://t{s}.tianditu.gov.cn/cva_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=c&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=e4df97a35d629ba51376541018624b95",
            v_TiandituYXLabelPath:"http://t{s}.tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=e4df97a35d629ba51376541018624b95",
            v_TiandituYXPath:"http://t{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=87c942f4f4a2b17270f52f797df4537c",
        }
    },

    methods: {
        initMap() {
            let _this= this
            let map = L.map("map", {
                minZoom: 9,
                maxZoom: 19,
                center: _this.center,
                zoom: 10,
                zoomControl: false,
                attributionControl: false,
                crs: L.CRS.EPSG3857,
                editable: true,
                doubleClickZoom:false
            });
            this.map = map;　　　
            this.mapLayer = new L.featureGroup().addTo(map);　
            L.tileLayer(
                "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
            ).addTo(map);
        },
        addWms(){
            let map = this.map
            let wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/map/wms?', {
                layers: 'map:building_hq',
                crs:L.CRS.EPSG3857,
                minZoom: 9,
                maxZoom: 19,
                format:'image/png',//背景变成透明的
                transparent:true
            }).addTo(map);
        }
    },
    mounted(){
        this.initMap()
        this.addWms()
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
#map
    width 100%
    height 100vh
</style>
