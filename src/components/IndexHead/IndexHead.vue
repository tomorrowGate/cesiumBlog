<template>
    <div>
        <el-menu
        :default-active="activeIndex2"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#35585a"
        text-color="#fff"
        active-text-color="#ffd04b">
            <el-menu-item index="1" class="logo">
                <div id="blogger">
                    <div class="pic"><a href=""></a></div>
                </div>
            </el-menu-item>
            <el-menu-item index="2">处理中心</el-menu-item>
            <el-submenu index="3">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="4" disabled>消息中心</el-menu-item>
            <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>

            
            <el-submenu index="6" class="head-last-item">
                <template slot="title">个人中心</template>
                <el-menu-item index="2-1" >
                    <router-link to="/login">登录/注册</router-link> 
                </el-menu-item>
                <el-menu-item index="2-2" @click="loginOut">退出登录</el-menu-item>
                <el-menu-item index="2-3" @click="aboutme">
                    <router-link to="/aboutme">关于大帅哥</router-link> 
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'IndexHead',

    data () {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        }
    },

    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        loginOut(){

        },
        aboutme(){
            
        }
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.logo
    padding 0
/*blogger*/
#blogger{
    width: 130px;
    height: 100%;
    margin: 0 auto;
    .pic{
        width: 100%;
        height: 100%;
        background: url("../../assets/images/bg/4.jpg") no-repeat center center/contain;
        a{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
.el-menu
    .head-last-item
        float right
</style>
