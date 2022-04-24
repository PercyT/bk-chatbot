<template>
    <div class="main-content">
        <div class="app-content">
            <div class="tabClass">
                <bk-tab
                    :active.sync="active"
                    type="unborder-card"
                    @tab-change="getPluginList"
                    style="
                        height: 60px;
                        margin-bottom: 20px;
                    ">
                    <bk-tab-panel
                        v-for="(panel, index) in panels"
                        v-bind="panel"
                        :key="index">
                    </bk-tab-panel>
                </bk-tab>
            </div>
            <div v-bkloading="{ isLoading: listLoading, theme: 'primary', zIndex: 10 }">
                <div class="middle-item">
                    <div class="plugin-count">
                        <span>总数：{{ pluginCount }}</span>
                    </div>
                    <div class="search-items">
                        <bk-select :disabled="false" v-model="sortWay" style="width: 278px;margin-right: 20px;"
                            placeholder="选择排序方式"
                            ext-cls="select-custom"
                            ext-popover-cls="select-popover-custom"
                            @change="sortPluginList(newValue, oldValue)">
                            <bk-option v-for="option in sortList"
                                :key="option.id"
                                :id="option.id"
                                :name="option.name">
                            </bk-option>
                        </bk-select>
                        <bk-input
                            style="width: 278px;"
                            :placeholder="'键入插件名称，回车或点击右边的icon搜索'"
                            :right-icon="'bk-icon icon-search'"
                            v-model="pluginName"
                            @enter="searchPlugin"
                            @right-icon-click="searchPlugin"
                        >
                        </bk-input>
                    </div>
                </div>
                <div style="width: 100%; height: 100%; overflow: auto; max-height: 60vh;">
                    <div class="plugin-card" v-for="plugin in pluginList" :key="plugin.id">
                        <div class="plugin-card-top">
                            <img
                                style="width: 70px;height: 70px;"
                                :src="'/static/images/plugin_icon/' + plugin.plugin_icon + '.png'"
                            />
                            <div class="plugin-name">
                                <span
                                    v-bk-tooltips.top-start="plugin.plugin_name"
                                    :class="{
                                        public_plugin: plugin.plugin_type === 1,
                                        private_plugin: plugin.plugin_type === 0
                                    }">{{ plugin.plugin_name }}
                                </span>
                            </div>
                            <div class="plugin-private" v-if="plugin.plugin_type === 0">
                                <span>业务专属</span>
                            </div>
                        </div>
                        <div class="plugin-card-middle">
                            <img style="width: 12px; height: 12px; opacity: 0.5;margin-top: 4px;margin-right: 3px;" src="../../../images/user.svg" />
                            <span class="plugin-creator">{{ plugin.created_by }}</span>
                            <div style="text-align:right;">
                                <span class="plugin-tag">{{ plugin.plugin_tag }}</span>
                                <span class="plugin-status">已安装</span>
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <span class="plugin-execution-times">
                                执行次数：{{ plugin.plugin_exec_count }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import { dialogClean, dialogConfirm, dialogOpen } from '../../../utils/form'
    export default {
        components: {},
        props: {
            'bizId': {
                type: String
            }
        },
        data () {
            return {
                listLoading: true,
                panels: [
                    { name: 'all', label: '所有插件', count: 10 },
                    { name: 'biz', label: '业务专属', count: 20 },
                    { name: 'popular', label: '近期热门', count: 30 },
                    { name: 'new', label: '近期新增', count: 40 }
                ],
                active: 'all',
                pagination: {
                    current: 1,
                    count: 500,
                    limit: 10
                },
                rmDialog: {
                    visible: false,
                    width: 480,
                    headerPosition: 'center'
                },
                pluginList: [],
                pluginListData: [
                    {
                        'id': 0,
                        'plugin_name': 'Ping检测',
                        'icon': 'ipo',
                        'created_by': 'andyzgzhang',
                        'plugin_tag': '运维工具',
                        'plugin_status': '已安装',
                        'plugin_type': 1,
                        'executionTimes': 999
                    }, {
                        'id': 1,
                        'plugin_name': 'Ping检测',
                        'icon': 'compass',
                        'created_by': 'andyzgzhang',
                        'plugin_tag': '运维工具',
                        'plugin_status': '已安装',
                        'plugin_type': 0,
                        'executionTimes': 999
                    }
                ],
                pluginCount: '',
                sortList: [
                    { id: 1, name: '按创建时间排序，降序' },
                    { id: 2, name: '按创建时间排序，升序' },
                    { id: 3, name: '按执行次数排序，降序' }
                ],
                sortWay: '',
                pluginName: '',
                data: [],
                pluginStatus: [
                    {
                        'id': 0,
                        'status': 'status-default',
                        'desc': '已创建'
                    }, {
                        'id': 1,
                        'status': 'status-stag',
                        'desc': '灰度中'
                    }, {
                        'id': 2,
                        'status': 'status-audit',
                        'desc': '待审核'
                    }, {
                        'id': 3,
                        'status': 'status-added',
                        'desc': '已发布'
                    }, {
                        'id': 4,
                        'status': 'status-sold-out',
                        'desc': '已下架'
                    }
                ],
                pluginTagList: [
                    {
                        name: '运维工具'
                    }
                ]
            }
        },
        watch: {
            bizId: function () {
                this.init()
            }
        },
        mounted () {
            this.$emit('doHeader', false)
            this.init()
        },
        methods: {
            dialogOpen,
            dialogClean,
            dialogConfirm,
            init () {
                this.active = 'all'
                if (this.bizId !== '' && typeof this.bizId !== 'undefined') {
                    this.getPluginList()
                }
            },
            async getPluginList () {
                this.listLoading = true
                let response = null
                this.pluginList = []
                this.pluginCount = 0
                if (this.active === 'all') {
                    try {
                        response = await this.$store.dispatch(
                            'plugin/getPluginList',
                            {
                                bizId: this.bizId
                            }
                        )
                    } catch (err) {}
                }
                if (this.active === 'biz') {
                    try {
                        response = await this.$store.dispatch(
                            'plugin/getPrivatePluginList',
                            {
                                bizId: this.bizId
                            }
                        )
                    } catch (err) {}
                }
                if (this.active === 'popular') {
                    try {
                        response = await this.$store.dispatch(
                            'plugin/getPluginListByPopularity',
                            {
                                bizId: this.bizId
                            }
                        )
                    } catch (err) {}
                }
                if (this.active === 'new') {
                    const sTime = moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss')
                    try {
                        response = await this.$store.dispatch(
                            'plugin/getPluginListByRecentAdditions',
                            {
                                bizId: this.bizId,
                                createAtMin: sTime
                            })
                    } catch (err) {}
                }
                if (response !== null) {
                    if (response.hasOwnProperty('data')) {
                        this.pluginList = response.data
                    }
                }
                this.pluginCount = this.pluginList.length
                this.listLoading = false
            },
            async searchPlugin () {
                await this.getPluginList()
                if (this.pluginName !== '') {
                    this.pluginList = this.pluginList.filter(plugin => plugin.plugin_name.indexOf(this.pluginName) !== -1)
                    this.pluginCount = this.pluginList.length
                }
            },
            sortPluginList () {
                switch (this.sortWay) {
                    case 1:
                        this.pluginList.sort(function (a, b) {
                            return Date.parse(b.created_at) - Date.parse(a.created_at)
                        })
                        break
                    case 2:
                        this.pluginList.sort(function (a, b) {
                            return Date.parse(a.created_at) - Date.parse(b.created_at)
                        })
                        break
                    case 3:
                        this.pluginList.sort(function (a, b) {
                            return b.plugin_exec_count - a.plugin_exec_count
                        })
                        break
                }
            }
        }
    }
</script>

<style scoped>
    @import './index.css';
</style>
