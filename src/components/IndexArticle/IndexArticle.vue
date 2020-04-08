<template>
    <div>
        <div id="decorate">
            <svg id="header-decor" class="decor bottom" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path class="large left" d="M0 0 L50 50 L0 100" fill="rgba(255,255,255, .1)"></path>
                <path class="large right" d="M100 0 L50 50 L100 100" fill="rgba(255,255,255, .1)"></path>
                <path class="medium left" d="M0 100 L50 50 L0 33.3" fill="rgba(255,255,255, .3)"></path>
                <path class="medium right" d="M100 100 L50 50 L100 33.3" fill="rgba(255,255,255, .3)"></path>
                <path class="small left" d="M0 100 L50 50 L0 66.6" fill="rgba(255,255,255, .5)"></path>
                <path class="small right" d="M100 100 L50 50 L100 66.6" fill="rgba(255,255,255, .5)"></path>
                <path d="M0 99.9 L50 49.9 L100 99.9 L0 99.9" fill="rgba(255,255,255, .97)"></path>
                <path d="M48 52 L50 49 L52 52 L48 52" fill="rgba(255,255,255, .97)"></path>
            </svg>
        </div>
        <!--内容-->
        <div id="content">
            <div class="content-main">
                <ul class="content-main-left">
                    <li v-for="(v,i) in tableData" :key="i">
                        <router-link tag="div" to='/articleDetail' class="header-right">
                            <div class="pic"></div>
                            <div class="title">
                                <div class="t-bg"></div>
                                <p class="t t-1"><a href="/articleDetail" v-text="v.title"></a></p>
                                <p class="t t-2">发布时间：<span>{{v.date}}</span></p>
                                <p class="t t-3">浏览量：<span>{{v.readNum}}</span></p>
                            </div>
                            <div class="article">
                                <article style="overflow: hidden;max-height: 120px;" v-html="v.content">
                                   
                                </article>
                                <div class="more">
                                    <a href="/articleDetail">阅读全部</a>
                                </div>
                                <div class="comment">
                                    <a href="/articleDetail"><span>{{v.commentsNum}}</span>条评论</a>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <!--盒子装饰-->
        <div id="decorate2">
            <svg id="footer-decor" class="decor top" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path class="large left" d="M0 0 L50 50 L0 100" fill="rgba(255,255,255, .1)"></path>
                <path class="large right" d="M100 0 L50 50 L100 100" fill="rgba(255,255,255, .1)"></path>
                <path class="medium left" d="M0 0 L50 50 L0 66.6" fill="rgba(255,255,255, .3)"></path>
                <path class="medium right" d="M100 0 L50 50 L100 66.6" fill="rgba(255,255,255, .3)"></path>
                <path class="small left" d="M0 0 L50 50 L0 33.3" fill="rgba(255,255,255, .5)"></path>
                <path class="small right" d="M100 0 L50 50 L100 33.3" fill="rgba(255,255,255, .5)"></path>
                <path d="M0 0 L50 50 L100 0 L0 0" fill="rgba(255,255,255, .97)"></path>
                <path d="M48 48 L50 51 L52 48 L48 48" fill="rgba(255,255,255, .97)"></path>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IndexArticle',

    data () {
        return {
            tableData:[]
        }
    },
    
    mounted() {
        this.requestTableData()
    },
    
    methods: {
        requestTableData(){
            let postData = {keyword:""}

            this.$axios.post("/api/search",postData).then((res)=>{
                console.log(res);
                
                if (res.data.code === 0) {
                    this.$message.error(res.data.msg || "加载初始数据失败");
                    return;
                }
                this.tableData = res.data.data
            })
        }
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>

/*decorate*/
#decorate{
    position: relative;
    top: 1px;
    width: 100%;
    height: 200px;
    margin-top: -60px;
    svg{
        display: block;
        width: 100%;
        height: 100%;
    }
}

/*content*/
#content{
    overflow: hidden;
    position: relative;
    width: 100%;
    background: linear-gradient(90deg,rgba(255,255,255,0.8) 0,rgba(255,255,255,0.97) 5%,rgba(255,255,255,0.97) 95%,rgba(255,255,255,0.8) 100%);
    .content-main{
        position: relative;
        width: 1000px;
        //height: 2000px;
        padding-top: 70px;
        margin: 0 auto;
        ul.content-main-left{
            width: 100%;
            li{
                position: relative;
                top:0;
                width: 100%;
                height: 300px;
                border-radius: 5px;
                margin:0 auto 200px;
                background-color: #fff;
                transition: box-shadow .3s,top .3s;
                .pic{
                    overflow: hidden;
                    position: absolute;
                    z-index: 2;
                    top: -50px;
                    left: 50px;
                    width: 150px;
                    height: 180px;
                    border-radius: 8px;
                    background:url("../../assets/images/bg/2.jpg") center center/cover;
                }
                .title{
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                    height: 150px;
                    border-radius: 5px;
                    .t-bg{
                        position: absolute;
                        z-index: 1;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.6) 80%,rgba(255,255,255,1) 100%);
                    }
                    .t{
                        position: relative;
                        z-index: 2;
                        margin: 7px 0 7px 250px;
                        color: #fff;
                        text-shadow: 1px 1px 3px #999;
                    }
                    .t-1{
                        padding-top: 15px;
                        font-size: 22px;
                        font-weight: bolder;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        a{
                            color: #fff;
                            transition: color .2s;
                            &:hover{
                                color: #ddd;
                            }
                        }
                    }
                }
                .article{
                    position: relative;
                    width: 92%;
                    height: 150px;
                    padding: 0 4%;
                    p{
                        overflow: hidden;
                        width: 100%;
                        height: 90px;
                        text-indent: 2em;
                        font-size: 16px;
                        line-height: 30px;
                        color: rgba(0, 0, 0, .6);
                        text-shadow: 1px 1px 1px #ddd;
                    }
                    .more{
                        position: absolute;
                        left: 30px;
                        bottom: 15px;
                        cursor: pointer;
                        a{
                            display: block;
                            color: #fff;
                            padding: 5px 20px;
                            height: 20px;
                            line-height: 20px;
                            background-color: #bebbaa;
                            border-radius: 20px;
                            &:hover{
                                color: #ddd;
                            }
                        }
                    }
                    .comment{
                        position: absolute;
                        right: 30px;
                        bottom: 15px;
                        a{
                            height: 30px;
                            line-height: 30px;
                            color: #999;
                            span{
                                color: #f00;
                            }
                        }
                    }
                }
                &.right{
                    .pic{
                        left: auto;
                        right: 50px;
                    }
                    .title .t{
                        margin-left: 80px;
                    }
                }
                &:hover{
                    top: -2px;
                    box-shadow: 2px 2px 3px #999;
                }
            }
        }
    }
}

/*decorate2*/
#decorate2{
    position: relative;
    width: 100%;
    height: 200px;
    svg{
        display: block;
        width: 100%;
        height: 100%;
    }
}

</style>
