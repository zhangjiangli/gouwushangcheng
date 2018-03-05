<template>
    <div class="admin">
        <!-- 公共部分 -->
        <el-container class="admin_con">
            <el-aside width="200px">
                <app-aside>
                    
                </app-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <app-header></app-header>
                </el-header>
                <el-main>
                    
                      <router-view></router-view>  
                </el-main>
            </el-container>
        </el-container>

        <!-- <app-header></app-header>
                        <app-aside></app-aside>
                        
                        <router-view></router-view> -->
    </div>
</template>

<script>
import Header from './subcom/Header.vue';
import Aside from './subcom/Aside.vue';

// import Shopcart from '../admin/shopcart/Shopcart.vue';



export default {
    //注册子组件
    components: {
        appHeader: Header,
        appAside: Aside,
        
    }
}
</script>

<style scoped lang="less">
.admin {
    height: 100%;

    &_con {
        height: 100%!important;


        .el-header,
        .el-footer {
            background-color: #B3C0D1;

            color: #333;
            text-align: right;
            // line-height: 60px;
        }

        .el-aside {
            background-color: #D3DCE6;
            color: #333;
            text-align: center;
            // line-height: 200px;
        }

        .el-main {
            background-color: #E9EEF3;
            color: #333;
            // text-align: center;
            // line-height: 160px;
        }
    }
    /* body>.el-container {
        // margin-bottom: 40px;
        height: 100%!important;
        .admin_con{
            height: 100%;
        }
    } */
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
}
</style>