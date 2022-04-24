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
    if (invoke === 'corpusList') {
        return {
            'count': 11,
            'data': [
                {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                },
                {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                },
                {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                },
                {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                }, {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                }, {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                }, {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                }, {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                }, {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                }, {
                    'id': 1,
                    'domain': {
                        'id': 1,
                        'name': 'APP'
                    },
                    'intent': {
                        'id': 1,
                        'name': '测试意图',
                        'slots': {
                            'biz': '项目名称',
                            'name': '业务名称'
                        }
                    },
                    'data_source': '111',
                    'text': '我需要王者荣耀，还是英雄联盟wwwwwwwwwwwwwwwwwwww',
                    'slots': [
                        {
                            'key': 'name',
                            'value': '名称',
                            'index': [
                                0, 1
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                1, 3
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                3,
                                7
                            ]
                        },
                        {
                            'key': 'dontcolortext',
                            'value': 'dontcolortext',
                            'index': [
                                7,
                                10
                            ]
                        },
                        {
                            'key': 'biz',
                            'value': '项目名称',
                            'index': [
                                10,
                                30
                            ]
                        }
                    ],
                    'created_at': '2021-11-18 19:27:00',
                    'created_by': 'admin',
                    'updated_at': '2021-11-18 19:27:00',
                    'updated_by': 'admin'
                }
            ],
            'request_id': '092a0466-6172-489d-be18-c43b66424f14',
            'result': true,
            'code': 200,
            'message': 'OK'
        }
    } else if (invoke === 'domainList') {
        return {
            'count': 1,
            'data': [
                {
                    'id': 1,
                    'domain_key': 'APP',
                    'domain_name': 'APP',
                    'created_at': '2021-11-18 19:22:33'
                }
            ],
            'request_id': 'dc8bba16-f3da-4230-b9e5-37be5b0a6b06',
            'result': true,
            'code': 200,
            'message': 'OK'
        }
    } else if (invoke === 'intentList') {
        return {
            'count': 1,
            'data': [
                {
                    'id': 1,
                    'domain_id': 1,
                    'intent_key': 'test',
                    'intent_name': '测试意图',
                    'slots': [
                        {
                            'key': 'biz',
                            'value': '项目名称'
                        },
                        {
                            'key': 'name',
                            'value': '业务名称'
                        }
                    ],
                    'created_at': '2021-11-18 19:23:59'
                }
            ],
            'request_id': '97550720-7a24-4363-9008-4b0b31fa38d6',
            'result': true,
            'code': 200,
            'message': 'OK'
        }
    } else if (invoke === 'postCorpus') {
        return {
            'result': true,
            'code': 200,
            'message': 'OK',
            'data': {},
            'request_id': 'da991e54-5924-44b4-bef7-0e597c538535'
        }
    }
    return {
        code: 0,
        data: {}
    }
}
