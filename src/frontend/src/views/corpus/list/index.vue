<template>
    <div class="main-content">
        <div class="app-content">
            <bk-container :col="12" :gutter="4">
                <bk-row>
                    <bk-col :span="9">
                        <bk-button :theme="'primary'" :title="'主要按钮'" @click="openCorpusCreate('corpusCreate')" class="mr10">
                            <bk-icon style="font-size: 20px" type="plus" />
                            创建语料
                        </bk-button>
                        <bk-button :theme="'default'" @click="show" :title="'主要按钮'" class="mr10">
                            本地导入
                        </bk-button>
                    </bk-col>
                    <bk-col :span="3">
                        <bk-search-select clearable :show-condition="false" @change="getCorpusList(search.value)" :show-popover-tag-change="true" :data="searchData" v-model="search.value"></bk-search-select>
                    </bk-col>
                </bk-row>
                <bk-row class="margin-content">
                    <bk-col :span="12">
                        <bk-table :data="data" size="large" @page-limit-change="pageLimitChange" @page-change="pageChange" :pagination="pagination" ref="table">
                            <bk-table-column label="语句" fixed="left" width="600">
                                <template slot-scope="props">
                                    <div>
                                        <span v-for="slot in props.row.slots" :key="slot" v-if="slot.key === 'dontcolortext'">{{props.row.text.slice(slot.index[0],slot.index[1])}}</span>
                                        <span v-bk-tooltips.top="slot.value" class="colorText" :style="{ background: slot.color }" v-else>{{props.row.text.slice(slot.index[0],slot.index[1])}}</span>
                                    </div>
                                </template>
                            </bk-table-column>
                            <bk-table-column label="领域" width="200" prop="domain.name" :filters="sourceFilters"
                                :filter-method="sourceFilterMethod"
                                :filter-multiple="true"></bk-table-column>
                            <bk-table-column label="意图" width="200" prop="intent.name">
                            </bk-table-column>
                            <bk-table-column label="创建时间" width="250" prop="created_at"></bk-table-column>
                            <bk-table-column label="创建人" width="200" prop="created_by"></bk-table-column>
                            <bk-table-column label="最后修改时间" width="250" prop="updated_at"></bk-table-column>
                            <bk-table-column label="最后修改人" width="200" prop="updated_by"></bk-table-column>
                            <bk-table-column label="操作" fixed="right" width="150">
                                <template slot-scope="props">
                                    <bk-icon class="pointer" @click="openCorpusCreate('corpusEdit', props.row)" v-if="props.source !== 'QQ'" type="cog-shape" />
                                    <bk-icon type="close-circle-shape" class="pointer" @click="deleteCorpus(props.row.id)" />
                                </template>
                            </bk-table-column>
                            <bk-dialog v-model="rmDialog.visible"
                                :confirm-fn="delCorpus"
                                :header-position="rmDialog.headerPosition"
                                :width="rmDialog.width">
                                <div style="text-align: center">
                                    <bk-icon class="warnIcon" type="exclamation-circle-shape" />
                                    <div class="rmTitle">确定要删除此项语句吗？</div>
                                    <div class="rmInfo">删除后不可恢复，请谨慎操作</div>
                                </div>
                            </bk-dialog>
                        </bk-table>
                    </bk-col>
                </bk-row>
                <bk-dialog v-model="showDialog" title="上传"
                    :header-position="center"
                    :width="720"
                    @confirm="confirm"
                >
                    <bk-upload v-if="showDialog"
                        :tip="'只允许上传JSON的文件'"
                        :with-credentials="true"
                        :handle-res-code="handleRes"
                        :accept="'.json'"
                        @on-success="testSuccess"
                        @on-progress="testProgress"
                        @on-done="testDone"
                        @on-error="testErr"
                        :url="'https://jsonplaceholder.typicode.com/posts/'"
                    ></bk-upload>
                    模板下载:
                </bk-dialog>
            </bk-container>
        </div>
        <corpusCreateSlider @getCorpusList="getCorpusList" ref="corpusCreateRef"></corpusCreateSlider>
    </div>
</template>

<script>
    import corpusCreateSlider from '../../corpus/create/index'
    import { download } from '../../../utils/download'

    export default {
        components: {
            corpusCreateSlider
        },
        data () {
            return {
                isLargeDropdownShow: false,
                isDropdownShow: false,
                showDialog: false,
                searchData: [
                    {
                        name: '语句',
                        id: '1',
                        multiable: true,
                        prop: 'text'
                    },
                    {
                        name: '意图',
                        id: '3',
                        multiable: true,
                        prop: 'intent_name'
                    },
                    {
                        name: '创建人',
                        id: '4',
                        multiable: true,
                        prop: 'created_by'
                    },
                    {
                        name: '最后修改人',
                        id: '5',
                        multiable: true,
                        prop: 'updated_by'
                    }
                ],
                colorList: ['#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6', '#2E8BC0', '#B1D4E0', '#BCECE0', '#36EEE0', '#F79489', '#F9F1F0', '#409EFF'],
                search: {
                    value: []
                },
                // sourceFilters: [{ text: '业务', value: 'QQ' }, { text: '域名信息', value: '微信' }],
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
                useCorlorList: [],
                data: [],
                primaryMessage: '选择你导入的构建机并填写相关信息，系统将为你安装必要的软件',
                errorMessage: '系统错误，请稍后重试',
                warningMessage: '系统即将于19：00-21：00进行升个级，请及时保存你的资料',
                successMessage: '该语料删除成功！',
                deleteId: '',
                bulkCreateParams: []
            }
        },
        computed: {
            current () {
                return this.pagination.current
            },
            limit () {
                return this.pagination.limit
            },
            count () {
                return this.pagination.count
            }
        },
        watch: {
            current (newValue, oldValue) {
                this.getCorpusList(this.search.value)
            },
            limit (newValue, oldValue) {
                this.getCorpusList(this.search.value)
            },
            count (newValue, oldValue) {
                this.getCorpusList(this.search.value)
            }
        },
        created () {
            this.getCorpusList(this.search.value)
        },
        methods: {
            testSuccess (file, fileList) {
                console.log(file, fileList, 'success')
                file = file.origin
                const that = this
                const reader = new FileReader()// 新建一个FileReader
                reader.readAsText(file, 'UTF-8')// 读取文件
                reader.onload = function (evt) { // 读取完文件之后会回来这里
                    const fileString = evt.target.result // 读取文件内容
                    const jsonObj = JSON.parse(fileString)
                    that.bulkCreate(jsonObj)
                }
            },
            pageChange (newPage) {
                this.pagination.current = newPage
            },
            pageLimitChange (limit) {
                this.pagination.limit = limit
            },
            async bulkCreate (jsonObj) {
                for (const item of jsonObj) {
                    if (item.intent_name) {
                        const params = {
                            intent_name: item.intent_name
                        }
                        const response = await this.$store.dispatch('corpus/getIntentList', params, {})
                        if (response.data.length === 0) {
                            console.log('有问题')
                            this.handleError({ theme: 'error' }, '无该意图名称')
                            return
                        } else {
                            item.intent_id = response.data[0].id
                        }
                        console.log(response)
                    } else {
                        this.handleError({ theme: 'error' }, '意图名称不能为空')
                        console.log('有问题')
                        return
                    }
                    this.bulkCreateParams.push({
                        'intent_id': item.intent_id,
                        'data_source': item.data_source,
                        'corpus_list': [{
                            'text': item.text,
                            'slots': item.slots
                        }]
                    })
                }
            },
            handleError (config, message) {
                config.message = message
                config.offsetY = 80
                this.$bkMessage(config)
            },
            async confirm () {
                console.log(this.bulkCreateParams)
                let res = {}
                if (this.bulkCreateParams.length !== 0) {
                    try {
                        res = await this.$store.dispatch('corpus/bulkCreateCorpus', { 'data': this.bulkCreateParams }, {})
                    } catch (err) {
                    }
                    if (res.code === 400) {
                        this.handleError({ theme: 'error' }, res.message)
                    } else {
                        this.handleSuccess2({ theme: 'success' })
                        this.getCorpusList(this.search.value)
                    }
                }
            },
            handleSuccess2 (config) {
                config.message = '文件上传成功'
                config.offsetY = 80
                this.$bkMessage(config)
            },
            testProgress (e, file, fileList) {
                // console.log(e, file, fileList, 'progress')
            },
            testDone () {
                console.log('done')
            },
            testErr (file, fileList) {
                console.log(file, fileList, 'error')
            },
            handleRes (response) {
                return true
            },
            show () {
                this.showDialog = true
                this.bulkCreateParams = []
            },
            openCorpusCreate (dialogName, obj) {
                this.$refs.corpusCreateRef.dialogOpen(dialogName, obj)
            },
            downLoadFile (url, fileName) {
                let xmlHttp = null
                if (window.ActiveXObject) {
                    // IE6, IE5 浏览器执行代码
                    // eslint-disable-next-line no-undef
                    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
                } else if (window.XMLHttpRequest) {
                    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                    xmlHttp = new XMLHttpRequest()
                }
                // 2.如果实例化成功，就调用open（）方法：
                if (xmlHttp != null) {
                    xmlHttp.open('get', url, true)
                    xmlHttp.send()
                    xmlHttp.onreadystatechange = doResult // 设置回调函数
                }
                function doResult () {
                    if (xmlHttp.readyState === 4) {
                        // 4表示执行完成
                        if (xmlHttp.status === 200) {
                            // 200表示执行成功
                            // 引用js库：download.js
                            download(xmlHttp.responseText, fileName, 'text/plain')
                        }
                    }
                }
            },
            async getCorpusList (filter) {
                const params = { 'pagesize': this.pagination.limit, 'page': this.pagination.current }
                if (typeof filter === 'object') {
                    filter.forEach((item) => {
                        params[item.prop] = item.values.map((k) => {
                            return k.id
                        }).join(',')
                    })
                }
                const response = await this.$store.dispatch('corpus/getCorpusList', params, {})
                this.data = response.data
                this.pagination.count = response.count
                for (let i = 0; i < this.data.length; i++) {
                    this.useCorlorList = []
                    this.data[i].intent.color = []
                    for (const item in this.data[i].intent.slots) {
                        const color = this.getDifferentColor()
                        this.data[i].intent.color.push({
                            color: color,
                            key: item,
                            value: this.data[i].intent.slots[item]
                        })
                        this.useCorlorList.push(color)
                    }
                    for (let j = 0; j < this.data[i].slots.length; j++) {
                        for (const item of this.data[i].intent.color) {
                            if (item.key === this.data[i].slots[j].key) {
                                this.data[i].slots[j].color = item.color
                            }
                        }
                    }
                }
            },
            getDifferentColor () {
                const newColor = this.getColor()
                if (this.inUseColor(newColor)) {
                    return this.getDifferentColor()
                } else {
                    return newColor
                }
            },
            inUseColor (color) {
                for (let i = 0; i < this.useCorlorList.length; i++) {
                    if (color === this.useCorlorList[i]) {
                        return true
                    }
                }
                return false
            },
            getColor () {
                return this.colorList[Math.floor(Math.random() * 10)]
            },
            dropdownShow () {
                this.isDropdownShow = true
            },
            dropdownHide () {
                this.isDropdownShow = false
            },
            triggerHandler () {
                this.$refs.dropdown.hide()
            },
            async delCorpus () {
                this.rmDialog.visible = false
                try {
                    await this.$store.dispatch('corpus/deleteCorpus', { 'id': this.deleteId })
                } catch (err) {
                }
                this.handleSuccess({ theme: 'success' })
                this.getCorpusList(this.search.value)
            },
            deleteCorpus (id) {
                console.log(this.search.value)
                this.rmDialog.visible = true
                this.deleteId = id
            },
            handleSuccess (config) {
                config.message = this.successMessage
                config.offsetY = 80
                this.$bkMessage(config)
            }
        }
    }
</script>

<style scoped>
    @import './index.css';
</style>
