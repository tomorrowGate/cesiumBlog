<template>
    <div>
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180"
            column-key="date"
            />
            <el-table-column
            prop="author"
            label="姓名"
            width="180"/>
            <el-table-column
            prop="title"
            label="文章标题"/>
            <el-table-column
            prop="tags"
            label="标签"
            width="100"
            >
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.tags === 'test' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tags}}</el-tag>
            </template>
            </el-table-column>

            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="mini"
                    @keyup.enter.native="requestTableData()"
                    placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row,tableData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'AdminArticleList',

    data () {
        return {
            tableData: [],
            search:"",//搜索框的数据
        }
    },

    created() {
        
    },

    mounted() {
        this.requestTableData()
    },

    methods: {
        resetDateFilter() {
            this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row,table) {
            console.log(index, row);
            let postData = {_id:row._id}

            this.$axios.post("/api/delete",postData).then((res)=>{
                console.log(res);
                if (res.data.code === 0) {
                    this.$message.error(res.data.msg || "删除失败");
                    return;
                }
                table.splice(index, 1);
            })
        },
        requestTableData(){
            let postData = {keyword:this.search}

            this.$axios.post("/api/search",postData).then((res)=>{
                console.log(res);
                
                if (res.data.code === 0) {
                    //如果登录失败 弹出失败提示
                    this.$message.error(res.data.msg || "查询失败");
                    return;
                }
                this.tableData = res.data.data
            })
        }
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>
