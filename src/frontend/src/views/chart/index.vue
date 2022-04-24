<template>
    <div class="main-content">
        <div class="app-container">
        </div>
        <div class="app-content">
            <div class="wrapper">
                <bk-container :col="12" :gutter="30" class="neo-chart">
                    <bk-row>
                        <bk-col :span="3">
                            <bk-card :show-head="false" class="opsbot-chart-card">
                                <br />
                                <span style="font-size: 28px;">触发器数</span>
                                <br />
                                <span style="font-size: 24px;"><bk-animate-number value="1"></bk-animate-number></span>
                            </bk-card>
                        </bk-col>
                        <bk-col :span="3">
                            <bk-card :show-head="false" class="opsbot-chart-card">
                                <br />
                                <span style="font-size: 28px;">技能数</span>
                                <br />
                                <span style="font-size: 24px;"><bk-animate-number :value="intentNum"></bk-animate-number></span>
                            </bk-card>
                        </bk-col>
                        <bk-col :span="6">
                            <bk-card title="知识库" class="opsbot-chart-base">
                                <bk-collapse accordion v-model="qaActiveName">
                                    <bk-collapse-item name="1">
                                        <span><i class="bk-icon icon-question-circle"></i>  什么是蓝鲸信息流</span>
                                        <div slot="content" class="f13">
                                            蓝鲸信息流是专注为发行游戏提效的智能机器人，主要为发行游戏接入提供智能问答、一键拉群、需求智能录入等服务；同时打通企业微信、微信、QQ、slack等主流聊天终端，实现消息的多端同步，消除与开发商的信息屏障；同时也为发行游戏提供自助便捷的任务执行工具。
                                        </div>
                                    </bk-collapse-item>

                                    <bk-collapse-item name="2">
                                        <span><i class="bk-icon icon-question-circle"></i>  如何快捷的通过机器人发送消息、文件、图片</span>
                                        <div slot="content" class="f13">
                                            <bk-link theme="primary" icon="bk-icon icon-chain" href="https://pages/viewpage.action?pageId=724825574">发送API文档</bk-link>
                                        </div>
                                    </bk-collapse-item>
                                </bk-collapse>
                            </bk-card>
                        </bk-col>
                    </bk-row>
                    <bk-row style="margin-top: 20px">
                        <bk-col :span="6">
                            <bk-card title="将以下任务创建为技能" style="height: 300px">
                                <bk-table
                                    :outer-border="false"
                                    :row-border="false"
                                    :data="taskRecordTable.data"
                                    :show-header="false"
                                    size="small"
                                    max-height="200">
                                    <bk-table-column label="平台" prop="platform" width="60">

                                    </bk-table-column>
                                    <bk-table-column label="名称" prop="name"></bk-table-column>
                                    <bk-table-column label="日期" prop="end_time">
                                        <template slot-scope="props">
                                            <span>{{ formatDate(new Date(props.row.end_time), 'yyyy-MM-dd hh:mm:ss') }}</span>
                                        </template>
                                    </bk-table-column>
                                    <bk-table-column label="操作" width="150">
                                        <template slot-scope="props">
                                            <bk-button class="mr10" theme="primary" text @click="remove(props.row)" disabled>创建</bk-button>
                                        </template>
                                    </bk-table-column>
                                </bk-table>
                            </bk-card>
                        </bk-col>
                        <bk-col :span="6">
                            <bk-card title="最近执行记录" style="height: 300px; overflow-x: auto">
                                <bk-table
                                    :data="taskExecutionLogTable.data"
                                    :outer-border="false"
                                    :header-border="false"
                                    :show-header="false"
                                    max-height="200">
                                    <bk-table-column label="平台" prop="platform" min-width="70">
                                        <template slot-scope="props">
                                            {{platformType[props.row.platform]}}
                                        </template>
                                    </bk-table-column>
                                    <bk-table-column label="技能" prop="intent_name" min-width="100" show-overflow-tooltip="true"></bk-table-column>
                                    <bk-table-column label="执行人" prop="sender" min-width="100"></bk-table-column>
                                    <bk-table-column label="状态" min-width="100" prop="status">
                                        <template slot-scope="props">
                                            <bk-tag :theme="executionLogStatusTheme[props.row.status]" radius="5px">
                                                {{executionLogStatusType[props.row.status]}}
                                            </bk-tag>
                                        </template>
                                    </bk-table-column>
                                    <bk-table-column label="开始时间" min-width="100" prop="created_at" show-overflow-tooltip="true"></bk-table-column>
                                </bk-table>
                            </bk-card>
                        </bk-col>
                    </bk-row>
                </bk-container>
            </div>
        </div>
    </div>
</template>

<script>
    import { formatDate } from '../../utils/date'

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

                taskRecordTable: {
                    data: [],
                    loading: false
                },
                taskExecutionLogTable: {
                    data: [],
                    loading: false
                },
                qaActiveName: '',
                botNum: 0,
                intentNum: 0,
                executionLogStatusType: {
                    '0': '初始化',
                    '1': '执行中',
                    '2': '执行成功',
                    '3': '执行失败',
                    '4': '执行暂停',
                    '5': '异常|终止'
                },
                executionLogStatusTheme: {
                    '0': 'info',
                    '1': 'info',
                    '2': 'success',
                    '3': 'danger',
                    '4': 'warning',
                    '5': 'danger'
                },
                platformType: {
                    '0': '默认任务',
                    1: '作业平台',
                    2: '标准运维',
                    3: '蓝盾'
                }
            }
        },
        watch: {
            bizId: function (val) {
                this.init()
            }
        },
        mounted () {
            this.$emit('doHeader', false)
            this.init()
        },
        methods: {
            formatDate,
            init () {
                if (this.bizId !== '' && typeof this.bizId !== 'undefined') {
                    const params = {
                        username: this.$store.state.user.username,
                        token: 'inkG6qvWnmu935tnk19vN3f1jhPsybv5',
                        data: {
                            biz_id: Number(this.bizId)
                        }
                    }

                    this.getRecordTableData(params)
                    this.getLogTableData(params)
                    this.getIntentNum()
                }
            },
            async getLogTableData (params) {
                this.taskExecutionLogTable.loading = true
                const response = await this.$store.dispatch('chart/getLogTableData', params, {})
                this.taskExecutionLogTable.data = response.data || []
                this.taskExecutionLogTable.loading = false
            },
            async getRecordTableData (params) {
                this.taskRecordTable.loading = true
                const response = await this.$store.dispatch('chart/getRecordTableData', params, {})
                this.taskRecordTable.data = response.data || []
                this.taskRecordTable.loading = false
            },
            async getBotNum () {
                const response = await this.$store.dispatch('chart/getBotNum', { 'bizId': this.bizId }, {})
                const data = response.data || {}
                this.botNum = data['count']
            },
            async getIntentNum () {
                const response = await this.$store.dispatch('chart/getIntentNum', { 'bizId': this.bizId }, {})
                const data = response.data || {}
                this.intentNum = data['count']
            }
        }
    }
</script>

<style>
    @import './index.css';
</style>
