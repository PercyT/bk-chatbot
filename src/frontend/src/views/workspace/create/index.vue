<template>
    <div>
        <bk-sideslider
            :is-show.sync="slideSlider.isShow"
            :quick-close="true"
            width="740"
            :before-close="beforeClose">
            <div slot="header">{{ slideSlider.title }}</div>
            <div class="p20" slot="content">
                <div class="firstStepForm">
                    <bk-form ref="pluginFirstDataRef" :model="pluginData">
                        <bk-form-item class="StepFormTitle">
                            <div>插件基础信息</div>
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="插件图标"
                            :rules="rules.pluginIcon"
                            :property="'plugin_icon'"
                            error-display-type="normal">
                            <img v-for="(icon, index) in iconList" v-bind="icon" :key="index"
                                :class="{
                                    plugin_icon_selected: icon === pluginData.plugin_icon,
                                    plugin_icon: icon !== pluginData.plugin_icon
                                }"
                                :src="'/static/images/plugin_icon/' + icon + '.png'"
                                @click="selectIcon(icon)"
                            />
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="插件名称"
                            :rules="rules.pluginName"
                            :property="'plugin_name'"
                            error-display-type="normal">
                            <bk-input
                                placeholder="请输入插件名称"
                                :clearable="true"
                                v-model="pluginData.plugin_name"
                                :disabled="isCheckDetail"
                            ></bk-input>
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="插件类型"
                            :rules="rules.pluginType"
                            :property="'plugin_type'"
                            error-display-type="normal">
                            <bk-radio-group v-model="pluginData.plugin_type">
                                <bk-radio :value="1" :disabled="isCheckDetail" style="margin-right: 15px;">公有</bk-radio>
                                <bk-radio :value="0" :disabled="isCheckDetail">私有</bk-radio>
                            </bk-radio-group>
                        </bk-form-item>
                        <bk-form-item
                            label="适用业务"
                            :rules="rules.bizList"
                            :property="'bizList'"
                            v-if="pluginData.plugin_type === 0"
                            error-display-type="normal">
                            <bk-select
                                v-model="pluginData.biz_list"
                                searchable
                                multiple
                                placeholder="请选择业务"
                                :disabled="isCheckDetail">
                                <bk-option v-for="option in bizList"
                                    :key="option.bk_biz_id"
                                    :id="option.bk_biz_id"
                                    :name="'[' + option.bk_biz_id + ']' + option.bk_biz_name">
                                </bk-option>
                            </bk-select>
                        </bk-form-item>
                        <bk-form-item
                            label="管理人员"
                            :rules="rules.developers"
                            :property="'developers'"
                            error-display-type="normal">
                            <bk-member-selector
                                :show-chinese="true"
                                v-model="pluginData.developers"
                                placeholder="请选择管理人员"
                                :disabled="isCheckDetail"
                            ></bk-member-selector>
                        </bk-form-item>
                    </bk-form>
                </div>
                <div class="secondStepForm">
                    <bk-form style="justify-content: center;align-items:center;" ref="pluginSecondDataRef" :model="pluginData">
                        <bk-form-item class="StepFormTitle" :required="true">
                            <div>插件配置</div>
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="插件key"
                            :rules="rules.pluginKey"
                            :property="'plugin_key'"
                            error-display-type="normal">
                            <bk-input
                                placeholder="插件 Key 支持输入英文大写字母 A-Z / 数字 / 中划线 '-'"
                                :clearable="true"
                                :disabled="disablePluginKey || isCheckDetail"
                                v-model="pluginData.plugin_key"
                            ></bk-input>
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="插件地址"
                            :rules="rules.pluginAddr"
                            :property="'plugin_addr'"
                            error-display-type="normal">
                            <bk-input
                                placeholder="格式为：域名:端口"
                                :clearable="true"
                                v-model="pluginData.plugin_addr"
                                :disabled="isCheckDetail">
                            </bk-input>
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="插件描述"
                            :rules="rules.pluginDesc"
                            :property="'plugin_desc'"
                            error-display-type="normal">
                            <bk-input
                                placeholder="请输入插件描述"
                                :clearable="true"
                                v-model="pluginData.plugin_desc"
                                :disabled="isCheckDetail"
                            ></bk-input>
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="插件标签"
                            :rules="rules.pluginTag"
                            :property="'plugin_tag'"
                            error-display-type="normal">
                            <bk-select
                                v-model="pluginData.plugin_tag"
                                searchable
                                placeholder="请选择插件标签"
                                :disabled="isCheckDetail">
                                <bk-option v-for="option in pluginTagList"
                                    :key="option.id"
                                    :id="option.id"
                                    :name="option.name">
                                </bk-option>
                            </bk-select>
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="业务选择"
                            :rules="rules.chooseBiz"
                            :property="'choose_biz'"
                            error-display-type="normal">
                            <bk-radio-group v-model="pluginData.choose_biz" :disabled="isCheckDetail">
                                <bk-radio :value="0" :disabled="isCheckDetail" style="margin-right: 15px;">不包含</bk-radio>
                                <bk-radio :value="1" :disabled="isCheckDetail">包含</bk-radio>
                            </bk-radio-group>
                        </bk-form-item>
                        <bk-form-item
                            :required="true"
                            label="参数配置"
                            :rules="rules.jsonValue"
                            :property="'jsonValue'"
                            error-display-type="normal">
                            <div style="height: 400px;">
                                <code-editor
                                    style="width: 100%;"
                                    ref="JsonEditor"
                                    @json-value-change="changeJsonValue"
                                    :value="pluginData.jsonValue"
                                    :options="jsonEditorOptions"
                                ></code-editor>
                            </div>
                        </bk-form-item>
                    </bk-form>
                </div>
            </div>
            <div slot="footer">
                <bk-button
                    style="margin-left: 30px;"
                    theme="primary"
                    @click="checkPluginData"
                    v-if="!isCheckDetail">保存
                </bk-button>
                <bk-button theme="default" @click="getExitDialog" v-if="!isCheckDetail">取消</bk-button>
            </div>

        </bk-sideslider>
        <bk-dialog v-model="confirmDialog.visible"
            :header-position="confirmDialog.headerPosition"
            :width="confirmDialog.width"
            @confirm="confirmCreatePlugin"
            style="z-index: 99999;">
            <div style="display: flex; justify-content: center;">
                <div class="confirmTitle">确定要创建该插件吗？</div>
            </div>
        </bk-dialog>
        <bk-dialog v-model="exitDialog.visible"
            :header-position="exitDialog.headerPosition"
            :width="exitDialog.width"
            @confirm="exitCreatePlugin"
            style="z-index: 99999;">
            <div style="text-align: center;">
                <div class="confirmTitle">确定要退出新增插件吗？</div>
                <div class="confirmInfo">退出后不保存表单数据，请谨慎操作</div>
            </div>
        </bk-dialog>
        <bk-dialog v-model="confirmEditDialog.visible"
            :header-position="confirmEditDialog.headerPosition"
            :width="confirmEditDialog.width"
            @confirm="confirmEditPlugin"
            style="z-index: 99999;">
            <div style="text-align: center">
                <div class="confirmTitle">确定要编辑插件吗？</div>
            </div>
        </bk-dialog>
        <bk-dialog v-model="exitEditDialog.visible"
            :header-position="exitEditDialog.headerPosition"
            :width="exitEditDialog.width"
            @confirm="exitEditPlugin"
            style="z-index: 99999; display: flex;">
            <div style="text-align: center">
                <div class="confirmTitle">确定要退出编辑插件吗？</div>
            </div>
        </bk-dialog>
    </div></template>

<script>
    import CodeEditor from '../../../components/CodeEditor.vue'

    export default {
        components: { CodeEditor },
        props: {
            'bizId': {
                type: String
            },
            editPluginData: Object
        },
        data () {
            return {
                rtxList: [],
                editorReload: false,
                pluginData: {
                    plugin_icon: 'chart',
                    plugin_name: '',
                    plugin_type: 1,
                    biz_list: '',
                    developers: [],
                    plugin_key: '',
                    plugin_addr: '',
                    plugin_desc: '',
                    plugin_tag: 0,
                    choose_biz: 0,
                    plugin_status: '',
                    actions: [],
                    plugin_global: {},
                    jsonValue: `{
    "actions": [
        {
            "key": "/api/rest/v1/bkchat/post_test",
            "desc": "描叙",
            "time_out": 60,
            "run_now": true,
            "params": [
                {
                    "key": "test_input",
                    "name": "输入参数",
                    "desc": "参数描叙1",
                    "type": "input",
                    "show": true,
                    "required": true
                },
                {
                    "key": "test_select",
                    "name": "选择参数",
                    "desc": "参数描叙2",
                    "type": "select",
                    "show": true,
                    "required": true,
                    "options": [
                        {
                          "id": "1",
                          "name": "选项1"
                        },
                        {
                          "id": "2",
                          "name": "选项2"
                        }
                    ]
                }
            ]
        }
    ],
    "plugin_global": {
        "bk_app_code": "xxxxx",
        "bk_app_secret": "xxxxx"
    }
}`
                },
                jsonEditorOptions: {
                    language: 'json',
                    readOnly: false,
                    minimap: {
                        enabled: true
                    }
                },
                bizList: [],
                selectedBizList: [],
                pluginTagList: [
                    {
                        id: 0,
                        name: '运维工具'
                    }
                ],
                iconList: ['chart', 'compass', 'ipo', 'lag', 'rocket', 'upgrade'],
                exitDialog: {
                    visible: false,
                    headerPosition: 'left'
                },
                confirmDialog: {
                    visible: false,
                    headerPosition: 'left'
                },
                exitEditDialog: {
                    visible: false,
                    headerPosition: 'left'
                },
                confirmEditDialog: {
                    visible: false,
                    headerPosition: 'left'
                },
                slideSlider: {
                    title: '',
                    isShow: false
                },
                isCheckDetail: false,
                isEditing: false,
                disablePluginKey: false,
                exampleJsonValue: `{
    "actions": [
        {
            "key": "/api/rest/v1/bkchat/post_test",
            "desc": "描叙",
            "time_out": 60,
            "run_now": true,
            "params": [
                {
                    "key": "test_input",
                    "name": "输入参数",
                    "desc": "参数描叙1",
                    "type": "input",
                    "show": true,
                    "required": true
                },
                {
                    "key": "test_select",
                    "name": "选择参数",
                    "desc": "参数描叙2",
                    "type": "select",
                    "show": true,
                    "required": true,
                    "options": [
                        {
                          "id": "1",
                          "name": "选项1"
                        },
                        {
                          "id": "2",
                          "name": "选项2"
                        }
                    ]
                }
            ]
        }
    ],
    "plugin_global": {
        "bk_app_code": "xxxxx",
        "bk_app_secret": "xxxxx"
    }
}`,
                rules: {
                    pluginIcon: [
                        {
                            required: true,
                            message: '请选择插件icon',
                            trigger: 'blur'
                        }
                    ],
                    pluginName: [
                        {
                            required: true,
                            message: '请输入插件名称',
                            trigger: 'blur'
                        }
                    ],
                    pluginType: [
                        {
                            required: true,
                            message: '请选择插件类型',
                            trigger: 'blur'
                        }
                    ],
                    bizList: [],
                    developers: [],
                    pluginKey: [
                        {
                            required: true,
                            message: '请输入插件key',
                            trigger: 'blur'
                        },
                        {
                            regex: /^[A-Z0-9-]+$/,
                            message: `插件 Key 支持输入英文大写字母 A-Z / 数字 / 中划线 '-'`,
                            trigger: 'blur'
                        },
                        {
                            max: 64,
                            message: '插件 key 最长字符长度为 64',
                            trigger: 'blur'
                        }
                    ],
                    pluginAddr: [
                        {
                            required: true,
                            message: '请输入插件地址，格式为 域名:端口',
                            trigger: 'blur'
                        }
                    ],
                    pluginDesc: [
                        {
                            required: true,
                            message: '请输入插件描述',
                            trigger: 'blur'
                        }
                    ],
                    pluginTag: [
                        {
                            required: true,
                            message: '请输入插件标签',
                            trigger: 'blur'
                        }
                    ],
                    chooseBiz: [
                        {
                            required: true,
                            message: '请选择是否包含业务选择',
                            trigger: 'blur'
                        }
                    ],
                    jsonValue: [
                        {
                            required: true,
                            message: '请按JSON格式填写关于 plugin_global 和 actions 的设置',
                            trigger: 'change'
                        },
                        {
                            validator: this.checkJson,
                            message: '不符合JSON格式，请修改',
                            trigger: 'change'
                        }
                    ]
                }
            }
        },
        watch: {
            bizId: function () {
                this.getBiz()
            }
        },
        created () {
            if (this.bizId !== '' && typeof this.bizId !== 'undefined') {
                this.getBiz()
            }
        },
        methods: {
            async getBiz () {
                const response = await this.$store.dispatch('example/getBiz')
                this.bizList = response.data || []
            },
            async checkJson (jsonValue) {
                jsonValue = typeof jsonValue !== 'string' ? JSON.stringify(jsonValue) : jsonValue
                try {
                    jsonValue = JSON.parse(jsonValue)
                } catch (e) {
                    return false
                }
                return typeof jsonValue === 'object' && jsonValue !== null
            },
            selectIcon (icon) {
                if (this.isCheckDetail !== true) {
                    this.pluginData.plugin_icon = icon
                }
            },
            beforeClose () {
                if (this.isCheckDetail !== true) {
                    this.getExitDialog()
                } else {
                    this.clearPluginParams()
                    this.slideSlider.isShow = false
                }
            },
            changeJsonValue (value) {
                this.pluginData.jsonValue = value
            },
            getPluginParams () {
                const params = Object.assign(JSON.parse(this.pluginData.jsonValue), {
                    plugin_icon: this.pluginData.plugin_icon,
                    plugin_name: this.pluginData.plugin_name,
                    plugin_type: this.pluginData.plugin_type,
                    biz_list: this.pluginData.biz_list.length === 0 ? [] : this.pluginData.biz_list,
                    developers: this.pluginData.developers,
                    plugin_key: this.pluginData.plugin_key,
                    plugin_addr: this.pluginData.plugin_addr,
                    plugin_desc: this.pluginData.plugin_desc,
                    plugin_tag: this.pluginTagList[this.pluginData.plugin_tag].name,
                    choose_biz: this.pluginData.choose_biz
                })
                if (this.isEditing) {
                    params.id = this.pluginData.id
                } else {
                    params.plugin_status = 0
                }
                return params
            },
            getPluginTagIndex (arr, item) {
                for (const i in arr) {
                    if (arr[i].name === item) {
                        return i
                    }
                }
            },
            async getPluginDetail (obj) {
                await this.$store.dispatch('plugin/retrievePlugin', { id: obj.id }).then(resp => {
                    const data = resp.data
                    this.pluginData = data
                    this.pluginData.jsonValue = JSON.stringify(Object.assign(
                        { plugin_global: data.plugin_global },
                        { actions: data.actions }
                    ), null, 4)
                    this.pluginData.id = obj.id
                    this.pluginData.plugin_tag = this.getPluginTagIndex(this.pluginTagList, obj.plugin_tag)
                    this.pluginData.plugin_status = obj.plugin_status
                    this.pluginData.plugin_tag = parseInt(this.pluginData.plugin_tag)
                    this.pluginData.biz_list.forEach((item, index) => {
                        this.pluginData.biz_list[index] = parseInt(this.pluginData.biz_list[index])
                    })
                    this.pluginData.choose_biz = this.pluginData.choose_biz === false ? 0 : 1
                })
            },
            clearPluginParams () {
                this.pluginData.plugin_icon = 'chart'
                this.pluginData.plugin_name = ''
                this.pluginData.plugin_type = 1
                this.pluginData.biz_list = []
                this.pluginData.plugin_key = ''
                this.pluginData.plugin_addr = ''
                this.pluginData.plugin_desc = ''
                this.pluginData.plugin_tag = 0
                this.pluginData.choose_biz = 0
                this.pluginData.developers = []
                this.pluginData.id = ''
                this.pluginData.jsonValue = this.exampleJsonValue
                this.disablePluginKey = false
            },
            getConfirmDialog () {
                if (this.isEditing) {
                    this.confirmEditDialog.visible = true
                } else {
                    this.confirmDialog.visible = true
                }
            },
            getExitDialog () {
                if (this.isEditing) {
                    this.exitEditDialog.visible = true
                } else {
                    this.exitDialog.visible = true
                }
            },
            checkPluginData () {
                this.$refs.pluginFirstDataRef.validate().then(validator => {
                    this.$refs.pluginSecondDataRef.validate().then(validator => {
                        this.getConfirmDialog()
                    }, validator2 => {
                        // 显示第一个出错位置
                        this.$bkMessage({
                            theme: 'error',
                            message: validator2.content
                        })
                    })
                }, validator1 => {
                    // 显示第一个出错位置
                    this.$bkMessage({
                        theme: 'error',
                        message: validator1.content
                    })
                })
            },
            async confirmCreatePlugin () {
                const params = this.getPluginParams()
                await this.$store.dispatch('plugin/CreatePlugin', params)
                this.slideSlider.isShow = false
                this.clearPluginParams()
                this.$emit('init-workspace')
            },
            async confirmEditPlugin () {
                const params = this.getPluginParams()
                await this.$store.dispatch('plugin/updatePlugin', params)
                this.slideSlider.isShow = false
                this.clearPluginParams()
                this.$router.push('workspace')
                this.$emit('init-workspace')
            },
            exitCreatePlugin () {
                this.slideSlider.isShow = false
                this.clearPluginParams()
            },
            exitEditPlugin () {
                this.slideSlider.isShow = false
                this.clearPluginParams()
            },
            dialogOpen (dialogName, row, obj, target) {
                this.getBiz()
                if (obj && target === 'edit') {
                    this.isEditing = true
                    this.slideSlider.title = '编辑插件'
                    this.isCheckDetail = false
                    this.disablePluginKey = true
                    this.getPluginDetail(obj)
                    this.jsonEditorOptions.readOnly = false
                } else if (obj && target === 'detail') {
                    this.isEditing = false
                    this.slideSlider.title = '查看详情'
                    this.disablePluginKey = true
                    this.isCheckDetail = true
                    this.getPluginDetail(obj)
                    this.jsonEditorOptions.readOnly = true
                } else {
                    this.isEditing = false
                    this.isCheckDetail = false
                    this.slideSlider.title = '新增插件'
                    this.jsonEditorOptions.readOnly = false
                }
                this.slideSlider.isShow = true
            }
        }
    }
</script>

<style>
@import './index.css';
</style>
