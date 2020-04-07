<template>
    <div id="cesiumContainer">
       
    </div>
</template>

<script>

let Cesium = require('cesium/Cesium');
export default {
    name: 'CesiumIndex',
    components:{
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
        })
    },
    methods: {
        initCesium(){
           Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMGY0MGM3My1hMDYzLTRhMzItYTIyNy0zMWFhNzNjNGUzMTQiLCJpZCI6ODQyOCwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIl0sImlhdCI6MTU1MTkzNzE4NX0.7-Db_DwQ5_CLOhfmawTHgy36O4cwnZ0UEQvJPtsiE3k";
    
            let viewer = new Cesium.Viewer('cesiumContainer');
            this.viewer = viewer
        }
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
#cesiumContainer
    width 100%
    height 100vh
</style>
