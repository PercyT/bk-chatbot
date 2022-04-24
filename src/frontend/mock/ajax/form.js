/**
 * @file mock index module
 * @author neolei <neolei@tencent.com>
 */

import moment from 'moment'
import faker from 'faker'
import chalk from 'chalk'

import { randomInt, sleep } from './util'

export async function response (getArgs, postArgs, req) {
    console.log(chalk.cyan('req', req.method))
    console.log(chalk.cyan('getArgs', JSON.stringify(getArgs, null, 0)))
    console.log(chalk.cyan('postArgs', JSON.stringify(postArgs, null, 0)))
    console.log()
    const invoke = getArgs.invoke
    if (invoke === 'cc') {
        return {
            'message': 'ok',
            'code': '00',
            'data': [
                {
                    'bk_biz_id': '1',
                    'bk_biz_name': '绿色'
                },
                {
                    'bk_biz_id': '5',
                    'bk_biz_name': '全职'
                }
            ],
            'result': true
        }
    } else if (invoke === 'form') {
        return { 'result': true, 'code': 200, 'message': 'OK', 'data': { 'code': 0, 'data': [{ 'appId': 1110736386, 'label': '指尖领主', 'name': '指尖领主' }], 'message': '飞鹰公告v5游戏如下:' }, 'request_id': '8d02a367-336b-43b7-b75c-0db807210793' }
    } else if (invoke === 'formdata') {
        return {
            'result': true,
            'code': 200,
            'message': 'OK',
            'data': {
                'form_config': [
                    {
                        'type': 'picker',
                        'attrs': {
                            'name': 'name',
                            'label': '游戏名称',
                            'columns': [],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': true,
                        'required': false,
                        'loading': false,
                        'hookAble': true,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': 'Eagle.GetGameList',
                        'parser': {
                            'extract': {
                                'type': 'get',
                                'method': 'getOwnPropertyDescriptor',
                                'result': 'Object',
                                'key': 'data',
                                'args': [],
                                'next': [
                                    {
                                        'type': 'get',
                                        'method': 'getOwnPropertyDescriptor',
                                        'result': 'Array',
                                        'key': 'data',
                                        'args': [],
                                        'next': [
                                            {
                                                'type': 'assign',
                                                'method': 'assign',
                                                'result': 'Array',
                                                'key': '',
                                                'args': [],
                                                'assign': [
                                                    {
                                                        'type': 'title',
                                                        'assign_to': 'id',
                                                        'key': 'name'
                                                    },
                                                    {
                                                        'type': 'string',
                                                        'assign_to': 'name',
                                                        'key': 'label'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            'conf': {}
                        },
                        'depend': [],
                        'data': {}
                    },
                    {
                        'type': 'picker',
                        'attrs': {
                            'name': 'appId',
                            'label': '游戏id',
                            'columns': [],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': false,
                        'required': true,
                        'loading': false,
                        'hookAble': true,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': 'Eagle.GetGameList',
                        'parser': {
                            'extract': {
                                'type': 'get',
                                'method': 'getOwnPropertyDescriptor',
                                'result': 'Object',
                                'key': 'data',
                                'args': [],
                                'next': [
                                    {
                                        'type': 'get',
                                        'method': 'getOwnPropertyDescriptor',
                                        'result': 'Array',
                                        'key': 'data',
                                        'args': [],
                                        'next': [
                                            {
                                                'type': 'assign',
                                                'method': 'assign',
                                                'result': 'Array',
                                                'key': '',
                                                'args': [],
                                                'assign': [
                                                    {
                                                        'type': 'title',
                                                        'assign_to': 'id',
                                                        'key': 'appId'
                                                    },
                                                    {
                                                        'type': 'string',
                                                        'assign_to': 'name',
                                                        'key': 'label'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            'conf': {}
                        },
                        'depend': [],
                        'data': {}
                    },
                    {
                        'type': 'picker',
                        'attrs': {
                            'name': 'sceneName',
                            'label': '公告栏名称',
                            'columns': [],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': true,
                        'required': false,
                        'loading': false,
                        'hookAble': true,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': 'Eagle.GetV5NoticeScenes',
                        'parser': {
                            'extract': {
                                'type': 'get',
                                'method': 'getOwnPropertyDescriptor',
                                'result': 'Object',
                                'key': 'data',
                                'args': [],
                                'next': [
                                    {
                                        'type': 'get',
                                        'method': 'getOwnPropertyDescriptor',
                                        'result': 'Array',
                                        'key': 'data',
                                        'args': [],
                                        'next': [
                                            {
                                                'type': 'assign',
                                                'method': 'assign',
                                                'result': 'Array',
                                                'key': '',
                                                'args': [],
                                                'assign': [
                                                    {
                                                        'type': 'title',
                                                        'assign_to': 'id',
                                                        'key': 'sceneName'
                                                    },
                                                    {
                                                        'type': 'string',
                                                        'assign_to': 'name',
                                                        'key': 'label'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            'conf': {}
                        },
                        'depend': [
                            'appId'
                        ],
                        'data': {}
                    },
                    {
                        'type': 'picker',
                        'attrs': {
                            'name': 'sceneId',
                            'label': '公共栏id',
                            'columns': [],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': false,
                        'required': true,
                        'loading': false,
                        'hookAble': true,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': 'Eagle.GetV5NoticeScenes',
                        'parser': {
                            'extract': {
                                'type': 'get',
                                'method': 'getOwnPropertyDescriptor',
                                'result': 'Object',
                                'key': 'data',
                                'args': [],
                                'next': [
                                    {
                                        'type': 'get',
                                        'method': 'getOwnPropertyDescriptor',
                                        'result': 'Array',
                                        'key': 'data',
                                        'args': [],
                                        'next': [
                                            {
                                                'type': 'assign',
                                                'method': 'assign',
                                                'result': 'Array',
                                                'key': '',
                                                'args': [],
                                                'assign': [
                                                    {
                                                        'type': 'title',
                                                        'assign_to': 'id',
                                                        'key': 'sceneId'
                                                    },
                                                    {
                                                        'type': 'string',
                                                        'assign_to': 'name',
                                                        'key': 'label'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            'conf': {}
                        },
                        'depend': [
                            'appId'
                        ],
                        'data': {}
                    },
                    {
                        'type': 'field',
                        'attrs': {
                            'name': 'title',
                            'label': '主题',
                            'columns': [],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': true,
                        'required': true,
                        'loading': false,
                        'hookAble': false,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': '',
                        'parser': null,
                        'depend': [],
                        'data': {}
                    },
                    {
                        'type': 'picker',
                        'attrs': {
                            'name': 'region',
                            'label': '地区',
                            'columns': [
                                {
                                    'id': '156',
                                    'name': '中国'
                                },
                                {
                                    'id': '344',
                                    'name': '香港'
                                }
                            ],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': true,
                        'required': true,
                        'loading': false,
                        'hookAble': false,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': '',
                        'parser': null,
                        'depend': [],
                        'data': {}
                    },
                    {
                        'type': 'picker',
                        'attrs': {
                            'name': 'timeZone',
                            'label': '时区',
                            'columns': [
                                {
                                    'id': '-8',
                                    'name': 'UTC-8(北美)'
                                },
                                {
                                    'id': '8',
                                    'name': 'UTC+8(中国)'
                                }
                            ],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': true,
                        'required': true,
                        'loading': false,
                        'hookAble': false,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': '',
                        'parser': null,
                        'depend': [],
                        'data': {}
                    },
                    {
                        'type': 'datetime-picker',
                        'attrs': {
                            'name': 'beginTime',
                            'label': '开始时间',
                            'columns': [],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': true,
                        'required': true,
                        'loading': false,
                        'hookAble': false,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': '',
                        'parser': null,
                        'depend': [],
                        'data': {}
                    },
                    {
                        'type': 'datetime-picker',
                        'attrs': {
                            'name': 'endTime',
                            'label': '结束时间',
                            'columns': [],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': true,
                        'required': true,
                        'loading': false,
                        'hookAble': false,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': '',
                        'parser': null,
                        'depend': [],
                        'data': {}
                    },
                    {
                        'type': 'field',
                        'attrs': {
                            'name': 'msgContent',
                            'label': '消息内容',
                            'columns': [],
                            'show-toolbar': false,
                            'toolbar-position': 'top',
                            'title': '',
                            'item-height': 44
                        },
                        'val': '',
                        'show': false,
                        'master': true,
                        'required': true,
                        'loading': false,
                        'hookAble': false,
                        'hookUrl': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                        'hookAction': '',
                        'parser': null,
                        'depend': [],
                        'data': {}
                    }
                ],
                'key': 'INTERNAL_PLUGIN_RPC_EAGLEV5',
                'action': 'Eagle.CreateV5Notice',
                'name': '飞',
                'choose_biz': false
            },
            'request_id': '87617ce0-9f40-495b-a3ee-91918759c157'
        }
    }
}
