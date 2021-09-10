<template>
    <ul class="menus">
        <li v-for="item in menus" :key="item.id">
            <!-- <a href="javascript:void(0);" @click="goto(`#${item.id}`)" :href="`#${item.id}`">{{item.title}}</a> -->
            <a href="javascript:void(0);" @click="goto(`#${item.id}`)">{{item.title}}</a>
            <ul v-if="item[childLabel]" class="child">
                <menu-tree :menus="item[childLabel]" :child-label="childLabel"></menu-tree>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "menuTree",
        props: {
            menus: {
                type: [Object,Array],
                required: true
            },
            childLabel: {
                type: String,
                default: 'child'
            }
        },
        data() {
            return{
            }
        },
        methods: {
            goto(id){
                document.querySelector(id).scrollIntoView( true); 
            }
        }
    }
</script>

<style scoped lang="less">
    .menus{
        line-height: 1.7em;
    }
    .child{
        padding-left: 15px;
    }
    ul{
        list-style-type: none;
        margin: 0;
        line-height: 1.5em;
        padding-left: 1em;
    }
    li {
        display: list-item;
        text-align: -webkit-match-parent;
        margin-top: 0.5em;
    }
    li > a {
        text-decoration: none;
        color: #304455;
    }
</style>
