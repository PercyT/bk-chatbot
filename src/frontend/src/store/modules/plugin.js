/**
 * @file app store
 * @author
 */

import http from '@/api'
// import queryString from 'query-string'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    // 如果需要 mock，那么只需要在 url 后加上 AJAX_MOCK_PARAM 的参数，
    // 参数值为 mock/ajax 下的路径和文件名，然后加上 invoke 参数，参数值为 AJAX_MOCK_PARAM 参数指向的文件里的方法名
    // 例如本例子里，ajax 地址为 table_data，mock 地址为 table_data?AJAX_MOCK_PARAM=index&invoke=getTableData

    /**
         * enterExample1 请求，get 请求
         *
         * @param {Object} context store 上下文对象 { commit, state, dispatch }
         * @param {Object} params 请求参数
         *
         * @return {Promise} promise 对象
         */
    getPluginList (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/?plugin_status=3&&plugin_type=1&&page=1&&pagesize=500&&biz_id=${params.bizId}`
      return http.get(url, params)
    },
    getPrivatePluginList (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/?plugin_status=3&&biz_id=${params.bizId}&&page=1&&pagesize=500`
      return http.get(url, params)
    },
    getPluginListByPopularity (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/?plugin_status=3&&plugin_type=1&&page=1&&pagesize=500&&plugin_lately_count=30&&biz_id=${params.bizId}`
      return http.get(url, params)
    },
    getPluginListByRecentAdditions (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/?plugin_status=3&&plugin_type=1&&created_at_min=${params.createAtMin}&&biz_id=${params.bizId}`
      return http.get(url, params)
    },
    getAllPluginListByName (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/private/?plugin_name=${params.pluginName}&&page=${params.page}&&pagesize=${params.pagesize}`
      return http.get(url, params)
    },
    retrievePlugin (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/${params.id}/`
      return http.get(url, params)
    },
    CreatePlugin (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/`
      return http.post(url, params)
    },
    getAllPluginList (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/private/?page=${params.page}&&pagesize=${params.pagesize}`
      return http.get(url, params)
    },
    updatePlugin (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/${params.id}/`
      return http.put(url, params)
    },
    deletePlugin (context, params) {
      const url = `${AJAX_URL_PREFIX}/api/v1/manage/plugin/${params.id}/`
      return http.delete(url, params)
    }
  }
}
