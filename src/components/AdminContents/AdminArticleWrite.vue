<template>
    <div>
        <div class="input-block">
            <div class="input-block-lable"> 文章标题 </div>
            <div class="input-block-value">
                <el-input
                    placeholder="输入文章标题"
                    v-model="articleTitle"
                    clearable></el-input>
            </div>
        </div>

        <div class="input-block">
            <div class="input-block-lable"> 输入标签 </div>
            <div class="input-block-value">
                <el-tag
                class="input-tag"
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
                </el-tag>

                <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">添加新标签</el-button>
            </div>
        </div>

        <div class="input-block">
            <div class="input-block-lable"> 原文地址 </div>
            <div class="input-block-value">
                <el-input placeholder="请输入内容" v-model="srcArticleUrl">
                    <template slot="prepend">Http://</template>
                </el-input>
            </div>
        </div>

        <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    name: '',
    components: {
        quillEditor
    },
    data () {
        return {
            articleTitle:"",
            content:'',
            //富文本配置文件
            editorOption:{
                action:"/api/images/article",//图片上传的服务器地址
                methods: 'post',
                name:"upload_file",//上传的名字？¿¿
                accept:'multipart/form-data, image/png, image/gif, image/jpeg, image/bmp, image/x-icon,image/jpg'//可选 可上传的图片格式
            },
            srcArticleUrl:"",//原文地址
            dynamicTags:[],//标签数组
            inputVisible: false,
            inputValue: '',
        }
    },

    methods: {
        submit(e){
            console.log(this.$refs.text.value)
            let postData = {
                title : this.articleTitle
                ,articleurl:this.srcArticleUrl
                ,tags : this.dynamicTags
                ,content : this.$refs.text.value
            };
            console.log(postData)
            this.$axios
            .post("/api/article", postData)
            .then(res => {
                console.log(res.data.code);

                if (res.data.code === 1) {
                    this.$message({
                        message: "恭喜你，发表成功",
                        type: "success"
                    });
                    return;
                }
                this.$message.error(res.data.msg || "发表失败");
            });
                    return false;
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    .myQuillEditor{
        min-height 500px
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        min-height: 420px;
    }

    .input-block
        display flex
        align-items center
        margin-bottom 10px
        .input-tag
            margin-right 8px
        .input-block-lable
            padding-right  30px
            width 100px
            height 40px
            line-height 40px
        .input-block-value
            margin-right 10px
</style>
