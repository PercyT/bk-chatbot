<template>
    <section class="code-editor"></section>
</template>
<script>
    import * as monaco from 'monaco-editor'

    const DEFAULT_OPTIONS = {
        language: 'json',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
            enabled: false
        },
        wordWrap: 'on',
        wrappingIndent: 'same'
    }
    export default {
        name: 'CodeEditor',
        props: {
            value: {
                type: String,
                default: ''
            },
            options: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data () {
            const editorOptions = Object.assign({}, DEFAULT_OPTIONS, this.options, { value: this.value })
            return {
                editorOptions,
                monacoInstance: null
            }
        },
        watch: {
            value (val) {
                const valInEditor = this.monacoInstance.getValue()
                if (val !== valInEditor) {
                    this.monacoInstance.setValue(val)
                }
            },
            options: {
                deep: true,
                handler (val) {
                    this.editorOptions = Object.assign({}, DEFAULT_OPTIONS, val, { value: this.value })
                    this.updateOptions()
                }
            }
        },
        mounted () {
            this.initInstance()
        },
        beforeDestroy () {
            if (this.monacoInstance) {
                this.monacoInstance.dispose()
            }
        },
        methods: {
            initInstance () {
                this.monacoInstance = monaco.editor.create(this.$el, this.editorOptions)
                const model = this.monacoInstance.getModel()
                model.setEOL(0) // 设置编辑器在各系统平台下 EOL 统一为 \n
                if (this.value.indexOf('\r\n') > -1) { // 转换已保存的旧数据
                    const textareaEl = document.createElement('textarea')
                    textareaEl.value = this.value
                    this.$emit('json-value-change', textareaEl.value)
                }
                model.onDidChangeContent(event => {
                    const value = this.monacoInstance.getValue()
                    this.$emit('json-value-change', value)
                })
                this.editorDidMount(this.monacoInstance)
            },
            updateOptions () {
                this.monacoInstance.updateOptions(this.editorOptions)
            },
            editorDidMount (editor) {
                setTimeout(function () {
                    editor.getAction('editor.action.formatDocument').run()
                }, 300)
            }
        }
    }
</script>
<style scoped>
    .code-editor {
        width: 500px;
        height: 100%;
    }
</style>
