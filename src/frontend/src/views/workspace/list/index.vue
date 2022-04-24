<template>
    <div class="main-content">
        <div class="app-content">
            <bk-container :col="12" :gutter="4">
                <bk-row>
                    <div style="width: 100%; display: flex;">
                        <div style="width: calc(100% - 118px);">
                            <bk-button
                                :theme="'primary'"
                                :title="'新增插件'"
                                class="mr10"
                                @click="openPluginCreate('pluginCreateRef', null, null)">
                                <bk-icon style="font-size: 20px" type="plus" />
                                新增插件
                            </bk-button>
                            <bk-input
                                clearable
                                style="width: 278px;"
                                :placeholder="'请输入插件名称搜索'"
                                :right-icon="'bk-icon icon-search'"
                                v-model="searchPluginName"
                                @change="searchPlugin"
                            >
                            </bk-input>
                        </div>
                        <div style="justify-items: flex-end;">
                            <bk-button
                                theme="primary"
                                title="插件生产指引"
                                :outline="true"
                                @click="openDocument"
                            >插件生产指引</bk-button>
                        </div>
                    </div>
                </bk-row>
                <bk-row class="margin-content">
                    <bk-col :span="12" v-bkloading="{ isLoading: tableLoading, theme: 'primary', zIndex: 10 }">
                        <bk-table
                            :data="pluginList"
                            :pagination="pagination"
                            ref="table"
                            @page-change="handlePageChange"
                            @page-limit-change="handlePageLimitChange">
                            <bk-table-column
                                label="插件名称"
                                prop="plugin_name"
                                min-width="10">
                                <template slot-scope="props">
                                    <div v-bk-tooltips="props.row.plugin_name">
                                        {{ props.row.plugin_name }}
                                    </div>
                                </template>
                            </bk-table-column>
                            <bk-table-column label="当前状态" min-width="10">
                                <template slot-scope="props">
                                    <div :class="statusList[props.row.plugin_status].css">
                                        <span
                                            v-bk-tooltips="'审批人：mingli(李明)'"
                                            v-if="props.row.plugin_status === 2">
                                            {{ statusList[props.row.plugin_status].name }}
                                        </span>
                                        <span v-else>
                                            {{ statusList[props.row.plugin_status].name }}
                                        </span>
                                    </div>
                                </template>
                            </bk-table-column>
                            <bk-table-column label="插件类型" min-width="15">
                                <template slot-scope="props">
                                    <div>{{ pluginTypeList[props.row.plugin_type] }}</div>
                                </template>
                            </bk-table-column>
                            <bk-table-column label="生效业务" min-width="60">
                                <template slot-scope="props">
                                    <div v-bk-tooltips="props.row.biz_name_list">
                                        {{ props.row.biz_name_list }}
                                    </div>
                                </template>
                            </bk-table-column>
                            <bk-table-column label="创建时间" prop="created_at" min-width="20">
                                <template slot-scope="props">
                                    <div v-bk-tooltips="props.row.created_at">
                                        {{ props.row.created_at }}
                                    </div>
                                </template>
                            </bk-table-column>
                            <bk-table-column label="创建人" prop="created_by" min-width="10"></bk-table-column>
                            <bk-table-column label="操作" min-width="50">
                                <template slot-scope="props">
                                    <bk-button
                                        class="mr10"
                                        theme="primary"
                                        text
                                        @click="openPluginCreate('pluginCreateRef', props.row, 'edit')"
                                        v-if="props.row.plugin_status === 0"
                                    >编辑</bk-button>
                                    <bk-button
                                        class="mr10"
                                        theme="primary"
                                        text
                                        @click="cancelStag(props.row)"
                                        v-if="props.row.plugin_status === 1"
                                        v-bk-tooltips="`如想更新插件，需要先撤回，重新灰度测试`"
                                    >撤回</bk-button>
                                    <bk-button
                                        class="mr10"
                                        theme="primary"
                                        text
                                        v-if="props.row.plugin_status === 3"
                                        @click="openPluginCreate('pluginCreateRef', props.row, 'detail')"
                                    >详情</bk-button>
                                    <bk-button
                                        class="mr10"
                                        theme="primary"
                                        text
                                        @click="operatePlugin(props.row)"
                                        v-if="props.row.plugin_status !== 2"
                                    >{{ operation[props.row.plugin_status] }}</bk-button>
                                    <div v-else>
                                        <bk-button
                                            class="mr10"
                                            theme="primary"
                                            text
                                            @click="cancelReview(props.row)"
                                        >取消上架</bk-button>
                                    </div>
                                    <bk-button
                                        class="mr10"
                                        theme="primary"
                                        text
                                        @click="removePlugin(props.row)"
                                        v-if="props.row.plugin_status === 0 || props.row.plugin_status === 1"
                                    >删除</bk-button>
                                </template>
                            </bk-table-column>
                            <bk-dialog v-model="downGradeDialog.visible"
                                :header-position="downGradeDialog.headerPosition"
                                :width="downGradeDialog.width"
                                @confirm="confirmDownGradePlugin">
                                <div style="text-align: center">
                                    <div class="confirmTitle">确定要下架该插件么？</div>
                                </div>
                            </bk-dialog>
                            <bk-dialog v-model="confirmDeleteDialog.visible"
                                :header-position="confirmDeleteDialog.headerPosition"
                                :width="confirmDeleteDialog.width"
                                @confirm="confirmDeletePlugin">
                                <div style="text-align: center">
                                    <div class="confirmTitle">确定要删除该插件吗？</div>
                                    <div class="confirmTitle">删除后不可恢复，请谨慎操作</div>
                                </div>
                            </bk-dialog>
                        </bk-table>
                    </bk-col>
                </bk-row>
            </bk-container>
        </div>
        <pluginCreateSlider ref="pluginCreateRef" @init-workspace="reloadPluginList"></pluginCreateSlider>
    </div>
</template>

<script>
    import pluginCreateSlider from '../../workspace/create/index'
    export default {
        components: {
            pluginCreateSlider
        },
        props: {
            'bizId': {
                type: String
            }
        },
        data () {
            return {
                searchPluginName: '',
                pluginList: [],
                pluginCount: '',
                tableLoading: true,
                colorList: ['#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6', '#2E8BC0', '#B1D4E0', '#BCECE0', '#36EEE0', '#F79489', '#F9F1F0'],
                pagination: {
                    current: 1,
                    count: 500,
                    limit: 10
                },
                confirmDeleteDialog: {
                    title: '删除插件',
                    visible: false,
                    headerPosition: 'left',
                    width: 480
                },
                downGradeDialog: {
                    title: '下架插件',
                    visible: false,
                    headerPosition: 'left',
                    width: 480
                },
                PluginData: null,
                pluginTypeList: {
                    0: '私有',
                    1: '公开'
                },
                operation: {
                    0: '灰度',
                    1: '上架',
                    2: '审核中',
                    3: '下架'
                },
                statusList: {
                    0: {
                        name: '创建中',
                        css: 'created-plugin',
                        target: 1
                    },
                    1: {
                        name: '预发布',
                        css: 'stag-plugin',
                        target: 2
                    },
                    2: {
                        name: '审核中',
                        css: 'audit-plugin',
                        target: null
                    },
                    3: {
                        name: '已发布',
                        css: 'added-plugin',
                        target: 4
                    },
                    4: {
                        name: '已下架',
                        css: 'sold-out-plugin',
                        target: null
                    }
                }
            }
        },
        watch: {
            bizId: function () {
                this.init()
            }
        },
        mounted () {
            this.init()
            this.$emit('doHeader', false)
        },
        methods: {
            async init () {
                this.tableLoading = true
                if (this.bizId !== '' && typeof this.bizId !== 'undefined') {
                    await this.getAllBizList()
                    await this.getAllPluginList()
                }
            },
            openPluginCreate (dialogName, obj, target) {
                this.$refs.pluginCreateRef.dialogOpen(dialogName, null, obj, target)
            },
            async getAllBizList () {
                await this.$store.dispatch(
                    'bot/getBiz'
                ).then(resp => {
                    this.allBizList = {}
                    const data = resp.data
                    for (let i = 0; i < data.length; i++) {
                        this.allBizList[data[i].bk_biz_id] = data[i].bk_biz_name
                    }
                })
            },
            openDocument () {
                window.open('https://github.com/TencentBlueKing/bk-chatbot/blob/master/docs/createskills.md', '_blank')
            },
            handlePageChange (page) {
                this.pagination.current = page
                if (this.searchPluginName !== '') {
                    this.searchPlugin()
                } else {
                    this.getAllPluginList()
                }
            },
            handlePageLimitChange (limit) {
                this.pagination.limit = limit
                if (this.searchPluginName !== '') {
                    this.searchPlugin()
                } else {
                    this.getAllPluginList()
                }
            },
            async getAllPluginList () {
                try {
                    const resp = await this.$store.dispatch(
                        'plugin/getAllPluginList',
                        { 'pagesize': this.pagination.limit, 'page': this.pagination.current }
                    )
                    this.pluginList = resp.data
                    this.pluginCount = resp.data.length
                    this.pagination.count = resp.count
                    for (let i = 0; i < this.pluginCount; i++) {
                        const bizNameList = []
                        for (let j = 0; j < this.pluginList[i].biz_list.length; j++) {
                            bizNameList.push(this.allBizList[this.pluginList[i].biz_list[j]])
                        }
                        if (bizNameList.length === 0) {
                            this.pluginList[i].biz_name_list = '全部业务'
                        } else {
                            this.pluginList[i].biz_name_list = bizNameList.join('； ')
                        }
                    }
                } catch (err) {}
                this.tableLoading = false
            },
            async reloadPluginList () {
                this.tableLoading = true
                await this.getAllPluginList()
            },
            async searchPlugin () {
                const response = await this.$store.dispatch(
                    'plugin/getAllPluginListByName',
                    {
                        'pluginName': this.searchPluginName,
                        'pagesize': this.pagination.limit,
                        'page': this.pagination.current
                    })
                if (response.result) {
                    this.pluginList = response.data
                    this.pluginCount = response.data.length
                    this.pagination.count = response.count
                    for (let i = 0; i < this.pluginCount; i++) {
                        const bizNameList = []
                        for (let j = 0; j < this.pluginList[i].biz_list.length; j++) {
                            bizNameList.push(this.allBizList[this.pluginList[i].biz_list[j]])
                        }
                        if (bizNameList.length === 0) {
                            this.pluginList[i].biz_name_list = '全部业务'
                        } else {
                            this.pluginList[i].biz_name_list = bizNameList.join('； ')
                        }
                    }
                }
                this.tableLoading = false
            },
            downGradePlugin (row) {
                this.downGradeDialog.visible = true
                this.PluginData = row
            },
            async cancelStag (row) {
                const response = await this.$store.dispatch(
                    'plugin/updatePlugin',
                    {
                        id: row.id,
                        plugin_status: 0
                    })
                if (response.result) {
                    this.tableLoading = true
                    await this.getAllPluginList()
                }
            },
            async cancelReview (row) {
                const response = await this.$store.dispatch(
                    'plugin/updatePlugin',
                    {
                        id: row.id,
                        plugin_status: 5
                    })
                if (response.result) {
                    this.tableLoading = true
                    await this.getAllPluginList()
                }
            },
            async confirmDownGradePlugin () {
                const row = this.PluginData
                this.tableLoading = true
                const response = await this.$store.dispatch(
                    'plugin/updatePlugin',
                    {
                        id: row.id,
                        plugin_status: 4
                    })
                if (response.result) {
                    await this.getAllPluginList()
                }
            },
            async operatePlugin (row) {
                const targetStatus = this.statusList[row.plugin_status].target
                if (targetStatus !== 4) {
                    this.tableLoading = true
                    const response = await this.$store.dispatch(
                        'plugin/updatePlugin',
                        {
                            id: row.id,
                            plugin_status: targetStatus
                        })
                    if (response.result) {
                        await this.getAllPluginList()
                    }
                } else {
                    this.downGradePlugin(row)
                }
            },
            async confirmDeletePlugin () {
                const row = this.PluginData
                if (row !== null) {
                    const pluginStatus = row.plugin_status
                    if (pluginStatus === 0 || pluginStatus === 1) {
                        this.PluginData = null
                        try {
                            await this.$store.dispatch('plugin/deletePlugin', { id: row.id })
                        } catch (err) {}
                        this.tableLoading = true
                        await this.getAllPluginList()
                    }
                }
            },
            removePlugin (row) {
                this.confirmDeleteDialog.visible = true
                this.PluginData = row
            }
        }
    }
</script>

<style scoped>
    @import './index.css';
</style>
