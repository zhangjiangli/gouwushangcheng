<template>
    <div class="list">
        <!--面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">购物商城</el-breadcrumb-item>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="btnBox" style="margin: 30px;">
            <el-button class="el-icon-plus" size="small" type="success" plain> 新增</el-button>
            <el-button class="el-icon-check" size="small" type="primary" plain @click="all"> 全选</el-button>
            <el-button class="el-icon-delete" size="small" type="warning" plain @click="del"> 删除</el-button>

            <el-input class="btnBox_input" placeholder="请输入搜索内容" suffix-icon="el-icon-search" v-model="apiQuery.searchValue" @blur="search">
            </el-input>
        </div>
        <div>

            <el-table class="myTable" @selection-change="change" ref="multipleTable" :data="tableData3" :border="true" tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column label="标题" width="430">
                    <template slot-scope="scope">
                        <!-- <router-link :to="{name:'goodsDetail'}">{{scope.row.title}}</router-link> -->
                        <el-popover trigger="hover" placement="right">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>住址: {{ scope.row.address }}</p>
                            <div slot="reference" class="name-wrapper">
                                <router-link :to="{path:`/admin/goods/detail/${scope.row.id}`}">{{scope.row.title}}</router-link>
                            </div>
                        </el-popover>
                    </template>

                </el-table-column>
                <el-table-column prop="categoryname" label="所属类别" width="100">
                </el-table-column>
                <el-table-column prop="stock_quantity" label="库存" width="80">
                </el-table-column>
                <el-table-column prop="market_price" label="市场价" width="80">
                </el-table-column>
                <el-table-column prop="sell_price" label="销售价" width="80">
                </el-table-column>
                <el-table-column prop="name" label="属性" width="100" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span :class="['el-icon-picture-outline','scope.row.is_slide == 1'?'active': '']" class="el-icon-picture"></span>
                        <span :class="['el-icon-upload', scope.row.is_top == 1? 'active': '']"></span>
                        <span :class="['el-icon-star-on', scope.row.is_hot == 1? 'active': '']"></span>

                    </template>
                </el-table-column>
                <el-table-column prop="name" label="操作" width="80">
                    <template slot-scope="scope">
                        <!-- <router-link :to="{name:'goodsDetail'}">修改</router-link> -->
                        <router-link :to="{path:`/admin/goods/detail/${scope.row.id}`}">修改</router-link>
                    </template>
                </el-table-column>

            </el-table>

        </div>

        <!-- 分页 -->

        <el-pagination class="fenye" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="apiQuery.pageIndex" :page-sizes="[6,8,10,12]" :page-size="apiQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="apiQuery.total">
        </el-pagination>

    </div>
</template>

<script>
export default {
    data() {
        return {

            //搜索
            apiQuery: {
                pageIndex: 1,
                pageSize: 10,
                searchValue: '',

                total: 0,
            },
            //被选中的商品
            selectedGoodslist: [],

            //表格数据
            tableData3: [],

            //分页

        }
    },

    methods: {
        search() {
            this.getGoodsData()
        },
        getGoodsData() {
            let api = `${this.$api.gsList}?pageIndex=${this.apiQuery.pageIndex}&pageSize=${this.apiQuery.pageSize}&searchvalue=${this.apiQuery.searchValue}`
            this.$http.get(api).then(res => {
                if (res.data.status == 0) {
                    console.log(res.data.message);
                    this.tableData3 = res.data.message;
                    // 把后端接口返回的数量总量赋值给分页组件使用
                    this.apiQuery.total = res.data.totalcount;
                } else {
                    console.log("err");
                }
            })
        },

        //将选中的用空数组存起来
        change(selection) {
            this.selectedGoodslist = selection;
        },
        //点击删除按钮
        del() {
            //提取所有被选中商品的id
            let delIds = this.selectedGoodslist.map(v => v.id);
            //请求删除数据接口
            this.$http.get(this.$api.gsDel + delIds).then(res => {
                //删除后重新渲染数据
                if (res.data.status == 0) {
                    this.getGoodsData();
                }
            })
        },
        /* toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }, */
        //全选按钮
        all() {
            //点击全选按钮时候相当于表头中的全选执行了click事件
            document.querySelector('.el-checkbox__original').click();
        },
        //分页 
        // 监听每页数量变更事件
        handleSizeChange(size) {
            // console.log(`每页 ${val} 条`);
            this.apiQuery.pageSize = size;
            this.getGoodsData();
        },
        //监听页码变化事件
        handleCurrentChange(page) {
            // console.log(`当前页: ${val}`);
            this.apiQuery.pageIndex = page;
            //表格数据重新渲染
            this.getGoodsData();
        }

    },
    created() {
        this.getGoodsData();
    },

}
</script>

<style scoped lang="less">
.list {
    .btnBox {
        text-align: left;
        line-height: 0;
        &_input {
            position: relative;
            float: right;
            width: 160px;
        }
    }
    .fenye {
        margin-top: 20px;
    }
}




.el-icon-search {
    position: absolute;
    right: 20px;
}

.el-table-column {
    height: 20px;
}

.myTable {
    text-align: left;
}
// 添加icon点亮的样式
[class^=el-icon].active{
    color: #000;
    font-weight: bold;
}
</style>