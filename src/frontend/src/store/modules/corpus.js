/**
 * @file app store
 * @author
 */

import http from '@/api'
import queryString from 'query-string'

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
    getCorpusList (context, params, config) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/corpus/manage/?${AJAX_MOCK_PARAM}=corpus&invoke=corpusList&${queryString.stringify(params)}`
      return http.get(mockUrl, params, config)
    },
    getDomainList (context, params, config) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/corpus/domain/?${AJAX_MOCK_PARAM}=corpus&invoke=domainList&${queryString.stringify(params)}`
      return http.get(mockUrl, params, config)
    },
    getIntentList (context, params, config) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/corpus/intent/?${AJAX_MOCK_PARAM}=corpus&invoke=intentList&${queryString.stringify(params)}`
      return http.get(mockUrl, params, config)
    },
    postCorpus (context, params, config) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/corpus/manage/?${AJAX_MOCK_PARAM}=corpus&invoke=postCorpus`
      return http.post(mockUrl, params, config)
    },
    putCorpus (context, params, config) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/corpus/manage/${params.id}/?${AJAX_MOCK_PARAM}=corpus&invoke=postCorpus`
      return http.put(mockUrl, params.corpus_list[0], config)
    },
    deleteCorpus (context, params, config) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/corpus/manage/${params.id}/?${AJAX_MOCK_PARAM}=corpus&invoke=deleteCorpus`
      return http.delete(mockUrl, params, config)
    },
    bulkCreateCorpus (context, params, config) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/corpus/manage/bulk_create/`
      return http.post(mockUrl, params, config)
    }
  }
}
