<!-- zion首页 -->
<template>
    <div>
        <topBar @showLeft="showSelf" />
        <zion-menu ref="cliCatalog"></zion-menu>
        <zion-catalog  v-show="catalogShow"></zion-catalog>
        <zion-self v-show="selfShow"></zion-self>
    </div>
</template>


<script>
import menu from '../components/navigation.vue';
import catalog from './Catalog.vue';
import aboutMe from './AboutMe.vue';
import topBar from '../components/top-bar.vue'

    export default {
        name:'zion',
        data() { //选项 / 数据
            return {
                catalogShow : false,
                selfShow : true
            }
        },
        methods: { //事件处理器
            showCatalog(){
                this.catalogShow = !this.catalogShow;
                if(this.catalogShow){
                    this.selfShow = false;
                }
                this.$refs.cliCatalog.folderOpenClose('catalog');
            },
            showSelf(){
                this.selfShow = !this.selfShow;
                if(this.selfShow){
                    this.catalogShow = false;
                }
                this.$refs.cliCatalog.folderOpenClose('home');
            },
            goHome(){
                this.$router.push({
                    path: '/',
                });
            },
        },
        components: { //定义组件
            'zion-menu':menu,
            'zion-catalog':catalog,
            'zion-self':aboutMe,
            'topBar':topBar
        },
        created() { //生命周期函数

        }
    }
</script>

<style>

    .background{
        width: 100%;
        height: 100%;
        background: #193, 228, 224;
    }

    /**导航条 */
    .bar-but-home {
        position: absolute;
        left: 55px;
        height: 35px;
        line-height: 35px;
        color: white;
        font-family: fantasy;
        font-size: 25px;
        cursor: pointer;
    }
</style>
