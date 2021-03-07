<!-- zion首页 -->
<template>
    <div>
        <zion-menu></zion-menu>
        <zion-catalog v-show="catalogShow"></zion-catalog>
        <zion-self v-show="selfShow"></zion-self>
    </div>
</template>


<script>
import menu from '../components/navigation.vue';
import catalog from './catalog.vue';
import aboutMe from './aboutMe.vue';

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
            },
            showSelf(){
                this.selfShow = !this.selfShow;
                if(this.selfShow){
                    this.catalogShow = false;
                }
            },
        },
        components: { //定义组件
            'zion-menu':menu,
            'zion-catalog':catalog,
            'zion-self':aboutMe
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

</style>
