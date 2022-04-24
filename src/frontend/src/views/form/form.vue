<template>
    <div class="container">
        <van-form v-if="!isCommit" @submit="onSubmit">
            <div v-show="loading">
                <br />
                <van-skeleton title :row="10" :round="true" />
            </div>
            <div v-show="!loading">
                <div class="title">{{name}}</div>
                <div class="bizovDivider"></div>
                <div v-for="(data, index) in datas" :key="index">
                    <div v-if="data.type === 'field'">
                        <van-field
                            v-model="data.val"
                            :name="data.attrs.name"
                            :label="data.attrs.label"
                            :placeholder="data.attrs.label"
                            :autosize="true"
                            :rules="[{ required: true, message: '请填写' + data.attrs.label }]"
                        />
                    </div>
                    <div v-else-if="data.type === 'picker'">
                        <van-field
                            readonly
                            clickable="false"
                            :name="data.attrs.name"
                            :value="data.val"
                            :label="data.attrs.label"
                            :placeholder="data.attrs.label"
                            @click="changePickerShow(index)"
                        />
                        <van-popup v-model="data.show" :lazy-render="lazyRender" position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="data.attrs.values"
                                :ref="'picker' + index"
                                :loading="data.loading"
                                @confirm="onConfirm(index)"
                                @cancel="data.show = false"
                                @change="checkScroll"
                            />
                        </van-popup>
                    </div>
                    <div v-else-if="data.type === 'datetime-picker'">
                        <van-field
                            readonly
                            clickable
                            :name="data.attrs.name"
                            :value="data.val"
                            :label="data.attrs.label"
                            :placeholder="data.attrs.label"
                            @click="data.show = true"
                        />
                        <van-popup v-model="data.show" :lazy-render="lazyRender" position="bottom">
                            <van-datetime-picker
                                :type="data.attrs.type"
                                :ref="'picker' + index"
                                :min-date="minDate"
                                :max-date="maxDate"
                                @confirm="onConfirmDateTime(index)"
                                @cancel="data.show = false"
                            />
                        </van-popup>
                    </div>
                    <div v-else-if="data.type === 'calendar'">
                        <van-field
                            readonly
                            clickable
                            :name="data.attrs.name"
                            :value="data.val"
                            :label="data.attrs.label"
                            :placeholder="data.attrs.label"
                            @click="data.show = true"
                        />
                        <van-calendar v-model="data.show" :ref="'picker' + index" @confirm="onConfirmCalendar(index)" />
                    </div>
                    <div v-else-if="data.type === 'switch'">
                        <van-field :name="data.attrs.name"
                            :label="data.attrs.label">
                            <template slot="input">
                                <van-switch v-model="data.attrs.bool" size="20" />
                            </template>
                        </van-field>
                    </div>
                    <div v-else-if="data.type === 'radio'">
                        <van-field :name="data.attrs.name" :label="data.attrs.label">
                            <template slot="input">
                                <van-radio-group v-model="data.attrs.radio" direction="horizontal">
                                    <van-radio name="1">单选框 1</van-radio>
                                    <van-radio name="2">单选框 2</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                    </div>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="info" square="true" native-type="submit">提交</van-button>
                </div>
            </div>
        </van-form>
        <div v-else class="flexBox">
            <van-icon class="innerIcon" name="certificate" />
            <div class="commit-text">
                提交成功
                <van-button class="again-button" type="primary" @click="again">再来一单</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Button, Form, Field, Picker, Popup, DatetimePicker, Calendar, Cell, Switch, RadioGroup, Radio, Toast, Icon, Skeleton } from 'vant'
    import { mapGetters } from 'vuex'
    import { formatDate } from '../../common/util'
    // import CryptoJS from 'crypto-js'
    export default {
        name: 'form',
        components: {
            [Switch.name]: Switch,
            [Button.name]: Button,
            [Form.name]: Form,
            [Field.name]: Field,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            [Calendar.name]: Calendar,
            [Cell.name]: Cell,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Toast.name]: Toast,
            [Icon.name]: Icon,
            [Skeleton.name]: Skeleton
        },
        data () {
            return {
                datas: [],
                lazyRender: false,
                minDate: new Date(2021, 0, 1),
                maxDate: new Date(2025, 10, 1),
                biz_id: '-1',
                bizList: [],
                isCommit: false,
                loading: true,
                secret: '',
                key: '',
                action: '',
                name: '单据填写',
                choose_biz: true,
                requiredList: []
            }
        },
        computed: {
            ...mapGetters(['bizList', 'user'])
        },
        created () {
            this.secret = this.$route.params.id
            this.getBiz(this.secret)
        },
        updated () {
            this.checkScroll()
        },
        methods: {
            // decrypt (str, key = 'k1DIdzc%DvkC01cV', iv = '8310900090690856') {
            //     const r = CryptoJS.enc.Utf8.parse(iv)
            //     const n = CryptoJS.enc.Utf8.parse(key)
            //     const o = CryptoJS.AES.decrypt(str, n, {
            //         iv: r,
            //         mode: CryptoJS.mode.CBC,
            //         padding: CryptoJS.pad.Pkcs7
            //     })
            //     return CryptoJS.enc.Utf8.stringify(o).toString()
            // },
            async onSubmit (values) {
                for (let i = 0; i < this.datas.length; i++) {
                    const name = this.datas[i].attrs.name
                    if (this.datas[i].type === 'picker') {
                        const index = this.datas[i].attrs.values.indexOf(values[name])
                        values[name] = this.datas[i].attrs.keys[index]
                    } else if (this.datas[i].type === 'datetime-picker') {
                        values[name] = formatDate(new Date(values[name]), 'yyyy-MM-dd hh:mm:ss')
                    }
                    if (this.datas[i].master) {
                        const bindValue = this.datas[i].attrs.bind_value
                        if (bindValue) {
                            for (let j = 0; j < bindValue.length; j++) {
                                if (values[name] === bindValue[j][name]) {
                                    const bindKey = this.datas[i].attrs.bind_key
                                    for (let k = 0; k < bindKey.length; k++) {
                                        const parmName = bindKey[k]
                                        values[parmName] = bindValue[j][parmName]
                                    }
                                }
                            }
                        }
                    }
                }
                for (const key in values) {
                    if (this.requiredList.indexOf(key) === -1) {
                        delete values[key]
                    }
                }
                const result = {
                    'cc_id': this.biz_id + '',
                    'data': values,
                    'user_name': this.$store.state.user.username,
                    'action': this.action,
                    'key': this.key
                }
                console.log(result)
                try {
                    const response = await this.$store.dispatch('form/getCall', result)
                    if (response.result) {
                        this.isCommit = true
                    } else {
                        Toast('表单填写有误')
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            onConfirm (index) {
                const pickerRef = 'picker' + index
                this.datas[index].val = this.$refs[pickerRef][0].getValues()[0]
                console.log(this.datas[index])
                if (this.datas[index].attrs.bind_key) {
                    for (const item of this.datas[index].attrs.bind_key) {
                        for (let i = 0; i < this.datas.length; i++) {
                            if (this.datas[i].attrs.name === item) {
                                this.datas[i].val = this.datas[index].val
                            }
                        }
                    }
                }
                this.datas[index].show = false

                // 获取到业务名称后，根据cc_id刷新整个列表
                if (index === 0 && this.choose_biz) {
                    this.biz_id = this.datas[0].attrs.keys[this.datas[0].attrs.values.indexOf(this.datas[index].val)]
                    this.getBizInfo()
                }
            },
            getBiz (secret) {
                const that = this
                that.$store.dispatch('bot/getBiz', {}, {}).then((response) => {
                    const bizList = response.data || []
                    for (let i = 0; i < bizList.length; i++) {
                        that.bizList.push({
                            'name': bizList[i].bk_biz_name,
                            'id': bizList[i].bk_biz_id
                        })
                    }
                    that.$store.dispatch('form/getFormData', { 'secret': secret }, {}).then((formResponse) => {
                        // axios.post(`${AJAX_URL_PREFIX}/api/v1/plugin/get_h5_config/`, { 'secret': secret }).then((formResponse) => {
                        that.key = formResponse.data.key
                        that.action = formResponse.data.action
                        that.name = formResponse.data.name
                        that.choose_biz = formResponse.data.choose_biz
                        let datas = formResponse.data.form_config || []
                        if (datas.length !== 0) {
                            for (let j = 0; j < datas.length; j++) {
                                if (datas[j].master) {
                                    datas[j].attrs.bind_key = []
                                    for (let k = 0; k < datas.length; k++) {
                                        if (j !== k && datas[j].hookUrl === datas[k].hookUrl && datas[j].hookAction === datas[k].hookAction && !datas[k].master) {
                                            datas[j].attrs.bind_key.push(datas[k].attrs.name)
                                            console.log(datas[k].attrs.name)
                                        }
                                    }
                                } else {
                                    datas[j].type = 'NULL'
                                }
                                if (datas[j].required) {
                                    that.requiredList.push(datas[j].attrs.name)
                                }
                            }
                            if (this.choose_biz) {
                                this.biz_id = ''
                                datas.unshift({
                                    'type': 'picker',
                                    'attrs': {
                                        'name': 'biz_id',
                                        'columns': that.bizList,
                                        'label': '业务名称',
                                        'show-toolbar': false,
                                        'toolbar-position': 'top',
                                        'title': '',
                                        'item-height': 44
                                    },
                                    'val': '',
                                    'show': false,
                                    'hookable': true,
                                    'hookurl': '',
                                    'data': {}
                                })
                            }
                            for (let i = 0; i < datas.length; i++) {
                                if (datas[i].type === 'picker') {
                                    datas = that.columnToKey(datas, i)
                                }
                            }
                            that.datas = [...datas]
                            that.$nextTick(function () {
                                that.$forceUpdate()
                            })
                            that.loading = false
                            if (!this.choose_biz) {
                                this.getBizInfo()
                            }
                        } else {
                            console.error('数据为空')
                        }
                        console.log(this.datas)
                    })
                })
            },
            columnToKey (datas, i) {
                datas[i].attrs.keys = []
                datas[i].attrs.values = []
                for (let j = 0; j < datas[i].attrs.columns.length; j++) {
                    datas[i].attrs.keys.push(datas[i].attrs.columns[j].id)
                    datas[i].attrs.values.push(datas[i].attrs.columns[j].name)
                }
                return datas
            },
            async getBizInfo () {
                for (let i = 0; i < this.datas.length; i++) {
                    const current = this.datas[i]
                    if (current.hookAble === true) {
                        const params = {
                            'key': current.hookUrl,
                            'action': current.hookAction,
                            'user_name': this.$store.state.user.username,
                            'cc_id': this.biz_id + ''
                        }
                        if (current.depend.length === 0) {
                            params.data = {}
                            const response = await this.$store.dispatch('form/getCall', params)
                            if (response.data.data === undefined) {
                                this.datas[i].loading = false
                                console.log('没有数据')
                            } else {
                                this.datas[i].attrs.bind_value = response.data.data
                                this.datas[i].attrs.columns = this.parserData(current.parser.extract, response)
                                this.columnToKey(this.datas, i)
                            }
                        }
                        this.datas[i].loading = false
                    }
                }
            },
            parserData (parser, data) {
                if (parser.method === 'getOwnPropertyDescriptor') {
                    const parserdData = Object.getOwnPropertyDescriptor(data, parser.key)
                    if (parser.next !== undefined) {
                        return this.parserData(parser.next[0], parserdData.value)
                    } else {
                        return parserdData.value
                    }
                } else if (parser.method === 'assign') {
                    const parserdData = []
                    const keyId = parser.assign[0]['key']
                    const keyName = parser.assign[1]['key']
                    data.map(function (item) {
                        parserdData.push({
                            'id': item[keyId],
                            'name': item[keyName]
                        })
                    })
                    if (parser.next !== undefined) {
                        return this.parserData(parser.next[0], parserdData.value)
                    } else {
                        return parserdData
                    }
                } else {
                    const parserdData = Object.entries(data)
                    if (parser.next !== undefined) {
                        return this.parserData(parser.next[0], parserdData)
                    } else {
                        return parserdData
                    }
                }
            },
            onConfirmDateTime (index) {
                const pickerRef = 'picker' + index
                if (this.datas[index].attrs.type === 'date') {
                    this.datas[index].val = this.$refs[pickerRef][0].getPicker().getValues().join('-')
                } else {
                    const time = this.$refs[pickerRef][0].getPicker().getValues()
                    const newTime = time.slice(0, 3).join('/') + ' ' + time.slice(3, 5).join(':')
                    this.datas[index].val = newTime
                }
                this.datas[index].show = false
            },
            onConfirmCalendar (index) {
                const pickerRef = 'picker' + index
                const date = this.$refs[pickerRef][0]._data.currentDate
                const val = `${date.getMonth() + 1}/${date.getDate()}`
                this.datas[index].val = val
                this.datas[index].show = false
            },
            checkScroll () {
                this.$nextTick(() => {
                    // 获取选中元素
                    const selectItems = [...document.querySelectorAll('.van-picker-column__item--selected')]
                    selectItems.forEach(item => {
                        const child = item.querySelector('.van-ellipsis')
                        if (child.offsetWidth > item.offsetWidth) {
                            item.classList.add('scroll')
                        } else {
                            item.classList.remove('scroll')
                        }
                    })
                })
            },
            changePickerShow (index) {
                this.datas[index].show = true
                // 如果当前picker column为空进行的操作
                if (this.datas[index].attrs.columns.length === 0) {
                    this.datas[index].loading = true
                    console.log(this.choose_biz)
                    if (this.choose_biz && this.biz_id === '') {
                        Toast('请先填写业务名称')
                    } else if (this.datas[index].depend.length !== 0) {
                        this.getDependInfo(index)
                    } else {
                        this.datas[index].loading = false
                    }
                }
            },
            again () {
                for (let i = 0; i < this.datas.length; i++) {
                    this.datas[i].val = ''
                }
                this.isCommit = false
            },
            async getDependInfo (index) {
                const current = this.datas[index]
                const params = {
                    'key': current.hookUrl,
                    'action': current.hookAction,
                    'user_name': this.$store.state.user.username,
                    // 'user_name': 'julianshu',
                    'cc_id': this.biz_id + ''
                }
                for (let j = 0; j < this.datas.length; j++) {
                    const currentIn = this.datas[j]
                    if (currentIn.attrs.name === current.depend[0]) {
                        if (currentIn.val === '') {
                            Toast('请先填写' + currentIn.attrs.label)
                        } else {
                            params.data = {
                                [current.depend[0]]: currentIn.attrs.keys[currentIn.attrs.values.indexOf(currentIn.val)]
                                // [current.depend[0]]: '100703379'
                            }
                            const response = await this.$store.dispatch('form/getCall', params)
                            this.datas[index].attrs.columns = this.parserData(current.parser.extract, response)
                            this.datas[index].attrs.bind_value = response.data.data
                            this.columnToKey(this.datas, index)
                            this.datas[index].loading = false
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
.container {
    background: #F6F7F9;
    height: 2000px;
    .van-cell--borderless::after, .van-cell:last-child::after {
        display: inline-block;
    }
    .title {
        font-size: 20px;
        padding: 10px 0 10px 15px;
        background: #ffffff;
    }
    .bizovDivider {
        display: block;
        height: 1px;
        width: 100%;
        /* margin: 20rpx 0; */
        clear: both;
        border-top: 7px solid #F6F7F9;
    }
}
/deep/ .van-picker-column__item--selected {
  /* 重写选中后的效果 */
  .van-ellipsis {
    text-overflow: unset;
    overflow: visible;
  }
  /* 增加scroll类 */
  &.scroll > .van-ellipsis {
    animation: move 8s linear infinite;
  }
}
@keyframes move {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.innerIcon {
    position: absolute;
    top: 30%;
    left: 50%;
    color: #42b983;
    font-size: 200px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.flexBox {
    display: flex;
    flex-direction: column;
}
.van-skeleton__row {
    height: 30px;
}
.van-skeleton__title {
    height: 30px;
}
.commit-text {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.again-button {
    margin-top: 20px;
}
</style>
