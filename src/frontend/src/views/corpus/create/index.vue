<template>
    <div>
        <bk-sideslider :is-show.sync="slideSlider.isShow"
            @hidden="dialogClean" :quick-close="true" width="740">
            <div slot="header">{{ slideSlider.title }}</div>
            <div class="p20" slot="content">
                <div class="firstStepForm">
                    <bk-form>
                        <bk-form-item class="StepFormTitle">
                            <div>第一步：指定领域与意图信息</div>
                        </bk-form-item>
                        <bk-form-item
                            label="领域类型"
                            :desc="fieldDesc"
                            desc-type="icon"
                            desc-icon="icon-question-circle-shape"
                        >
                            <bk-select
                                :disabled="submitFuc === 'edit'"
                                ext-cls="select-custom"
                                v-model="firstStepForm.fieldType"
                                searchable
                                placeholder="请选择领域"
                                @change="getIntentList"
                            >
                                <bk-option v-for="option in firstStepForm.fieldTypeList"
                                    :key="option.id"
                                    :id="option.id"
                                    :name="option.name">
                                </bk-option>
                            </bk-select>
                        </bk-form-item>
                        <bk-form-item
                            label="意图类型"
                            :desc="intentDesc"
                            desc-type="icon"
                            desc-icon="icon-question-circle-shape"
                        >
                            <bk-select
                                :disabled="submitFuc === 'edit'"
                                v-model="firstStepForm.intentType"
                                searchable
                                placeholder="请选择意图"
                                @change="showSlots()"
                            >
                                <bk-option v-for="option in firstStepForm.intentTypeList"
                                    :key="option.id"
                                    :id="option.id"
                                    :name="option.name">
                                </bk-option>
                            </bk-select>
                        </bk-form-item>
                    </bk-form>
                    <div style="margin: 10px 0px" v-if="firstStepForm.intentType" class="wordSlot">
                        <bk-icon style="margin-right:5px" type="info-circle-shape" />
                        <span style="width: 200px">已选定的意图中所包含的词槽：</span>
                        <span :style="{ background: slot.color, display: block }" class="wordSlotTag" v-for="slot in firstStepForm.slots" v-bk-tooltips.top="'词槽含义： ' + slot.value" :key="slot.key">{{slot.key}}</span>
                    </div>
                </div>
                <div class="secondStepForm">
                    <bk-form style="justify-content: center;align-items:center;">
                        <bk-form-item class="StepFormTitle">
                            <div>第二步：语句录入</div>
                        </bk-form-item>
                        <div style="margin-left:0">
                            <div class="statementIncrement">
                                <bk-input :clearable="true" v-model="slotsText"></bk-input>
                                <bk-button theme="primary" title="添加" icon="plus" @click="storeSlots">添加</bk-button>
                            </div>
                        </div>
                    </bk-form>
                </div>
                <div class="secondStepForm" style="height: 150px;overflow-x: scroll">
                    <bk-form style="justify-content: center;align-items:center;">
                        <bk-form-item class="StepFormTitle">
                            <div>第三步：词槽标注</div>
                        </bk-form-item>
                        <div>
                            <div style="width: 100%;">
                                <div style="position: relative;">
                                    <div style="position: absolute;white-space:nowrap;overflow-x: auto" v-html="thirdStepForm.showText"></div>
                                    <div @mouseup="show" style="position: absolute;overflow-x: auto;white-space:nowrap;color:transparent;background:transparent">{{thirdStepForm.hiddenText}}</div>
                                </div>
                            </div>
                        </div>
                    </bk-form>
                </div>
            </div>
            <div slot="footer">
                <bk-button style="margin-left: 30px;" theme="primary" @click="submitFormData">确定
                </bk-button>
                <bk-button theme="default" @click="slideSlider.isShow = false">关闭</bk-button>
                <div id="demo" ref="demo">
                    <div class="slot-item" @click="changeSlotColor(slot.color, slot.key, slot.value)" v-for="slot in firstStepForm.slots" :key="slot.key">
                        <div :style="{ background: slot.color }" class="slot-circle"></div>
                        <div>{ {{slot.key}} }</div>
                        <div>{ {{slot.value}} }</div>
                    </div>
                    <div class="slot-delete" @click="deleteSlot">
                        <bk-icon type="close-circle" style="font-size: 18px" />
                        解绑词槽</div>
                </div>
            </div>
        </bk-sideslider>
    </div></template>

<script>
    // document.onmousedown = function (event) {
    //     event = event || window.event
    //     console.log(event)
    //     const target = event.path
    //     // console.log(targetId)
    //     // console.log(this.$refs)
    //     if (target !== 'demo') {
    //         document.getElementById('demo').style.display = 'none' // eslint-disable-line
    //     }
    // }

    export default {
        data () {
            return {
                colorList: ['#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6', '#2E8BC0', '#B1D4E0', '#BCECE0', '#36EEE0', '#F79489', '#F9F1F0', '#409EFF'],
                slideSlider: {
                    title: '新增语料',
                    isShow: false
                },
                fieldDesc: {
                    placement: 'top-start',
                    width: 190,
                    content: '请选择语料所属的领域，建议在选择意图前先完成语料指定'
                },
                intentDesc: {
                    placement: 'top-start',
                    width: 190,
                    content: '请选择语料所属的意图类型，选择后请参考弹出的词槽提示'
                },
                firstStepForm: {
                    fieldType: '',
                    fieldTypeList: [
                    ],
                    intentType: '',
                    intentTypeList: [
                    ],
                    slots: []
                },
                secondStepForm: {
                    stateMent: '',
                    stateMentList: []
                },
                thirdStepForm: {
                    showText: '',
                    hiddenText: '',
                    submitSlots: []
                },
                useColorList: [],
                slotsText: '',
                selectList: [],
                primaryMessage: '选择你导入的构建机并填写相关信息，系统将为你安装必要的软件',
                errorMessage: '系统错误，请稍后重试',
                warningMessage: '系统即将于19：00-21：00进行升个级，请及时保存你的资料',
                successMessage: '语料创建成功',
                submitFuc: '',
                corpusId: ''
            }
        },
        methods: {
            show (e) {
                const that = this
                const range = window.getSelection().getRangeAt(0)
                const end = window.getSelection().anchorOffset
                const start = window.getSelection().focusOffset
                this.start = start
                this.end = end
                // console.log(range.startContainer.parentNode)
                // console.log(range.startContainer.parentNode.querySelectorAll('span').length)
                // console.log(window.getSelection().toString())
                this.range = range
                this.text = window.getSelection().toString()
                setTimeout(function () {
                    if (range.cloneContents().querySelectorAll('span').length === 0 && window.getSelection().toString() !== '') {
                        that.showBox(e.clientX, e.clientY)
                    }
                }, 100)
            },
            dialogClean () {
                this.submitFuc = ''
                this.corpusId = ''
                this.firstStepForm = {
                    fieldType: '',
                    fieldTypeList: [
                    ],
                    intentType: '',
                    intentTypeList: [
                    ],
                    slots: []
                }
                this.secondStepForm = {
                    stateMent: '',
                    stateMentList: []
                }
                this.thirdStepForm = {
                    showText: '',
                    hiddenText: '',
                    submitSlots: []
                }
                this.useColorList = []
                this.slotsText = ''
                this.selectList = []
            },
            storeSlots (obj, data) {
                this.thirdStepForm.showText = this.slotsText
                this.thirdStepForm.hiddenText = this.slotsText
                if (data) {
                    for (const item of data.slots) {
                        if (item.key !== 'dontcolortext') {
                            this.selectList.push({ color: item.color, start: item.index[0], end: item.index[1], key: item.key, value: item.value })
                            this.firstStepForm.slots = data.intent.color
                            this.changeColorCommon()
                        } else if (item.key === 'dontcolortext' && data.slots.length === 1) {
                            this.firstStepForm.slots = data.intent.color
                        }
                    }
                } else {
                    this.selectList = []
                }
            },
            // changeSlotColor (color) {
            //     // const that = this
            //     if (this.range.cloneContents().querySelectorAll('span').length === 0 && this.text !== '') {
            //         this.$refs.demo.style.display = null
            //         const docObj = this.range.extractContents() // 移动了Range 中的内容从文档树到DocumentFragment（文档片段对象)。
            //         const dom = document.createElement('span')
            //         dom.style.backgroundColor = color
            //         dom.style.userSelect = 'none'
            //         dom.style.borderRadius = '10px'
            //         dom.style.display = 'inline-block'
            //         dom.style.color = '#FFFFFF'
            //         this.currentColor = color
            //         dom.appendChild(docObj)
            //         this.range.insertNode(dom)
            //     }
            // },
            changeColorCommon () {
                const tempArray = this.slotsText.split('')
                for (const item of this.selectList) {
                    tempArray[item.start] = `<span class="color-span" style="background-color: ${item.color}">` + tempArray[item.start]
                    tempArray[item.end - 1] = tempArray[item.end - 1] + '</span>'
                }
                this.thirdStepForm.showText = tempArray.join('')
                const sortSelectList = this.selectList
                sortSelectList.sort((x, y) => {
                    return x.start - y.start
                })
                this.thirdStepForm.submitSlots = []
                let temp = 0
                for (let i = 0; i < sortSelectList.length; i++) {
                    if (i === 0) {
                        if (sortSelectList[i].start !== 0) {
                            this.thirdStepForm.submitSlots.push({ index: [0, sortSelectList[i].start], key: 'dontcolortext', value: 'dontcolortext' })
                        }
                        temp = sortSelectList[i].end
                    }
                    if (i !== 0) {
                        if (temp !== sortSelectList[i].start) {
                            this.thirdStepForm.submitSlots.push({ index: [temp, sortSelectList[i].start], key: 'dontcolortext', value: 'dontcolortext' })
                            temp = sortSelectList[i].end
                        }
                    }
                    this.thirdStepForm.submitSlots.push({ index: [sortSelectList[i].start, sortSelectList[i].end], key: sortSelectList[i].key, value: sortSelectList[i].value })
                    if (i === sortSelectList.length - 1) {
                        if (sortSelectList[i].end !== this.thirdStepForm.hiddenText.length) {
                            this.thirdStepForm.submitSlots.push({ index: [sortSelectList[i].end, this.thirdStepForm.hiddenText.length], key: 'dontcolortext', value: 'dontcolortext' })
                        }
                    }
                }
                console.log(this.thirdStepForm.submitSlots)
            },
            changeSlotColor (color, key, value) {
                if (this.start > this.end) {
                    [this.start, this.end] = [this.end, this.start]
                }
                this.$refs.demo.style.display = null
                let pass = this.selectList.every((item) => {
                    return item.start >= this.end || item.end <= this.start
                })
                for (let i = 0; i < this.selectList.length; i++) {
                    if (this.selectList[i].start === this.start && this.selectList[i].end === this.end) {
                        pass = false
                        this.selectList[i].key = key
                        this.selectList[i].value = value
                        this.selectList[i].color = color
                    }
                }
                if (pass) {
                    this.selectList.push({ key: key, value: value, color: color, start: this.start, end: this.end })
                }
                this.changeColorCommon()
            },
            deleteSlot () {
                if (this.start > this.end) {
                    [this.start, this.end] = [this.end, this.start]
                }
                this.$refs.demo.style.display = null
                let same = -1
                for (let i = 0; i < this.selectList.length; i++) {
                    if (this.selectList[i].start === this.start && this.selectList[i].end === this.end) {
                        same = i
                    }
                }
                if (same !== -1) {
                    this.selectList.splice(same, 1)
                }
                this.changeColorCommon()
            },
            async submitFormData () {
                if (this.thirdStepForm.submitSlots.length === 0) {
                    this.thirdStepForm.submitSlots.push({
                        'key': 'dontcolortext',
                        'value': 'dontcolortext',
                        'index': [0, this.thirdStepForm.hiddenText.length]
                    })
                }
                const params = {
                    'intent_id': this.firstStepForm.intentType,
                    'data_source': '1',
                    'corpus_list': [{
                        'slots': this.thirdStepForm.submitSlots,
                        'text': this.thirdStepForm.hiddenText
                    }],
                    'id': this.corpusId
                }
                let response = {}
                if (this.submitFuc === 'create') {
                    response = await this.$store.dispatch('corpus/postCorpus', params)
                } else if (this.submitFuc === 'edit') {
                    console.log(params)
                    response = await this.$store.dispatch('corpus/putCorpus', params)
                }
                console.log(response)
                if (response.result === true) {
                    this.handleSuccess({ theme: 'success' })
                    this.slideSlider.isShow = false
                    this.$emit('getCorpusList')
                }
            },
            showBox (mouseX, mouseY) {
                this.$refs.demo.style.display = 'block'
                this.$refs.demo.style.left = mouseX + 'px'
                this.$refs.demo.style.top = mouseY + 'px'
            },
            change (dom) {
                document.getElementById(this.currentID).style.color = '#EEEEEE'
            },
            dialogOpen (dialogName, obj) {
                if (dialogName === 'corpusCreate') {
                    this.submitFuc = 'create'
                    this.getDomainList()
                } else if (dialogName === 'corpusEdit') {
                    this.submitFuc = 'edit'
                    this.getDomainList()
                    this.firstStepForm.fieldType = obj.domain.id
                    this.getIntentList()
                    this.firstStepForm.intentType = obj.intent.id
                    this.slotsText = obj.text
                    this.storeSlots('null', obj)
                    this.corpusId = obj.id
                    console.log(obj)
                }
                this.slideSlider.isShow = true
            },
            async getDomainList () {
                const response = await this.$store.dispatch('corpus/getDomainList')
                this.firstStepForm.fieldTypeList = response.data.map((e) => {
                    return { 'id': e.id, 'name': e.domain_name }
                })
            },
            async getIntentList () {
                const response = await this.$store.dispatch('corpus/getIntentList', { domain_id: this.firstStepForm.fieldType })
                this.firstStepForm.intentTypeList = response.data.map((e) => {
                    return { 'id': e.id, 'name': e.intent_name, 'slots': e.slots }
                })
            },
            showSlots () {
                this.useColorList = []
                for (let i = 0; i < this.firstStepForm.intentTypeList.length; i++) {
                    if (this.firstStepForm.intentTypeList[i].id === this.firstStepForm.intentType) {
                        this.firstStepForm.slots = this.firstStepForm.intentTypeList[i].slots
                    }
                }
                for (let j = 0; j < this.firstStepForm.slots.length; j++) {
                    this.firstStepForm.slots[j].color = this.getDifferentColor()
                    this.useColorList.push(this.firstStepForm.slots[j].color)
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
                for (let i = 0; i < this.useColorList.length; i++) {
                    if (color === this.useColorList[i]) {
                        return true
                    }
                }
                return false
            },
            getColor () {
                return this.colorList[Math.floor(Math.random() * 10)]
            },
            handleSuccess (config) {
                config.message = this.successMessage
                config.offsetY = 80
                this.$bkMessage(config)
            }
        }
    }
</script>

<style>
@import './index.css';
#demo {
            position: fixed;
            left: 0;
            top: 0;
            display: none;
   background-color: #ffffff;
   box-shadow:0 0 5px #888888;
}
</style>
