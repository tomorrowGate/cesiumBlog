<template>
    <div>
        <el-container>
            <el-header class="index-head-out">
                <IndexHead class="index-head"/>
            </el-header>
            <el-container>
                <el-aside class="index-aside">
                    <AdminSlide/>
                </el-aside>
                <el-container>
                <el-main>
                    <router-view></router-view>
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
import IndexHead from "../IndexHead/IndexHead";
import AdminSlide from "../AdminSlide/AdminSlide";
import BlogFooter from "../BlogFooter"
export default {
    name: 'AdminIndex',
    components:{
        BlogFooter,
        AdminSlide,
        IndexHead
    },

    data () {
        return {
        }
    },

    methods: {}
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
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
