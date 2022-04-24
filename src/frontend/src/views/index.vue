<template>
    <router-view :key="$route.path" :biz-id="bizId" @doHeader="doHeader"></router-view>
</template>

<script>
    export default {
        props: {
            bizId: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
            doHeader (val, sub) {
                this.$emit('doHeader', val, sub)
            }
        }
    }
</script>
