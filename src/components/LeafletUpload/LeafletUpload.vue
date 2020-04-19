<template>
  <div >
        <div class="pro_con pub_sty">
            <h3 class="content_title">
                项目红线
            </h3>
            <ul class="pro_filer">
                <el-upload
                    :action="uploadURL"
                    
                    list-type="picture-card"
                    ref="redlineUpload"
                    :accept="acceptFileType"
                    :before-upload="redlineBeforeUpload"
                    :limit="1"
                    :file-list="redlineFileList"
                    :on-success="redlineFileSuccess"
                    :on-error="uploadError"
                    :auto-upload="true">
                    <!--<i slot="default" class="el-icon-plus"></i>-->
                    <div slot="file" slot-scope="data">
                        <div  class="el-upload-list__item-thumbnail"></div>					     
                        <span class="el-upload-list__item-actions">
                        <span
                            class="el-upload-list__item-delete"
                            @click="handleRemove('redline',data.file)"
                        >
                        </span>
                        </span>
                        <p>{{data.file.name}}</p>
                    </div>
                </el-upload>
            </ul>
        </div>
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
            uploadURL:"/api/uploadRedline/redline",
            acceptFileType: '.zip',
			redlineFileList: [], //红线文件列表
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
        },
        redlineBeforeUpload: function(file){	//红线上传前				
            this.beforeUpload(file);
        },
        beforeUpload: function(file){			
            var that=this;
            //文件类型
            var fileName=file.name.substring(file.name.lastIndexOf('.')+1);
            if(fileName!='zip'){
                //that.uploadTemplateDialog=false;
                that.$message({
                    type:'error',
                    showClose:true,
                    duration:3000,
                    message:'文件类型不是.zip文件!'
                });
                return false;
            }
            //读取文件大小
            var fileSize=file.size;
            console.log(fileSize);
            if(fileSize > 1048576 * 50){
                //that.uploadTemplateDialog=false;
                that.$message({
                    type:'error',
                    showClose:true,
                    duration:3000,
                    message:'文件大于50M!'
                });
                return false;
            }
        },
        redlineFileSuccess: function(response, file, fileList){ //红线上传成功
            var features = response.features;
            // this.redlineLoading = false;
            // this.redlineDisabled = false;
            // this.redlineUploadNotShow = true;
            
            features = this.showRedline(file.name,features);
            
            //保存到服务器
            this.saveRedline(file.name, this.mapConfig.ID, features);
        },
        //显示红线
        showRedline(fileName,features){
            var errorData = false;
            for(var i = 0;i < features.length;i++){
                var WKT = features[i].Geom;
                if(!WKT){
                    WKT = features[i].WKT;
                }
                if(WKT.toLowerCase().indexOf("polygon") == -1){
                    errorData = true;	
                }
            }		
            if(errorData){
                alert("数据类型错误，请检查数据！");
                return;
            }
            var lyr = L.featureGroup([]).addTo(map);
            
            for(var i = 0;i < features.length;i++){
                var WKT = features[i].Geom;
                if(!WKT){
                    WKT = features[i].WKT;
                }
                try{
                    
                    if(WKT.indexOf("MULTI") != -1){
                        var nwkt = "MULTIPOLYGON(((";
                        var tWKT = WKT.substring(15,WKT.length - 3);
                        if(tWKT.substring(0,1) == "("){
                            tWKT = WKT.substring(16,WKT.length - 3);
                            nwkt = "MULTIPOLYGON (((";
                        }
                        WKT = tWKT;
                        var awkt = WKT.split(")),((");
                        for(var j = 0;j < awkt.length;j++){
                            var wk = awkt[j];
                            var pwk = wk.split("),(");
                            if(j != 0){
                                nwkt += ")),((";
                            }
                            for(var k = 0;k < pwk.length;k++){
                                var pk = pwk[k];
                                var coords = pk.split(",");
                                if(k != 0){
                                    nwkt += "),(";
                                }
                                for(var m = 0;m < coords.length;m++){
                                    var coord = coords[m].split(" ");
                                    if(m != 0){
                                        nwkt += ",";
                                    }
                                    nwkt += coord[0] + " " + coord[1];
                                }

                            }
                            

                        }
                        nwkt += ")))";
                        WKT = nwkt;
                    }else{
                        var nwkt = "POLYGON((";
                        var tWKT = WKT.substring(9,WKT.length - 2);
                        if(tWKT.substring(0,1) == "("){
                            tWKT = WKT.substring(10,WKT.length - 2);
                            nwkt = "POLYGON ((";
                        }
                        WKT = tWKT;
                        var coords = WKT.split(",");
                        for(var m = 0;m < coords.length;m++){
                            var coord = coords[m].split(" ");
                            if(m != 0){
                                nwkt += ",";
                            }
                            nwkt += coord[0] + " " + coord[1];
                        }
                        nwkt += "))";
                        WKT = nwkt;
                    }
                    features[i].Geom = WKT;
                    features[i].WKT = WKT;
                
                    var fea = omnivore.wkt.parse(WKT);
                    fea.setStyle({
                        color: 'red',
                        opacity: 1,
                        fillColor: 'red',
                        fillOpacity: 0.1,
                        weight: 2
                    });
                    lyr.addLayer(fea);	
                }catch(e){
                    
                }
            }
            try{
                var bounds = lyr.getBounds();
                map.fitBounds(bounds);	
            }catch(e){}					
            VueObj.fileFeatures[fileName] = lyr;
            return features;
        },
        showRedlineList: function(files){  //显示红线文件列表
            var that=this;
            var u = that.$refs.redlineUpload;
            u.uploadFiles = files;
            // if(files.length > 0){
            //     this.redlineDisabled = true;
            //     this.redlineUploadNotShow = true;
            // }
        },
        saveRedline(fileName, mapID, features){
            var url = 'api/map/redlines';	
            var data = [];

            for(var i = 0;i < features.length;i++){
                
                data.push({
                    MCID: mapID,
                    FileName: fileName,
                    LayerName: features[i].Layer,
                    WKT: features[i].Geom
                });
            }
            var method = 'post';
            $.ajax({
                type: method,
                url: url,
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
                success: function (d) {
                    if(d.code == 1){
                        VueObj.$message('上传成功！');
                    } else {
                        VueObj.$message('上传失败！');
                    }
                },
                fail: function(d){
                    VueObj.buildingLoading = false;
                }
            });
        },
        uploadError: function(){  //文件上传失败
            /* this.buildingLoading = false;
            this.buildingDisabled = false;
            this.vectorLoading = false;
            this.vectorDisabled = false;
            this.redlineLoading = false;
            this.redlineDisabled = false; */
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
    height 40vh
</style>
