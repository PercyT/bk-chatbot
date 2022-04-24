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

    getIntentList (context, params, config = { fromCache: true }) {
      // mock 的地址，示例先使用 mock 地址
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/` + params.bizId + `/intent/?${AJAX_MOCK_PARAM}=intent&invoke=intentList&${queryString.stringify(params.data)}`
      return http.get(mockUrl, params, config)
    },
    getUtteranceList (context, params, config = { fromCache: true }) {
      // mock 的地址，示例先使用 mock 地址
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/` + params.bizId + `/utterance/?${AJAX_MOCK_PARAM}=intent&invoke=utteranceList&${queryString.stringify(params.data)}`
      return http.get(mockUrl, params, config)
    },
    getDBTaskList (context, params, config = { fromCache: true }) {
      // mock 的地址，示例先使用 mock 地址
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/` + params.bizId + `/tasks/?${AJAX_MOCK_PARAM}=intent&invoke=sopsDBList&${queryString.stringify(params.data)}`
      return http.get(mockUrl, params, config)
    },
    getSopsSchemes (context, params, config = { fromCache: true }) {
      // mock 的地址，示例先使用 mock 地址
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/task/` + params.bizId + `/describe_sops_schemes/?${AJAX_MOCK_PARAM}=intent&invoke=sopsSchemes&${queryString.stringify(params.data)}`
      return http.get(mockUrl, params, config)
    },
    getDevopsProjectList (context, params, config = { fromCache: true }) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/task/` + params.bizId + `/describe_devops_projects/?${AJAX_MOCK_PARAM}=intent&invoke=devopsProjectList${queryString.stringify(params.data)}`
      return http.get(mockUrl, params, config)
    },
    getDevloper (context, params, config = { fromCache: true }) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/youti/get_cp/` + `?${AJAX_MOCK_PARAM}=intent&invoke=devloper`
      return http.post(mockUrl, params, config)
    }
  }
}
