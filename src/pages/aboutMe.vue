<template>
    <zion-window :windowClass="windowClass"></zion-window>
</template>

<script>
import window from '../components/window.vue'
export default {
    data() {
        return {
            windowClass: "window-self",
        };
    },
    methods:{
        
    },
    components: { //定义组件
        'zion-window':window
    },
};

</script>