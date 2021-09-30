<template>
    <div class="top-bar">
            <div id="bar-body" class="bar-body"></div>
            <div id="outline-more" class="outline-more" @click="showLeft">
                <i class="imgthree fa fa-dedent fa-2x"></i>
            </div>
            <div id="bar-logo" @click="goHome()" class="bar-logo"><img :src="logurl"></div>
            <div id="bar-but-home" @click="goHome()" class="bar-but-home">HOME</div>
        </div>
</template>
<script>
    export default {
        data() {
            return {
                "logurl": process.env.PIC_URL+"2021/9/logo.jpeg",
            };
        },
        methods:{
            goHome(){
                this.$router.push({
                    path: '/',
                });
            },
            showLeft(){
                this.$emit('showLeft');
            }
        }
    }   
</script>

<style  scoped>
    /**导航条 */
    .bar-but-home {
        position: absolute;
        left: 55px;
        height: 35px;
        line-height: 35px;
        color: white;
        font-family: inherit;
        font-size: 25px;
        cursor: pointer;
    }
    .outline-more{
        position: absolute;
        display: none;
    }
    .bar-logo > img {
        height: 100%;
        width: 35px;
    }
    .bar-logo {
        position: absolute;
        left: 5px;
        cursor: pointer;
    }

    .bar-body {
        height: 100%;
        width: 100%;
        opacity: 0.5;
        background-color: black;
        top: 0;
        position: absolute;
    }

    .top-bar {
        height: 35px;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
    }

    /* 宽度小于1000px时，目录栏缩小 */
    @media screen and (max-width: 1280px) {
        #bar-logo {
            position: absolute;
            left: 2%;
            cursor: pointer;
        }

        #bar-but-home {
            display: none;
        }

        .imgthree {
            color: white;
            margin-top: 3px;
        }

        #outline-more{
            position: absolute;
            display: block;
            left: 15%;
            cursor: pointer;
        }

    }

</style>