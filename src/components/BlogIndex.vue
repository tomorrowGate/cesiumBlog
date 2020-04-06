<template>
    <div>
        <BgCanvas />
        
        <el-container>
            <el-header class="index-head-out">
                <IndexHead class="index-head"/>
            </el-header>
            <el-container>
                <el-aside class="index-aside">
                    <router-view></router-view>
                    <IndexSlideBar class="index-slideBar"/>
                </el-aside>
                <el-container>
                <el-main>
                    <IndexArticle/>
                </el-main>
                <el-footer>
                     <BlogFooter/>
                </el-footer>
                </el-container>
            </el-container>
        </el-container>
        
       
    </div>
</template>

<script>
import BgCanvas from "./BgCanvas";
import IndexHead from "./IndexHead/IndexHead";
import IndexSlideBar from "./IndexSlideBar/IndexSlideBar";
import IndexArticle from "./IndexArticle/IndexArticle";
import BlogFooter from "./BlogFooter"
export default {
    name: "BlogIndex",
    components:{
        BgCanvas,
        BlogFooter,
        IndexArticle,
        IndexSlideBar,
        IndexHead
    },
    data() {
        return {};
    },

    methods: {},
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.index-head-out
    padding 0
    .index-head
        position fixed
        width 100%
        z-index 3
.index-aside
    width 300px
    .index-slideBar
        position:fixed;
        left:0;
        width:300px;
    
</style>
