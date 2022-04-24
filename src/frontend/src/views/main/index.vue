<template>
    <div class="main-content">
        <div class="app-container">
        </div>
        <div class="app">
            <div class="header">
                <div style="padding-left: 100px;padding-top: 100px">
                    <div class="content-title">蓝鲸信息流-提效办公工具</div>
                    <div class="content-info">bk-chatbot 是一款可通过可视化的界面进行任务配置，通过聊天终端软件如企业微信应用机器人进行会话交互实现任务执行的蓝鲸 SaaS 产品</div>
                </div>
                <img class="banner" src="static/images/index_icon/banner.png" alt="">
            </div>
            <div class="gray-background high">
                <div class="title">四大功能</div>
                <div class="flex">
                    <div v-for="item in firstRange" :key="item.text">
                        <img class="image" :src="item.image" alt="">
                        <div class="T-text">{{item["T-text"]}}</div>
                        <div class="t-text">{{item.text}}</div>
                    </div>
                </div>
            </div>
            <div class="high">
                <div class="title">四大亮点</div>
                <div class="flex">
                    <div v-for="item in secondRange" :key="item.text">
                        <img class="image" :src="item.image" alt="">
                        <div class="T-text">{{item["T-text"]}}</div>
                        <div class="t-text">{{item.text}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div></template>

<script>

    export default {
        components: {
        },
        props: {
            'bizId': {
                type: String
            }
        },
        data () {
            return {
                firstRange: [
                    { 'image': 'static/images/index_icon/01通用场景.png', 'T-text': '通用业务运营工具场景', 'text': '运营场景全支持' },
                    { 'image': 'static/images/index_icon/02自定义.png', 'T-text': '自定义业务运营工具场景', 'text': '支持标准运维、job自定义配置' },
                    { 'image': 'static/images/index_icon/03视图告警.png', 'T-text': '告警推送和基础性能视图展示', 'text': '支持移动端告警推送和性能视图查看' },
                    { 'image': 'static/images/index_icon/04平台审批.png', 'T-text': '平台审批', 'text': '支持平台审批功能，实现移动式工作流式审批，方便高效' }
                ],
                secondRange: [
                    { 'image': 'static/images/index_icon/05多端互通.png', 'T-text': '多端互通', 'text': '企业微信、QQ、小程序、H5、slack全方位支持' },
                    { 'image': 'static/images/index_icon/06对话.png', 'T-text': '场景互动', 'text': '聊天互动、一次性输入参数，页面互动全方位支持' },
                    { 'image': 'static/images/index_icon/07告警.png', 'T-text': '定制化告警推送', 'text': '业务告警可定制化推送开发商' },
                    { 'image': 'static/images/index_icon/08插件.png', 'T-text': '插件式场景接入', 'text': '支持业务通用场景和私有场景定制化接入' }
                ]
            }
        },
        watch: {

        },
        mounted () {

        },
        methods: {

        }
    }
</script>

<style>
    @import './index.css';
</style>
