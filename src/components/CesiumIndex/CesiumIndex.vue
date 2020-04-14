<template>
    <div>
        <div id="cesiumContainer"></div>  
        <CesiumMenu class="cesium-menu"></CesiumMenu>
    </div>
    
</template>

<script>
import CesiumMenu from '../CesiumMenu/CesiumMenu'
let Cesium = require('cesium/Cesium');
export default {
    name: 'CesiumIndex',
    components:{
        CesiumMenu,
    },

    data () {
        return {
            viewer:null
        }
    },
    created() {
        
    },
    mounted() {
        this.$nextTick(()=>{
            this.initCesium()
            this.addImageryProvider()
            this.addTerrainProvider()
            //this.lookAtMtEverest()
            this.addThreeDTiles()
        })
    },
    methods: {
        initCesium(){
           Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMGY0MGM3My1hMDYzLTRhMzItYTIyNy0zMWFhNzNjNGUzMTQiLCJpZCI6ODQyOCwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIl0sImlhdCI6MTU1MTkzNzE4NX0.7-Db_DwQ5_CLOhfmawTHgy36O4cwnZ0UEQvJPtsiE3k";
    
            let viewer = new Cesium.Viewer('cesiumContainer',{
                animation: false, //是否显示动画控件(左下方那个)
                baseLayerPicker: false, //是否显示图层选择控件
                geocoder: false, //是否显示地名查找控件
                timeline: false, //是否显示时间线控件
                sceneModePicker: false, //是否显示投影方式控件
                navigationHelpButton: false, //是否显示帮助信息控件
                infoBox: true, //是否显示点击要素之后显示的信息
                });
            this.viewer = viewer
        },
        addTerrainProvider(){
            // let terrainProvider = new Cesium.CesiumTerrainProvider({
            //     url:""
            // })
            let worldTerrain = Cesium.createWorldTerrain({
                requestWaterMask: true,
                requestVertexNormals: true
            })
            
            this.viewer.terrainProvider = worldTerrain;
            //开启 光照
            //this.viewer.scene.globe.enableLighting = true;
        },
        lookAtMtEverest() {
            var target = new Cesium.Cartesian3(300770.50872389384, 5634912.131394585, 2978152.2865545116);
            var offset = new Cesium.Cartesian3(6344.974098678562, -793.3419798081741, 2499.9508860763162);
            this.viewer.camera.lookAt(target, offset);
            this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        },
        addTile(){
            //添加瓦片
            let tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                url: url, //数据路径
                maximumScreenSpaceError: 2, //最大的屏幕空间误差
                maximumNumberOfLoadedTiles: 1000, //最大加载瓦片个数
                modelMatrix: m //形状矩阵
            }));
        },
        addThreeDTiles(){
            let tileset = new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(40866)
            });

            this.viewer.scene.primitives.add(tileset);
            this.viewer.zoomTo(tileset);
        },
        addImageryProvider(){
            //有标注的 天地图，注意，url一定要带上'tk=4c52f8454299556d5e3797f113455eee'
            let my_layer = this.viewer.imageryLayers.addImageryProvider(
                new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&tk=4c52f8454299556d5e3797f113455eee&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",

                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                show: false,
            }));
        }
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
#cesiumContainer
    width 100%
    height 100vh
.cesium-menu
    position absolute
    top 30px
    left 30px
    z-index 40

</style>
