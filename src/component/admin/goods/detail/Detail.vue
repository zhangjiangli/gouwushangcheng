<template>
    <div class="detail">

        <div>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">购物商城</el-breadcrumb-item>
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 表单 -->

        <el-form class="detail_form" ref="form" :model="form" label-width="80px" size="small" label-position="left">
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="form.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="所属类别">
                <el-select v-model="form.category_id" placeholder="请选择类别">
                    <!-- <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            <el-option label="区域三" value="beijing"></el-option>
                             -->
                    <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <!-- option里面可以加标签覆盖label文本, 但是label属性还得必须要, 不然会报错 -->
                        <span>
                            <!-- 子级分类才有的图标 -->
                            <span v-if="item.class_layer!=1">|-</span>
                            <span>{{item.title}}</span>
                        </span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">

                <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="form.is_hot" active-text="推荐"></el-switch>

            </el-form-item>
            <el-form-item label="上传封面">
                <!-- action用来设置上传接口, list-type用来设置文件列表样式 -->
                <!-- file-list用来设置文件列表的数据, 我们每上传成功一个文件, 就要给这个列表数据push上传后的信息, 然后列表就会展示出来 -->
                <!--:on-success是上传成功后的钩子函数  -->
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="form.imgList" list-type="picture" :on-success="uploadImg">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传附件">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile" multiple :limit="3" :file-list="form.fileList" :on-success="uploadFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品货号">
                <el-input v-model="form.goods_no"></el-input>
            </el-form-item>
            <el-form-item label="库存数量">
                <el-input v-model="form.stock_quantity"></el-input>
            </el-form-item>
            <el-form-item label="市场价格">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>
            <el-form-item label="销售价格">
                <el-input v-model="form.sell_price"></el-input>
            </el-form-item>
            <el-form-item label="内容摘要">
                <el-input :rows="5" type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>
            <el-form-item label="详细内容">
                <quill-editor v-model="form.content">xgdxh</quill-editor>
            </el-form-item>

            <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">保存提交</el-button>
                <el-button type="danger" @click="$router.go(-1)">返回上一页</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
//引入富组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            //表单数据
            form: {},

            //分类列表数据
            category: [],

            //页面一上来要从url里面拿到被编辑的商品id $route是指路由路径 $router是指路由实体
            id: this.$route.params.id

        }
    },


    methods: {
        //获取商品数据
        getGoods() {
            this.$http.get(this.$api.gsDetail + this.id).then(res => {
                if (res.data.status == 0) {
                    this.form = res.data.message;
                }
            })
        },
        //获取商品列表分类数据
        getCategory() {
            this.$http.get(this.$api.ctList + 'goods').then(res => {
                if (res.data.status == 0) {
                    //将返回的数据存到一个空的数组中
                    this.category = res.data.message;

                    //为了让分类列表默认正确显示,把商品category_id的数据类型改为number
                    this.form.category_id = +this.form.category_id;
                }
            })
        },

        //上传封面(封面只能上传一张)
        uploadImg(data) {
            this.form.imgList = [data];
        },

        //上传附件
        uploadFile(data) {
            this.form.fileList.push(data);
        },
        //保存提交
        onSubmit() {
            //
            this.$http.post(this.$api.gsEdit + this.id, this.form).then(res => {
                if (res.data.status == 0) {
                    this.$alert('数据修改成功');
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    //在页面一加载时候获取数据 填到编辑页面上
    created() {
        this.getGoods();
        //获取列表分类的数据
        this.getCategory();
    }

}
</script>

<style scoped lang="less">
.detail {
    &_form {
        margin-top: 30px;
        width: 700px;
    }
}
</style>