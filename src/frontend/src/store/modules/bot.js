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

    getBotTableData (context, params, config = {}) {
      // 后续为多机器人环境预留
      // const mockUrl = `${AJAX_URL_PREFIX}/api/v1/` + params.bizId + `/bot/?${AJAX_MOCK_PARAM}=intent&invoke=botList&${queryString.stringify(params.data)}`
      // return http.get(mockUrl, params, config)
      return {
        'result': true,
        'code': '200',
        'message': 'success',
        'data': {
          'count': 1,
          'next': '/api/v1/820/bot/?page=2',
          'previous': null,
          'results': [
            {
              'id': -1,
              'biz_id': '',
              'biz_name': '-',
              'bot_id': 'oCErvJo4hA3EAJYN',
              'bot_name': 'BKCHAT',
              'bot_type': 'default',
              'created_by': 'system',
              'created_at': '2021-04-23 15:58:48',
              'updated_at': '1970-01-01 00:00:00'
            },
            {
              'id': -1,
              'biz_id': '',
              'biz_name': '-',
              'bot_id': 'oCCHFER3EMFJPH',
              'bot_name': 'QQ',
              'bot_type': 'default',
              'created_by': 'system',
              'created_at': '2021-11-12 00:00:00',
              'updated_at': '1970-01-01 00:00:00'
            },
            {
              'id': -1,
              'biz_id': '',
              'biz_name': '-',
              'bot_id': 'SJHDJBRUWDWNJ',
              'bot_name': '小程序',
              'bot_type': 'default',
              'created_by': 'system',
              'created_at': '2021-11-10 16:40:48',
              'updated_at': '1970-01-01 00:00:00'
            }
          ]
        },
        'request_id': '8cae7459-42e0-4c8c-b375-470d16258e69'
      }
    },
    getBiz (context, params, config = {}) {
      const mockUrl = `${AJAX_URL_PREFIX}/api/v1/biz/describe_biz/?${AJAX_MOCK_PARAM}=cc&invoke=cc`
      return http.post(mockUrl, params, config)
    }
  }
}
