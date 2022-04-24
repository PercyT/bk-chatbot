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
    if (invoke === 'getUserInfo') {
        return {
            code: 0,
            data: {
                id: '1234567890',
                username: 'admin',
                timestamp: +new Date()
            },
            message: 'ok'
        }
    } else if (invoke === 'botList') {
        return {
            'result': true,
            'code': '200',
            'message': 'success',
            'data': {
                'count': 14,
                'next': '/api/v1/820/bot/?page=2',
                'previous': null,
                'results': [
                    {
                        'id': 1,
                        'biz_id': 820,
                        'biz_name': '-',
                        'bot_id': 'oCErvJo4hA3EAJYN',
                        'bot_name': 'helloworld',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 2,
                        'biz_id': 100661,
                        'biz_name': '-',
                        'bot_id': 'u1VqyUdV7jbu7dea',
                        'bot_name': 'nba-demo',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 3,
                        'biz_id': 100204,
                        'biz_name': '-',
                        'bot_id': 'qkUdVLkggqmu9Cqh',
                        'bot_name': 'test1',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 4,
                        'biz_id': 100832,
                        'biz_name': '-',
                        'bot_id': 'jU2OWzOxBNCAvpQR',
                        'bot_name': 'sjjq',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 5,
                        'biz_id': 100846,
                        'biz_name': '-',
                        'bot_id': 'nSRoAcJVkjqu51uJ',
                        'bot_name': 'patch上传cos',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 6,
                        'biz_id': 820,
                        'biz_name': '-',
                        'bot_id': 'fBR8SEjMIr4PU6ID',
                        'bot_name': 'hahahaha',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 7,
                        'biz_id': 133,
                        'biz_name': '-',
                        'bot_id': 'PsGYQkCIJVHk8qdJ',
                        'bot_name': 'opsbot',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 8,
                        'biz_id': 198,
                        'biz_name': '-',
                        'bot_id': 'txasepp58L3K316x',
                        'bot_name': '上古机器人',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 9,
                        'biz_id': 270,
                        'biz_name': '-',
                        'bot_id': 'ip6vqwyCIwXCYiFT',
                        'bot_name': '上古机器人',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    },
                    {
                        'id': 10,
                        'biz_id': 100430,
                        'biz_name': '-',
                        'bot_id': 'ROX7zForYuUvbSX4',
                        'bot_name': 'test',
                        'bot_type': 'default',
                        'created_by': null,
                        'created_at': '2021-04-23T15:58:48.406062',
                        'updated_at': null
                    }
                ]
            },
            'request_id': '8cae7459-42e0-4c8c-b375-470d16258e69'
        }
    } else if (invoke === 'intentList') {
        return {
            'result': true,
            'code': '200',
            'message': 'success',
            'data': [
                {
                    'id': 11,
                    'serial_number': 1,
                    'biz_id': 820,
                    'index_id': 1,
                    'intent_name': 'cloud1重启cloud1重启cloud1重启cloud1重启cloud1重启cloud1重启cloud1重启',
                    'status': true,
                    'available_user': [
                        'lei'
                    ],
                    'available_group': [
                        'w214141'
                    ],
                    'developer': [],
                    'is_commit': false,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 12,
                    'biz_id': 100846,
                    'index_id': 5,
                    'serial_number': 1,
                    'intent_name': '客户端上传cos',
                    'status': true,
                    'available_user': [
                        'mli',
                        'anchen'
                    ],
                    'available_group': [
                        '301363',
                        '034272'
                    ],
                    'is_commit': false,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 13,
                    'biz_id': 100846,
                    'index_id': 5,
                    'serial_number': 1,
                    'intent_name': 'idip服停机发布',
                    'status': true,
                    'available_user': [
                        'li'
                    ],
                    'available_group': [
                        '71363'
                    ],
                    'is_commit': true,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 14,
                    'biz_id': 100846,
                    'index_id': 5,
                    'serial_number': 1,
                    'intent_name': '打s91对外访问',
                    'status': true,
                    'available_user': [
                        'hchen'
                    ],
                    'available_group': [
                        'ww274272',
                        'w30271363'
                    ],
                    'is_commit': true,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 15,
                    'biz_id': 100846,
                    'index_id': 5,
                    'serial_number': 1,
                    'intent_name': '安组操作',
                    'status': false,
                    'available_user': [
                        'hnanchen',
                        'mgli'
                    ],
                    'available_group': [
                        '30271363'
                    ],
                    'is_commit': true,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 16,
                    'biz_id': 820,
                    'index_id': 1,
                    'serial_number': 'w',
                    'intent_name': '9布更新',
                    'status': true,
                    'available_user': [
                        'olei'
                    ],
                    'available_group': [
                        'w123123'
                    ],
                    'is_commit': false,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 17,
                    'biz_id': 100204,
                    'serial_number': 1,
                    'index_id': 3,
                    'intent_name': '更新ds',
                    'status': true,
                    'available_user': [
                        'sayu'
                    ],
                    'available_group': [
                        'w2243840'
                    ],
                    'is_commit': false,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 18,
                    'biz_id': 100204,
                    'serial_number': 1,
                    'index_id': 3,
                    'intent_name': '标维测试',
                    'status': true,
                    'available_user': [
                        'ayu'
                    ],
                    'available_group': [
                        'w2243840'
                    ],
                    'is_commit': true,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 19,
                    'biz_id': 270,
                    'serial_number': 1,
                    'index_id': 9,
                    'intent_name': '【测试服】查询进程状态',
                    'status': true,
                    'available_user': [
                        'bzehu',
                        'gli'
                    ],
                    'available_group': [
                        'ww3038602403'
                    ],
                    'is_commit': false,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                },
                {
                    'id': 20,
                    'biz_id': 820,
                    'index_id': 1,
                    'serial_number': 1,
                    'intent_name': '测置跟新11',
                    'status': true,
                    'available_user': [
                        'nlei'
                    ],
                    'available_group': [
                        '31212312'
                    ],
                    'is_commit': false,
                    'created_by': null,
                    'created_at': '2021-04-23T15:58:50.738936',
                    'updated_by': null,
                    'updated_at': null,
                    'is_deleted': false,
                    'deleted_by': null,
                    'deleted_at': null,
                    'description': null
                }
            ],
            'count': 21,
            'request_id': '43008a70-61e4-4976-bf26-5432e2646886'
        }
    } else if (invoke === 'utteranceList') {
        return {
            'data': [
                {
                    'id': 1,
                    'biz_id': 80,
                    'index_id': 1,
                    'content': [
                        '重启服务器',
                        '重启大区',
                        '重启91服'
                    ]
                }
            ],
            'code': 200,
            'message': 'OK',
            'result': true,
            'request_id': 'ce008338-586a-4335-9cc5-1bd9e529b84d'
        }
    } else if (invoke === 'taskList') {
        return {
            'data': [
                {
                    'id': 1,
                    'biz_id': 80,
                    'index_id': 1,
                    'platform': 'job',
                    'task_id': '1000895',
                    'slots': [
                        {
                            'id': 1001714,
                            'name': 'server_id',
                            'pattern': '.*',
                            'prompt': '请输入server_id'
                        },
                        {
                            'id': 1001715,
                            'name': 'command',
                            'pattern': '.*',
                            'prompt': '请输入command'
                        },
                        {
                            'id': 1001719,
                            'name': 'yw',
                            'pattern': '.*',
                            'prompt': '请输入yw'
                        }
                    ],
                    'source': {
                        'bk_biz_id': 80,
                        'name': '部署重启服务器',
                        'creator': 'nei',
                        'last_modify_time': '2020-09-28 19:49:34',
                        'bk_job_id': 1000902,
                        'create_time': '2020-09-28 17:24:35',
                        'last_modify_user': 'neolei'
                    },
                    'activities': [],
                    'script': ''
                }
            ],
            'code': 200,
            'message': 'OK',
            'result': true,
            'request_id': '1719f24c-4e0d-4f2f-a60f-0da72db66d45'
        }
    } else if (invoke === 'jobList') {
        return {
            result: true,
            code: 0,
            data: [
                {
                    'bk_biz_id': 80,
                    'name': '【测试服-93】realm配置文件更新',
                    'creator': 'lei',
                    'last_modify_time': '2020-09-28 19:46:15',
                    'bk_job_id': 1000896,
                    'create_time': '2020-09-28 17:03:23',
                    'last_modify_user': 'neolei'
                }, {
                    'bk_biz_id': 80,
                    'name': 'realm配置文件更新',
                    'creator': 'ei',
                    'last_modify_time': '2020-09-28 19:46:03',
                    'bk_job_id': 1000897,
                    'create_time': '2020-09-28 17:03:37',
                    'last_modify_user': 'neolei'
                }, {
                    'bk_biz_id': 80,
                    'name': '[cloud3】realm配置文件更新',
                    'creator': 'lei',
                    'last_modify_time': '2020-09-28 19:45:30',
                    'bk_job_id': 1000898,
                    'create_time': '2020-09-28 17:03:52',
                    'last_modify_user': 'neolei'
                }, {
                    'bk_biz_id': 80,
                    'name': '【测试',
                    'creator': 'nei',
                    'last_modify_time': '2020-09-28 18:54:41',
                    'bk_job_id': 1000891,
                    'create_time': '2020-09-28 16:54:35',
                    'last_modify_user': 'neolei'
                }, {
                    'bk_biz_id': 80,
                    'name': '【测试服-93】解压完整包',
                    'creator': 'lei',
                    'last_modify_time': '2020-09-28 18:54:31',
                    'bk_job_id': 1000892,
                    'create_time': '2020-09-28 16:55:21',
                    'last_modify_user': 'neolei'
                }
            ],
            message: 'ok'
        }
    } else if (invoke === 'jobListV3') {
        return {
            result: true,
            code: 0,
            data: [
                {
                    'bk_biz_id': 820,
                    'name': '\u3010\u6b63\u5f0f\u670d-WEB\u76d1\u63a7\u3011',
                    'creator': 'ei',
                    'last_modify_time': 1602587239,
                    'create_time': 1602577666,
                    'job_template_id': 5274,
                    'id': 19978,
                    'last_modify_user': 'nlei'
                },
                {
                    'bk_biz_id': 820,
                    'name': '\u3010\u6d4b\u8bd5\u670d-91\u3011\u90e8\u7f72\u91cd\u542f\u670d\u52a1\u5668',
                    'creator': 'ei',
                    'last_modify_time': 1601293813,
                    'create_time': 1601285035,
                    'job_template_id': 3946,
                    'id': 1000899,
                    'last_modify_user': 'lei'
                },
                {
                    'bk_biz_id': 820,
                    'name': '\u3010\u6d4b\u8bd5\u670d-93\u3011\u90e8\u7f72\u91cd\u542f\u670d\u52a1\u5668',
                    'creator': 'ei',
                    'last_modify_time': 1601293802,
                    'create_time': 1601285050,
                    'job_template_id': 3946,
                    'id': 1000900,
                    'last_modify_user': 'ei'
                },
                {
                    'bk_biz_id': 820,
                    'name': '\u3010\u6d4b\u8bd5\u670d-cloud1\u3011\u90e8\u7f72\u91cd\u542f\u670d\u52a1\u5668',
                    'creator': 'ei',
                    'last_modify_time': 1601293784,
                    'create_time': 1601285062,
                    'job_template_id': 3946,
                    'id': 1000901,
                    'last_modify_user': 'ei'
                },
                {
                    'bk_biz_id': 820,
                    'name': '\u3010\u6d4b\u8bd5\u670d-cloud3\u3011\u90e8\u7f72\u91cd\u542f\u670d\u52a1\u5668',
                    'creator': 'ei',
                    'last_modify_time': 1601293774,
                    'create_time': 1601285075,
                    'job_template_id': 3946,
                    'id': 1000902,
                    'last_modify_user': 'ei'
                },
                {
                    'bk_biz_id': 820,
                    'name': '\u3010\u6d4b\u8bd5\u670d-91\u3011realm\u914d\u7f6e\u6587\u4ef6\u66f4\u65b0',
                    'creator': 'ei',
                    'last_modify_time': 1601293609,
                    'create_time': 1601283785,
                    'job_template_id': 3945,
                    'id': 1000895,
                    'last_modify_user': 'ei'
                },
                {
                    'bk_biz_id': 820,
                    'name': '\u3010\u6d4b\u8bd5\u670d-93\u3011realm\u914d\u7f6e\u6587\u4ef6\u66f4\u65b0',
                    'creator': 'ei',
                    'last_modify_time': 1601293575,
                    'create_time': 1601283803,
                    'job_template_id': 3945,
                    'id': 1000896,
                    'last_modify_user': 'ei'
                }
            ],
            message: 'ok'
        }
    } else if (invoke === 'jobDetail') {
        return {
            message: '',
            code: 0,
            data: {
                'bk_biz_id': 820,
                'name': '解压完整包',
                'creator': 'n',
                'last_modify_time': '2020-09-28 18:54:31',
                'global_vars': [{
                    'category': 3,
                    'description': '',
                    'value': '{"hostNodeList":{"host"ip":"1","gseAgentAlive":false,"cloudAreaId":0}]}}',
                    'name': 'host',
                    'id': 11708,
                    'ip_list': [{
                        'ip': '1',
                        'bk_cloud_id': 0
                    }]
                }, {
                    'category': 1,
                    'description': '',
                    'id': 10009,
                    'value': 'hello',
                    'name': 'parameter'
                }, {
                    'category': 2,
                    'description': '',
                    'id': 10738,
                    'value': '0',
                    'name': 'namespace'
                }, {
                    'category': 5,
                    'description': '',
                    'id': 11739,
                    'value': '1',
                    'name': 'array'
                }, {
                    'category': 4,
                    'description': '',
                    'id': 10740,
                    'value': '123456',
                    'name': 'pwd'
                }],
                'bk_job_id': 10892,
                'create_time': '2020-09-28 16:55:21',
                'steps': [
                    {
                        'account': 'user00',
                        'account_id': 81,
                        'script_timeout': 360,
                        'name': '93',
                        'script_content': '#!/usr/bin/env python\n# -*- coding: utf8 -*-\n\nimport os\nimport sys\nimport commands\n\ndef main(version):\n    if not os.path.isfile(\'/data/home/user00/opt/extract_pkg.py\'):\n        sys.exit("ERROR: file /data/home/user00/opt/extract_pkg.py not exist!")\n    os.chdir(\'/data/home/user00/opt\')\n    print "changed dir:/data/home/user00/opt"\n    cmd = \'python extract_pkg.py --fullpackage %s --debug\' % (version)\n    print "running cmd: %s" % cmd\n    (c, o) = commands.getstatusoutput(cmd)\n    if c != 0:\n        sys.exit("ERROR: %s\\n%s" % (cmd, o))\n    else:\n        print "apply extract [%s] success." % version\n\nif __name__ == \'__main__\':\n    if len(sys.argv) != 2:\n        sys.exit("ERROR: the argv should be package name: eg: alpha_cheats_server_2.2.1.12.tar.gz ")\n    main(sys.argv[1])',
                        'step_id': 1746,
                        'script_param': '${deploy_pkg_name}',
                        'type': 1,
                        'is_param_sensitive': 0
                    }
                ],
                'last_modify_user': 'neolei',
                'template_id': 3944
            },
            result: true,
            request_id: '60bb060ab16e4be8a27c5c94e43b8b68'
        }
    } else if (invoke === 'jobDetailV3') {
        return {
            'message': '',
            'code': 0,
            'data': {
                'bk_biz_id': 820,
                'name': '\u3010\u6d4b\u8bd5\u670d-91\u3011\u90e8\u7f72\u91cd\u542f\u670d\u52a1\u5668',
                'creator': 'neolei',
                'step_list': [
                    {
                        'script_info': {
                            'account': {
                                'id': 811
                            },
                            'script_language': 4,
                            'script_timeout': 3600,
                            'server': {
                                'variable': 'yw'
                            },
                            'script_content': 'IyEvdXNyL2Jpbi9lbnYgcHl0aG9uCiMgLSotIGNvZGluZzogdXRmOCAtKi0KCmltcG9ydCBvcwppbXBvcnQgc3lzCmltcG9ydCBjb21tYW5kcwoKZGVmIG1haW4od29ybGQsIG9wdCk6CiAgICBpZiBub3Qgb3MucGF0aC5pc2ZpbGUoJy9kYXRhL2hvbWUvdXNlcjAwL3Nhc2NyaXB0L2F1dG8vd29ybGRjdGwucHknKToKICAgICAgICBzeXMuZXhpdCgiRVJST1I6IGZpbGUgL2RhdGEvaG9tZS91c2VyMDAvc2FzY3JpcHQvYXV0by93b3JsZGN0bC5weSBub3QgZXhpc3QhIikKICAgIG9zLmNoZGlyKCcvZGF0YS9ob21lL3VzZXIwMC9zYXNjcmlwdC9hdXRvJykKICAgIHByaW50ICJjaGFuZ2VkIGRpcjovZGF0YS9ob21lL3VzZXIwMC9zYXNjcmlwdC9hdXRvIgogICAgY21kID0gJ3B5dGhvbiB3b3JsZGN0bC5weSAlcyAlcycgJSAod29ybGQsIG9wdCkKICAgIHByaW50ICJydW5uaW5nIGNtZDogJXMiICUgY21kCiAgICAoYywgbykgPSBjb21tYW5kcy5nZXRzdGF0dXNvdXRwdXQoY21kKQogICAgaWYgYyAhPSAwOgogICAgICAgIHN5cy5leGl0KCJFUlJPUjogJXNcbiVzIiAlIChjbWQsIG8pKQoKaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzoKICAgIGlmIGxlbihzeXMuYXJndikgIT0gMzoKICAgICAgICBzeXMuZXhpdCgiRVJST1I6IHRoZSBhcmd2IHNob3VsZCBiZSB3b3JsZCwgPGRlcGxveXxzdG9wfGNsZWFufHN0YXJ0fGFsbG93fGRlcGxveV9yZXN0YXJ0PiIpCiAgICBtYWluKHN5cy5hcmd2WzFdLCBzeXMuYXJndlsyXSk=',
                            'is_param_sensitive': 0,
                            'script_param': 'JHtzZXJ2ZXJfaWR9ICR7Y29tbWFuZH0=',
                            'script_type': 1
                        },
                        'type': 1,
                        'id': 15864,
                        'name': '91'
                    },
                    {
                        'script_info': {
                            'account': {
                                'id': 811
                            },
                            'script_language': 4,
                            'script_timeout': 3600,
                            'server': {
                                'variable': 'yw'
                            },
                            'script_content': 'IyEvdXNyL2Jpbi9lbnYgcHl0aG9uCiMgLSotIGNvZGluZzogdXRmOCAtKi0KCmltcG9ydCBvcwppbXBvcnQgc3lzCmltcG9ydCBjb21tYW5kcwoKZGVmIG1haW4od29ybGQsIG9wdCk6CiAgICBpZiBub3Qgb3MucGF0aC5pc2ZpbGUoJy9kYXRhL2hvbWUvdXNlcjAwL3Nhc2NyaXB0L2F1dG8vd29ybGRjdGwucHknKToKICAgICAgICBzeXMuZXhpdCgiRVJST1I6IGZpbGUgL2RhdGEvaG9tZS91c2VyMDAvc2FzY3JpcHQvYXV0by93b3JsZGN0bC5weSBub3QgZXhpc3QhIikKICAgIG9zLmNoZGlyKCcvZGF0YS9ob21lL3VzZXIwMC9zYXNjcmlwdC9hdXRvJykKICAgIHByaW50ICJjaGFuZ2VkIGRpcjovZGF0YS9ob21lL3VzZXIwMC9zYXNjcmlwdC9hdXRvIgogICAgY21kID0gJ3B5dGhvbiB3b3JsZGN0bC5weSAlcyAlcycgJSAod29ybGQsIG9wdCkKICAgIHByaW50ICJydW5uaW5nIGNtZDogJXMiICUgY21kCiAgICAoYywgbykgPSBjb21tYW5kcy5nZXRzdGF0dXNvdXRwdXQoY21kKQogICAgaWYgYyAhPSAwOgogICAgICAgIHN5cy5leGl0KCJFUlJPUjogJXNcbiVzIiAlIChjbWQsIG8pKQoKaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzoKICAgIGlmIGxlbihzeXMuYXJndikgIT0gMzoKICAgICAgICBzeXMuZXhpdCgiRVJST1I6IHRoZSBhcmd2IHNob3VsZCBiZSB3b3JsZCwgPGRlcGxveXxzdG9wfGNsZWFufHN0YXJ0fGFsbG93fGRlcGxveV9yZXN0YXJ0PiIpCiAgICBtYWluKHN5cy5hcmd2WzFdLCBzeXMuYXJndlsyXSk=',
                            'is_param_sensitive': 0,
                            'script_param': 'JHtzZXJ2ZXJfaWR9ICR7Y29tbWFuZH0=',
                            'script_type': 1
                        },
                        'type': 1,
                        'id': 15865,
                        'name': '93'
                    },
                    {
                        'script_info': {
                            'account': {
                                'id': 811
                            },
                            'script_language': 4,
                            'script_timeout': 3600,
                            'server': {
                                'variable': 'yw'
                            },
                            'script_content': 'IyEvdXNyL2Jpbi9lbnYgcHl0aG9uCiMgLSotIGNvZGluZzogdXRmOCAtKi0KCmltcG9ydCBvcwppbXBvcnQgc3lzCmltcG9ydCBjb21tYW5kcwoKZGVmIG1haW4od29ybGQsIG9wdCk6CiAgICBpZiBub3Qgb3MucGF0aC5pc2ZpbGUoJy9kYXRhL2hvbWUvdXNlcjAwL3Nhc2NyaXB0L2F1dG8vd29ybGRjdGwucHknKToKICAgICAgICBzeXMuZXhpdCgiRVJST1I6IGZpbGUgL2RhdGEvaG9tZS91c2VyMDAvc2FzY3JpcHQvYXV0by93b3JsZGN0bC5weSBub3QgZXhpc3QhIikKICAgIG9zLmNoZGlyKCcvZGF0YS9ob21lL3VzZXIwMC9zYXNjcmlwdC9hdXRvJykKICAgIHByaW50ICJjaGFuZ2VkIGRpcjovZGF0YS9ob21lL3VzZXIwMC9zYXNjcmlwdC9hdXRvIgogICAgY21kID0gJ3B5dGhvbiB3b3JsZGN0bC5weSAlcyAlcycgJSAod29ybGQsIG9wdCkKICAgIHByaW50ICJydW5uaW5nIGNtZDogJXMiICUgY21kCiAgICAoYywgbykgPSBjb21tYW5kcy5nZXRzdGF0dXNvdXRwdXQoY21kKQogICAgaWYgYyAhPSAwOgogICAgICAgIHN5cy5leGl0KCJFUlJPUjogJXNcbiVzIiAlIChjbWQsIG8pKQoKaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzoKICAgIGlmIGxlbihzeXMuYXJndikgIT0gMzoKICAgICAgICBzeXMuZXhpdCgiRVJST1I6IHRoZSBhcmd2IHNob3VsZCBiZSB3b3JsZCwgPGRlcGxveXxzdG9wfGNsZWFufHN0YXJ0fGFsbG93fGRlcGxveV9yZXN0YXJ0PiIpCiAgICBtYWluKHN5cy5hcmd2WzFdLCBzeXMuYXJndlsyXSk=',
                            'is_param_sensitive': 0,
                            'script_param': 'JHtzZXJ2ZXJfaWR9ICR7Y29tbWFuZH0=',
                            'script_type': 1
                        },
                        'type': 1,
                        'id': 15866,
                        'name': 'cloud1'
                    },
                    {
                        'script_info': {
                            'account': {
                                'id': 811
                            },
                            'script_language': 1,
                            'script_timeout': 3600,
                            'server': {
                                'variable': 'yw'
                            },
                            'script_content': 'IyEvYmluL2Jhc2gKCmFueW5vd3RpbWU9ImRhdGUgKyclWS0lbS0lZCAlSDolTTolUyciCk5PVz0iZWNobyBbXGAkYW55bm93dGltZVxgXVtQSUQ6JCRdIgoKIyMjIyMg5Y+v5Zyo6ISa5pys5byA5aeL6L+Q6KGM5pe26LCD55So77yM5omT5Y2w5b2T5pe255qE5pe26Ze05oiz5Y+KUElE44CCCmZ1bmN0aW9uIGpvYl9zdGFydAp7CiAgICBlY2hvICJgZXZhbCAkTk9XYCBqb2Jfc3RhcnQiCn0KCiMjIyMjIOWPr+WcqOiEmuacrOaJp+ihjOaIkOWKn+eahOmAu+i+keWIhuaUr+WkhOiwg+eUqO+8jOaJk+WNsOW9k+aXtueahOaXtumXtOaIs+WPilBJROOAgiAKZnVuY3Rpb24gam9iX3N1Y2Nlc3MKewogICAgTVNHPSIkKiIKICAgIGVjaG8gImBldmFsICROT1dgIGpvYl9zdWNjZXNzOlskTVNHXSIKICAgIGV4aXQgMAp9CgojIyMjIyDlj6/lnKjohJrmnKzmiafooYzlpLHotKXnmoTpgLvovpHliIbmlK/lpITosIPnlKjvvIzmiZPljbDlvZPml7bnmoTml7bpl7TmiLPlj4pQSUTjgIIKZnVuY3Rpb24gam9iX2ZhaWwKewogICAgTVNHPSIkKiIKICAgIGVjaG8gImBldmFsICROT1dgIGpvYl9mYWlsOlskTVNHXSIKICAgIGV4aXQgMQp9Cgpqb2Jfc3RhcnQKCiMjIyMjIyDlj6/lnKjmraTlpITlvIDlp4vnvJblhpnmgqjnmoTohJrmnKzpgLvovpHku6PnoIEKIyMjIyMjIOS9nOS4muW5s+WPsOS4reaJp+ihjOiEmuacrOaIkOWKn+WSjOWksei0peeahOagh+WHhuWPquWPluWGs+S6juiEmuacrOacgOWQjuS4gOadoeaJp+ihjOivreWPpeeahOi/lOWbnuWAvAojIyMjIyMg5aaC5p6c6L+U5Zue5YC85Li6MO+8jOWImeiupOS4uuatpOiEmuacrOaJp+ihjOaIkOWKn++8jOWmguaenOmdnjDvvIzliJnorqTkuLrohJrmnKzmiafooYzlpLHotKUK',
                            'is_param_sensitive': 0,
                            'script_param': 'JHtzZXJ2ZXJfaWR9ICR7Y29tbWFuZH0=',
                            'script_type': 1
                        },
                        'type': 1,
                        'id': 15867,
                        'name': 'cloud3'
                    }
                ],
                'last_modify_time': 1601293813,
                'create_time': 1601285035,
                'job_template_id': 3946,
                'global_var_list': [
                    {
                        'description': '',
                        'required': 0,
                        'value': '',
                        'type': 1,
                        'id': 1001714,
                        'name': 'server_id'
                    },
                    {
                        'description': '',
                        'required': 0,
                        'value': '',
                        'type': 1,
                        'id': 1001715,
                        'name': 'command'
                    },
                    {
                        'description': '',
                        'required': 0,
                        'server': {
                            'ip_list': [
                                {
                                    'ip': 'ip',
                                    'bk_cloud_id': 0
                                }
                            ]
                        },
                        'type': 3,
                        'id': 1001719,
                        'name': 'yw'
                    }
                ],
                'id': 1000899,
                'last_modify_user': 'neolei'
            },
            'result': true,
            'request_id': '2b122ef1dd994656b57ad6a9de8afc07'
        }
    } else if (invoke === 'sopsList') {
        return {
            'message': '',
            'code': 0,
            'data': [
                {
                    'category': 'OpsTools',
                    'bk_biz_id': 820,
                    'project_name': '之路',
                    'name': '91服重启',
                    'creator': 'lei',
                    'edit_time': '2020-09-28 19:50:53 +0800',
                    'create_time': '2020-09-2815 +0800',
                    'editor': 'i',
                    'project_id': 5001212,
                    'bk_biz_name': '之路',
                    'id': 650
                }, {
                    'category': 'OpsTools',
                    'bk_biz_id': 820,
                    'project_name': '之路',
                    'name': '更新',
                    'creator': 'neolei',
                    'edit_time': '2020-09-28 19:50:53 +0800',
                    'create_time': '2020-09-28 19:30:23 +0800',
                    'editor': 'ei',
                    'project_id': 5001212,
                    'bk_biz_name': '之路',
                    'id': 649
                }
            ],
            'result': true,
            'request_id': 'bed77b45f1a6413784cb84d613b1481c'
        }
    } else if (invoke === 'sopsDetail') {
        return {
            'message': '',
            'code': 0,
            'data': {
                'category': 'OpsTools',
                'bk_biz_id': 820,
                'project_name': '\u6d41\u653e\u4e4b\u8def',
                'name': '\u6d4b\u8bd5\u670d91\u66f4\u65b0',
                'creator': 'lei',
                'pipeline_tree': {
                    'activities': {
                        'nodec328d7ef4ea9add0defd147fc386': {
                            'outgoing': 'lined7c1188666aacfdf965b93d72e44',
                            'incoming': [
                                'linecb43bb3755f9ecda537f3c0707ad'
                            ],
                            'name': '\u90e8\u7f72\u91cd\u542f\u670d\u52a1\u5668',
                            'error_ignorable': false,
                            'labels': [],
                            'component': {
                                'code': 'job_execute_task',
                                'data': {
                                    'button_refresh': {
                                        'hook': false,
                                        'value': ''
                                    },
                                    'ip_is_exist': {
                                        'hook': false,
                                        'value': false
                                    },
                                    'biz_cc_id': {
                                        'hook': false,
                                        'value': 820
                                    },
                                    'job_task_id': {
                                        'hook': false,
                                        'value': 1000899
                                    },
                                    'job_global_var': {
                                        'hook': false,
                                        'value': [
                                            {
                                                'category': 1,
                                                'description': '',
                                                'id': 1001714,
                                                'value': '91',
                                                'name': 'server_id'
                                            },
                                            {
                                                'category': 1,
                                                'description': '',
                                                'id': 1001715,
                                                'value': 'deploy_restart',
                                                'name': 'command'
                                            },
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001719,
                                                'value': '0:ip',
                                                'name': 'yw'
                                            }
                                        ]
                                    }
                                },
                                'version': 'legacy'
                            },
                            'stage_name': '\u6b65\u9aa41',
                            'skippable': true,
                            'type': 'ServiceActivity',
                            'retryable': true,
                            'optional': false,
                            'id': 'nodec328d7ef4ea9add0defd147fc386',
                            'loop': null
                        },
                        'nodea901226c339734cea04270e9d4b6': {
                            'outgoing': 'lined88410b88ced11d3568ce6535edd',
                            'incoming': [
                                'lined7c1188666aacfdf965b93d72e44'
                            ],
                            'name': '\u53d1\u9001\u901a\u77e5',
                            'error_ignorable': false,
                            'labels': [],
                            'component': {
                                'code': 'bk_notify',
                                'data': {
                                    'bk_notify_type': {
                                        'hook': false,
                                        'value': [
                                            'rtx',
                                            'weixin'
                                        ]
                                    },
                                    'bk_notify_content': {
                                        'hook': false,
                                        'value': '\u5b8c\u6210\u66f4\u65b0\u7248\u672c\uff1aLive: ${deploy_pkg_version}'
                                    },
                                    'bk_receiver_info': {
                                        'hook': false,
                                        'value': {
                                            'bk_receiver_group': [
                                                'Maintainers',
                                                'ProductPm',
                                                'Developer',
                                                'Tester'
                                            ],
                                            'bk_more_receiver': 'un'
                                        }
                                    },
                                    'bk_notify_title': {
                                        'hook': false,
                                        'value': '91\u670d-\u5b8c\u6210\u66f4\u65b0\u901a\u77e5'
                                    },
                                    'biz_cc_id': {
                                        'hook': false,
                                        'value': 80
                                    }
                                },
                                'version': 'v1.0'
                            },
                            'stage_name': '\u6b65\u9aa41',
                            'skippable': true,
                            'type': 'ServiceActivity',
                            'retryable': true,
                            'optional': false,
                            'id': 'nodea901226c339734cea04270e9d4b6',
                            'loop': null
                        },
                        'node57fc9bff758116ced2512395e989': {
                            'outgoing': 'linecb43bb3755f9ecda537f3c0707ad',
                            'incoming': [
                                'line680b9bdcf34b098a655a3fcf00cb'
                            ],
                            'name': '\u66f4\u6539realm\u914d\u7f6e',
                            'error_ignorable': false,
                            'labels': [],
                            'component': {
                                'code': 'job_execute_task',
                                'data': {
                                    'button_refresh': {
                                        'hook': false,
                                        'value': ''
                                    },
                                    'ip_is_exist': {
                                        'hook': false,
                                        'value': false
                                    },
                                    'biz_cc_id': {
                                        'hook': false,
                                        'value': 820
                                    },
                                    'job_task_id': {
                                        'hook': false,
                                        'value': 1000895
                                    },
                                    'job_global_var': {
                                        'hook': false,
                                        'value': [
                                            {
                                                'category': 1,
                                                'description': '',
                                                'id': 1001711,
                                                'value': '${deploy_pkg_name}',
                                                'name': 'deploy_pkg_name'
                                            },
                                            {
                                                'category': 1,
                                                'description': '',
                                                'id': 1001713,
                                                'value': '91',
                                                'name': 'server_id'
                                            },
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001718,
                                                'value': '0:ip',
                                                'name': 'yw'
                                            }
                                        ]
                                    }
                                },
                                'version': 'legacy'
                            },
                            'stage_name': '\u6b65\u9aa41',
                            'skippable': true,
                            'type': 'ServiceActivity',
                            'retryable': true,
                            'optional': false,
                            'id': 'node57fc9bff758116ced2512395e989',
                            'loop': null
                        },
                        'node3736622bcf45d4f31900025fed6c': {
                            'outgoing': 'line680b9bdcf34b098a655a3fcf00cb',
                            'incoming': [
                                'linefed05a99a5969c16294f43ceba86'
                            ],
                            'name': '\u89e3\u538b\u5b8c\u6574\u5305',
                            'error_ignorable': false,
                            'labels': [],
                            'component': {
                                'code': 'job_execute_task',
                                'data': {
                                    'button_refresh': {
                                        'hook': false,
                                        'value': ''
                                    },
                                    'ip_is_exist': {
                                        'hook': false,
                                        'value': false
                                    },
                                    'biz_cc_id': {
                                        'hook': false,
                                        'value': 820
                                    },
                                    'job_task_id': {
                                        'hook': false,
                                        'value': 1000891
                                    },
                                    'job_global_var': {
                                        'hook': false,
                                        'value': [
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001673,
                                                'value': '0:1',
                                                'name': 'idc_91'
                                            },
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001674,
                                                'value': '0:9',
                                                'name': 'idc_93'
                                            },
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001675,
                                                'value': '0:9',
                                                'name': 'cloud1'
                                            },
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001676,
                                                'value': '0:9',
                                                'name': 'cloud3'
                                            },
                                            {
                                                'category': 1,
                                                'description': '',
                                                'id': 1001712,
                                                'value': '${deploy_pkg_name}',
                                                'name': 'deploy_pkg_name'
                                            }
                                        ]
                                    }
                                },
                                'version': 'legacy'
                            },
                            'stage_name': '\u6b65\u9aa41',
                            'skippable': true,
                            'type': 'ServiceActivity',
                            'retryable': true,
                            'optional': false,
                            'id': 'node3736622bcf45d4f31900025fed6c',
                            'loop': null
                        },
                        'node01b46aa33b9df7ca46c91de81021': {
                            'outgoing': 'linefed05a99a5969c16294f43ceba86',
                            'incoming': [
                                'line5cedad4a203c690e0a527372d107'
                            ],
                            'name': '\u4e0b\u8f7d\u7248\u672c\u5305',
                            'error_ignorable': false,
                            'labels': [],
                            'component': {
                                'code': 'job_execute_task',
                                'data': {
                                    'button_refresh': {
                                        'hook': false,
                                        'value': ''
                                    },
                                    'ip_is_exist': {
                                        'hook': false,
                                        'value': false
                                    },
                                    'biz_cc_id': {
                                        'hook': false,
                                        'value': 820
                                    },
                                    'job_task_id': {
                                        'hook': false,
                                        'value': 1000887
                                    },
                                    'job_global_var': {
                                        'hook': false,
                                        'value': [
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001669,
                                                'value': '0:1',
                                                'name': 'idc_91'
                                            },
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001670,
                                                'value': '0:1',
                                                'name': 'idc_93'
                                            },
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001671,
                                                'value': '0:1',
                                                'name': 'cloud1'
                                            },
                                            {
                                                'category': 3,
                                                'description': '',
                                                'id': 1001672,
                                                'value': '0:1',
                                                'name': 'cloud3'
                                            },
                                            {
                                                'category': 1,
                                                'description': '',
                                                'id': 1001710,
                                                'value': '${deploy_pkg_name}',
                                                'name': 'deploy_pkg_name'
                                            }
                                        ]
                                    }
                                },
                                'version': 'legacy'
                            },
                            'stage_name': '\u6b65\u9aa41',
                            'skippable': true,
                            'type': 'ServiceActivity',
                            'retryable': true,
                            'optional': false,
                            'id': 'node01b46aa33b9df7ca46c91de81021',
                            'loop': null
                        }
                    },
                    'end_event': {
                        'outgoing': '',
                        'incoming': [
                            'lined88410b88ced11d3568ce6535edd'
                        ],
                        'name': '',
                        'labels': [],
                        'type': 'EmptyEndEvent',
                        'id': 'node31ecd071cc53a15cc47172a6bd23'
                    },
                    'outputs': [],
                    'flows': {
                        'linefed05a99a5969c16294f43ceba86': {
                            'is_default': false,
                            'source': 'node01b46aa33b9df7ca46c91de81021',
                            'id': 'linefed05a99a5969c16294f43ceba86',
                            'target': 'node3736622bcf45d4f31900025fed6c'
                        },
                        'linecb43bb3755f9ecda537f3c0707ad': {
                            'is_default': false,
                            'source': 'node57fc9bff758116ced2512395e989',
                            'id': 'linecb43bb3755f9ecda537f3c0707ad',
                            'target': 'nodec328d7ef4ea9add0defd147fc386'
                        },
                        'line680b9bdcf34b098a655a3fcf00cb': {
                            'is_default': false,
                            'source': 'node3736622bcf45d4f31900025fed6c',
                            'id': 'line680b9bdcf34b098a655a3fcf00cb',
                            'target': 'node57fc9bff758116ced2512395e989'
                        },
                        'line5cedad4a203c690e0a527372d107': {
                            'is_default': false,
                            'source': 'nodedbef7c97a935bb3f83f055888bfe',
                            'id': 'line5cedad4a203c690e0a527372d107',
                            'target': 'node01b46aa33b9df7ca46c91de81021'
                        },
                        'lined88410b88ced11d3568ce6535edd': {
                            'is_default': false,
                            'source': 'nodea901226c339734cea04270e9d4b6',
                            'id': 'lined88410b88ced11d3568ce6535edd',
                            'target': 'node31ecd071cc53a15cc47172a6bd23'
                        },
                        'lined7c1188666aacfdf965b93d72e44': {
                            'is_default': false,
                            'source': 'nodec328d7ef4ea9add0defd147fc386',
                            'id': 'lined7c1188666aacfdf965b93d72e44',
                            'target': 'nodea901226c339734cea04270e9d4b6'
                        }
                    },
                    'gateways': { },
                    'start_event': {
                        'outgoing': 'line5cedad4a203c690e0a527372d107',
                        'incoming': '',
                        'name': '',
                        'labels': [],
                        'type': 'EmptyStartEvent',
                        'id': 'nodedbef7c97a935bb3f83f055888bfe'
                    },
                    'constants': {
                        '${deploy_pkg_name}': {
                            'source_tag': 'input.input',
                            'index': 0,
                            'validation': '.*(\\d\\.\\d+\\.\\d)\\.(\\d+)',
                            'name': '\u670d\u52a1\u7aef\u5305\u540d',
                            'custom_type': 'input',
                            'value': '',
                            'form_schema': {
                                'type': 'input',
                                'attrs': {
                                    'hookable': true,
                                    'validation': [],
                                    'name': '\u8f93\u5165\u6846'
                                }
                            },
                            'source_type': 'custom',
                            'schema': {
                                'enum': [],
                                'type': 'string',
                                'description': '\u8f93\u5165\u6846\u53d8\u91cf'
                            },
                            'version': 'legacy',
                            'source_info': { },
                            'key': '${deploy_pkg_name}',
                            'show_type': 'show',
                            'desc': ''
                        },
                        '${server_id}': {
                            'source_tag': 'input.input',
                            'index': 1,
                            'validation': '^.+$',
                            'name': '\u6d4b\u8bd5\u670dID',
                            'custom_type': 'input',
                            'value': '',
                            'form_schema': {
                                'type': 'input',
                                'attrs': {
                                    'hookable': true,
                                    'validation': [],
                                    'name': '\u8f93\u5165\u6846'
                                }
                            },
                            'source_type': 'custom',
                            'schema': {
                                'enum': [],
                                'type': 'string',
                                'description': '\u8f93\u5165\u6846\u53d8\u91cf'
                            },
                            'version': 'legacy',
                            'source_info': { },
                            'key': '${server_id}',
                            'show_type': 'show',
                            'desc': ''
                        },
                        '${deploy_command}': {
                            'source_tag': 'input.input',
                            'index': 2,
                            'validation': '^.+$',
                            'name': '\u90e8\u7f72\u547d\u4ee4',
                            'custom_type': 'input',
                            'value': '',
                            'form_schema': {
                                'type': 'input',
                                'attrs': {
                                    'hookable': true,
                                    'validation': [],
                                    'name': '\u8f93\u5165\u6846'
                                }
                            },
                            'source_type': 'custom',
                            'schema': {
                                'enum': [],
                                'type': 'string',
                                'description': '\u8f93\u5165\u6846\u53d8\u91cf'
                            },
                            'version': 'legacy',
                            'source_info': { },
                            'key': '${deploy_command}',
                            'show_type': 'show',
                            'desc': ''
                        }
                    }
                },
                'edit_time': '2020-09-28 19:51:36 +0800',
                'create_time': '2020-09-28 19:30:23 +0800',
                'editor': 'neolei',
                'project_id': 5001212,
                'bk_biz_name': '\u6d41\u653e\u4e4b\u8def',
                'id': 649
            },
            'result': true,
            'request_id': '1f3294985ce94abc8fcb5efa30bcedcd'
        }
    } else if (invoke === 'logList') {
        return {
            result: true,
            code: 0,
            data: [
                {
                    'biz_id': 82,
                    'bot_type': 'default',
                    'bot_name': '测试机器人',
                    'intent_id': 11,
                    'intent_name': '测试服重启1',
                    'platform': 'JOB',
                    'task_id': 1213,
                    'sender': 'lei',
                    'msg': '测试服重启',
                    'status': '2',
                    'start_time': '2020-10-14 00:00:00',
                    'end_time': '2020-10-14 00:00:00'
                },
                {
                    'biz_id': 82,
                    'bot_type': 'default',
                    'bot_name': '测试机器人',
                    'intent_id': 12,
                    'intent_name': '测试服重启2',
                    'platform': 'JOB',
                    'task_id': 1213,
                    'sender': 'lei',
                    'msg': '测试服重启',
                    'status': '1',
                    'start_time': '2020-10-14 00:00:00',
                    'end_time': '2020-10-14 00:00:00'
                },
                {
                    'biz_id': 82,
                    'bot_type': 'default',
                    'bot_name': '测试机器人',
                    'intent_id': 312,
                    'intent_name': '测试服重启3',
                    'platform': 'JOB',
                    'task_id': 1213,
                    'sender': 'lei',
                    'msg': '测试服重启',
                    'status': '3',
                    'start_time': '2020-10-14 00:00:00',
                    'end_time': '2020-10-14 00:00:00'
                }
            ],
            message: 'ok'
        }
    } else if (invoke === 'recordList') {
        return {
            'data': [
                {
                    'platform': 'JOB',
                    'id': 142,
                    'name': '拉取trade在线数据',
                    'end_time': 1608017521616
                },
                {
                    'platform': 'JOB',
                    'id': 1094,
                    'name': '定时清理core文件',
                    'end_time': 1608017401701
                },
                {
                    'platform': 'JOB',
                    'id': 02,
                    'name': '奖励监控',
                    'end_time': 1608017401475
                },
                {
                    'platform': 'JOB',
                    'id': 3216,
                    'name': '定时清理日志log',
                    'end_time': 1608017401237
                },
                {
                    'platform': 'JOB',
                    'id': 14452,
                    'name': '定时拉取在线数据',
                    'end_time': 1608016921876
                },
                {
                    'platform': 'JOB',
                    'id': 10094,
                    'name': '【正式服】临时定时清理core文件',
                    'end_time': 1608016801629
                },
                {
                    'platform': 'JOB',
                    'id': 3216,
                    'name': '【正式服-作业】定时清理志log',
                    'end_time': 1608016801258
                },
                {
                    'platform': 'JOB',
                    'id': 14452,
                    'name': '【正式服】定时拉取线数据',
                    'end_time': 1608016321486
                },
                {
                    'platform': 'JOB',
                    'id': 10094,
                    'name': '【正式服】临时定时清理core文件',
                    'end_time': 1608016201502
                },
                {
                    'platform': 'JOB',
                    'id': 3216,
                    'name': '【正式服-作业】定时清理log',
                    'end_time': 1608016201235
                }
            ],
            'code': 200,
            'message': 'OK',
            'result': true,
            'request_id': 'bed2aa43-198a-4f26-9b0f-56045e12b8df'
        }
    } else if (invoke === 'botNum') {
        return {
            result: true,
            code: 0,
            data: {
                'count': 7
            },
            message: 'ok'
        }
    } else if (invoke === 'intentNum') {
        return {
            result: true,
            code: 0,
            data: {
                'count': 5
            },
            message: 'ok'
        }
    } else if (invoke === 'baseList') {
        return {
            'result': true,
            'code': '200',
            'message': 'success',
            'data': {
                'count': 2,
                'next': null,
                'previous': null,
                'results': [
                    {
                        'id': 3,
                        'biz_id': 0,
                        'biz_name': 'default',
                        'faq_name': '安全',
                        'faq_db': 'sec_faq',
                        'faq_collection': 'sec_faq',
                        'num': '988',
                        'member': 'mii',
                        'created_by': 'lei',
                        'created_at': '2021-04-23T15:58:47.177397',
                        'updated_by': null,
                        'updated_at': null,
                        'is_deleted': false,
                        'deleted_by': null,
                        'deleted_at': null,
                        'description': null
                    },
                    {
                        'id': 4,
                        'biz_id': 0,
                        'biz_name': 'default',
                        'faq_name': 'WN',
                        'faq_db': 'wmn_faq',
                        'faq_collection': 'wm_manual',
                        'num': '767',
                        'member': 'neoi|mgli',
                        'created_by': 'nei',
                        'created_at': '2021-04-23T15:58:47.177397',
                        'updated_by': null,
                        'updated_at': null,
                        'is_deleted': false,
                        'deleted_by': null,
                        'deleted_at': null,
                        'description': null
                    }
                ]
            },
            'request_id': '70a380dc-964a-4d6d-96da-b31b7d5dd4fd'
        }
    } else if (invoke === 'qaList') {
        return {
            result: true,
            code: 0,
            data: [
                {
                    '_id': '5c8b5e12ebdd77343447e0c9',
                    'question': '为什么补丁我都已经安装了，但是健康度数据仍然不正确？',
                    'username': 'li',
                    'solution': '。'
                }
            ],
            message: 'ok'
        }
    } else if (invoke === 'sopsSchemes') {
        return {
            result: true,
            code: 0,
            data: [
                {
                    'id': 'e2b3ff43182639b19d24713b6b5062f4',
                    'name': '更新',
                    'data': '["nodea901226c339734cea04270e9d4b6","nb5c611d9a33328cae35ee9569ca89b0","n2f8070ab75330ae8e89997a33249b27","n8fbc9c37e8433a78be1885fdaaa4ded","n25f058ef03d2084c13115c378e671","n162f194ccdd35108d3af05c282c5fc5","n4f7611b21e438a1aa2555caa3c34b62","n371df993d943401b3bcbf494acde295"]'
                },
            ],
            message: 'ok'
        }
    } else if (invoke === 'sopsDBList') {
        return {
            'data': [
                {
                    'id': 21,
                    'biz_id': 820,
                    'index_id': 16,
                    'platform': 'sops',
                    'task_id': '650',
                    'activities': [
                        {
                            'id': '771adea72c333790aaa6bd705f8a4ea4',
                            'name': '【app maker 1053】 发布更新',
                            'data': '["n04c41c5aabe37f6b8dc4f0d312676a8","n1f0380c4f9f371491de556ef7075098","ne3e1b629b1c3f868b89ab9ed850f283","n95e8503f4843ef0aac712149f10af99","n1f137b0841434ddad58521eeb497f55","n5fb16c823cb34fa803afb490f992719"]'
                        }
                    ],
                    'project_id': 'dbs-mssql',
                    'slots': [
                        {
                            'id': '${task_start_time}',
                            'name': '任务起始时间',
                            'pattern': '',
                            'prompt': '请输入任务起始时间',
                            'value': 'a'
                        },
                        {
                            'id': '${task_end_time}',
                            'name': '任务结束时间',
                            'pattern': '',
                            'prompt': '请输入任务结束时间'
                        },
                        {
                            'id': '${92_deploy_pkg_version}',
                            'name': '92服部署版本包名',
                            'pattern': '\d+.\d+.\d+.\d+',
                            'prompt': '请输入92服部署版本包名'
                        }
                    ],
                    'source': {
                        'category': 'OpsTools',
                        'bk_biz_id': 820,
                        'project_name': '之路',
                        'name': '(8119)[自定义][92] 发布更新',
                        'creator': 'toa',
                        'pipeline_tree': {
                            'activities': {
                                'n95e8503f4843ef0aac712149f10af99': {
                                    'outgoing': 'lf5dd0691403341ba903d7d4b6cd70e2',
                                    'incoming': [
                                        'l3cbb53fa0e633e4811a98b5c08b27e5'
                                    ],
                                    'name': '暂停',
                                    'error_ignorable': false,
                                    'component': {
                                        'code': 'pause_node',
                                        'data': { },
                                        'version': 'legacy'
                                    },
                                    'stage_name': '暂停',
                                    'skippable': true,
                                    'type': 'ServiceActivity',
                                    'retryable': true,
                                    'optional': false,
                                    'id': 'n95e8503f4843ef0aac712149f10af99',
                                    'loop': null
                                },
                                'n1f0380c4f9f371491de556ef7075098': {
                                    'outgoing': 'l2cdc77111c93fb9995d585180726fc6',
                                    'incoming': [
                                        'lee444465d3a3c739f057e6f7583969b'
                                    ],
                                    'name': '暂停',
                                    'error_ignorable': false,
                                    'component': {
                                        'code': 'pause_node',
                                        'data': { },
                                        'version': 'legacy'
                                    },
                                    'stage_name': '暂停',
                                    'skippable': true,
                                    'type': 'ServiceActivity',
                                    'retryable': true,
                                    'optional': false,
                                    'id': 'n1f0380c4f9f371491de556ef7075098',
                                    'loop': null
                                },
                                'ne3e1b629b1c3f868b89ab9ed850f283': {
                                    'outgoing': 'l64e5494a6613b89acefc01e29c704bc',
                                    'incoming': [
                                        'lc4001904a773eb8b3f5f67a11bcafe6'
                                    ],
                                    'name': '92服-停服更新通知',
                                    'error_ignorable': false,
                                    'component': {
                                        'code': 'bk_notify',
                                        'data': {
                                            'bk_notify_content': {
                                                'hook': false,
                                                'value': '部署版本：Cheats:${92_deploy_pkg_version}'
                                            },
                                            'bk_receiver_group': {
                                                'hook': false,
                                                'value': [
                                                    'Maintainers',
                                                    'ProductPm',
                                                    'Tester'
                                                ]
                                            },
                                            'bk_notify_type': {
                                                'hook': false,
                                                'value': [
                                                    'rtx'
                                                ]
                                            },
                                            'bk_more_receiver': {
                                                'hook': false,
                                                'value': 'v_jinliu(刘金);'
                                            },
                                            'bk_notify_title': {
                                                'hook': false,
                                                'value': '92服-停服更新通知'
                                            },
                                            'biz_cc_id': {
                                                'hook': false,
                                                'value': 820
                                            }
                                        },
                                        'version': 'v1.0'
                                    },
                                    'stage_name': '步骤3',
                                    'skippable': true,
                                    'type': 'ServiceActivity',
                                    'retryable': true,
                                    'optional': true,
                                    'id': 'ne3e1b629b1c3f868b89ab9ed850f283',
                                    'loop': null
                                },
                                'n04c41c5aabe37f6b8dc4f0d312676a8': {
                                    'outgoing': 'l31e1491f7fe36ba97293acaf271a5b1',
                                    'incoming': [
                                        'l24dbf5cbf1133cfb446708c215e711d'
                                    ],
                                    'name': '暂停',
                                    'error_ignorable': false,
                                    'component': {
                                        'code': 'pause_node',
                                        'data': { },
                                        'version': 'legacy'
                                    },
                                    'stage_name': '暂停',
                                    'skippable': true,
                                    'type': 'ServiceActivity',
                                    'retryable': true,
                                    'optional': false,
                                    'id': 'n04c41c5aabe37f6b8dc4f0d312676a8',
                                    'loop': null
                                },
                                'n1f137b0841434ddad58521eeb497f55': {
                                    'outgoing': 'l7fdcf2c84ff33539ddf49e9711c4b98',
                                    'incoming': [
                                        'l98ad9d53e9d3ec39f9b40b06ac97ed3'
                                    ],
                                    'name': '暂停',
                                    'error_ignorable': false,
                                    'component': {
                                        'code': 'pause_node',
                                        'data': { },
                                        'version': 'legacy'
                                    },
                                    'stage_name': '暂停',
                                    'skippable': true,
                                    'type': 'ServiceActivity',
                                    'retryable': true,
                                    'optional': false,
                                    'id': 'n1f137b0841434ddad58521eeb497f55',
                                    'loop': null
                                },
                                'n5fb16c823cb34fa803afb490f992719': {
                                    'outgoing': 'l43a476bc23e3dc5b5e3432305025cd9',
                                    'incoming': [
                                        'l7fdcf2c84ff33539ddf49e9711c4b98'
                                    ],
                                    'name': '92服-完成更新通知',
                                    'error_ignorable': false,
                                    'component': {
                                        'code': 'bk_notify',
                                        'data': {
                                            'bk_notify_content': {
                                                'hook': false,
                                                'value': '完成更新版本：Cheats: ${92_deploy_pkg_version}'
                                            },
                                            'bk_receiver_group': {
                                                'hook': false,
                                                'value': [
                                                    'Maintainers',
                                                    'ProductPm',
                                                    'Tester'
                                                ]
                                            },
                                            'bk_notify_type': {
                                                'hook': false,
                                                'value': [
                                                    'rtx'
                                                ]
                                            },
                                            'bk_more_receiver': {
                                                'hook': false,
                                                'value': 'v_jinliu(刘金);zitayang(杨姣);'
                                            },
                                            'bk_notify_title': {
                                                'hook': false,
                                                'value': '92服-完成更新通知'
                                            },
                                            'biz_cc_id': {
                                                'hook': false,
                                                'value': 820
                                            }
                                        },
                                        'version': 'v1.0'
                                    },
                                    'stage_name': '步骤4',
                                    'skippable': true,
                                    'type': 'ServiceActivity',
                                    'retryable': true,
                                    'optional': true,
                                    'id': 'n5fb16c823cb34fa803afb490f992719',
                                    'loop': null
                                }
                            },
                            'end_event': {
                                'type': 'EmptyEndEvent',
                                'outgoing': '',
                                'incoming': [
                                    'l43a476bc23e3dc5b5e3432305025cd9'
                                ],
                                'id': 'nae8f6723b7736e79724a330c170360f',
                                'name': ''
                            },
                            'outputs': [],
                            'flows': {
                                'l64e5494a6613b89acefc01e29c704bc': {
                                    'is_default': false,
                                    'source': 'ne3e1b629b1c3f868b89ab9ed850f283',
                                    'id': 'l64e5494a6613b89acefc01e29c704bc',
                                    'target': 'n690e7b111c03671b049a1b68cc2b809'
                                },
                                'l3cbb53fa0e633e4811a98b5c08b27e5': {
                                    'is_default': false,
                                    'source': 'n23727596509363f888f9e0c9216816d',
                                    'id': 'l3cbb53fa0e633e4811a98b5c08b27e5',
                                    'target': 'n95e8503f4843ef0aac712149f10af99'
                                },
                                'lf5dd0691403341ba903d7d4b6cd70e2': {
                                    'is_default': false,
                                    'source': 'n95e8503f4843ef0aac712149f10af99',
                                    'id': 'lf5dd0691403341ba903d7d4b6cd70e2',
                                    'target': 'n690e7b111c03671b049a1b68cc2b809'
                                },
                                'l7fdcf2c84ff33539ddf49e9711c4b98': {
                                    'is_default': false,
                                    'source': 'n1f137b0841434ddad58521eeb497f55',
                                    'id': 'l7fdcf2c84ff33539ddf49e9711c4b98',
                                    'target': 'n5fb16c823cb34fa803afb490f992719'
                                },
                                'lad9a1554f4c3292ae495f096fb0b742': {
                                    'is_default': false,
                                    'source': 'n8c02adcaa8b31faa46b763bc986410e',
                                    'id': 'lad9a1554f4c3292ae495f096fb0b742',
                                    'target': 'n23727596509363f888f9e0c9216816d'
                                },
                                'lb32a98cb39233318098a71b600d9e65': {
                                    'is_default': false,
                                    'source': 'n749fe106aaf3f76b59b5867305cc6ed',
                                    'id': 'lb32a98cb39233318098a71b600d9e65',
                                    'target': 'n03cdd91d8bc31d1becb898c14c3d76f'
                                },
                                'l31e1491f7fe36ba97293acaf271a5b1': {
                                    'is_default': false,
                                    'source': 'n04c41c5aabe37f6b8dc4f0d312676a8',
                                    'id': 'l31e1491f7fe36ba97293acaf271a5b1',
                                    'target': 'n749fe106aaf3f76b59b5867305cc6ed'
                                },
                                'lc4001904a773eb8b3f5f67a11bcafe6': {
                                    'is_default': false,
                                    'source': 'n23727596509363f888f9e0c9216816d',
                                    'id': 'lc4001904a773eb8b3f5f67a11bcafe6',
                                    'target': 'ne3e1b629b1c3f868b89ab9ed850f283'
                                },
                                'lee444465d3a3c739f057e6f7583969b': {
                                    'is_default': false,
                                    'source': 'n03cdd91d8bc31d1becb898c14c3d76f',
                                    'id': 'lee444465d3a3c739f057e6f7583969b',
                                    'target': 'n1f0380c4f9f371491de556ef7075098'
                                },
                                'l24dbf5cbf1133cfb446708c215e711d': {
                                    'is_default': false,
                                    'source': 'n006d88330553aa18e886e67b0ba7dfe',
                                    'id': 'l24dbf5cbf1133cfb446708c215e711d',
                                    'target': 'n04c41c5aabe37f6b8dc4f0d312676a8'
                                },
                                'l43a476bc23e3dc5b5e3432305025cd9': {
                                    'is_default': false,
                                    'source': 'n5fb16c823cb34fa803afb490f992719',
                                    'id': 'l43a476bc23e3dc5b5e3432305025cd9',
                                    'target': 'nae8f6723b7736e79724a330c170360f'
                                },
                                'l2cdc77111c93fb9995d585180726fc6': {
                                    'is_default': false,
                                    'source': 'n1f0380c4f9f371491de556ef7075098',
                                    'id': 'l2cdc77111c93fb9995d585180726fc6',
                                    'target': 'n8c02adcaa8b31faa46b763bc986410e'
                                },
                                'l8dbde73cb613452ae0d29a88d86cd97': {
                                    'is_default': false,
                                    'source': 'n39a623de95b3a52b1de56ad7356616c',
                                    'id': 'l8dbde73cb613452ae0d29a88d86cd97',
                                    'target': 'n006d88330553aa18e886e67b0ba7dfe'
                                },
                                'l98ad9d53e9d3ec39f9b40b06ac97ed3': {
                                    'is_default': false,
                                    'source': 'n690e7b111c03671b049a1b68cc2b809',
                                    'id': 'l98ad9d53e9d3ec39f9b40b06ac97ed3',
                                    'target': 'n1f137b0841434ddad58521eeb497f55'
                                }
                            },
                            'gateways': {
                                'n03cdd91d8bc31d1becb898c14c3d76f': {
                                    'type': 'ParallelGateway',
                                    'outgoing': [
                                        'lee444465d3a3c739f057e6f7583969b'
                                    ],
                                    'incoming': [
                                        'lb32a98cb39233318098a71b600d9e65'
                                    ],
                                    'id': 'n03cdd91d8bc31d1becb898c14c3d76f',
                                    'name': '步骤2'
                                },
                                'n749fe106aaf3f76b59b5867305cc6ed': {
                                    'type': 'ConvergeGateway',
                                    'outgoing': 'lb32a98cb39233318098a71b600d9e65',
                                    'incoming': [
                                        'l31e1491f7fe36ba97293acaf271a5b1'
                                    ],
                                    'id': 'n749fe106aaf3f76b59b5867305cc6ed',
                                    'name': '步骤1_converge'
                                },
                                'n690e7b111c03671b049a1b68cc2b809': {
                                    'type': 'ConvergeGateway',
                                    'outgoing': 'l98ad9d53e9d3ec39f9b40b06ac97ed3',
                                    'incoming': [
                                        'l64e5494a6613b89acefc01e29c704bc',
                                        'lf5dd0691403341ba903d7d4b6cd70e2'
                                    ],
                                    'id': 'n690e7b111c03671b049a1b68cc2b809',
                                    'name': '步骤3_converge'
                                },
                                'n006d88330553aa18e886e67b0ba7dfe': {
                                    'type': 'ParallelGateway',
                                    'outgoing': [
                                        'l24dbf5cbf1133cfb446708c215e711d'
                                    ],
                                    'incoming': [
                                        'l8dbde73cb613452ae0d29a88d86cd97'
                                    ],
                                    'id': 'n006d88330553aa18e886e67b0ba7dfe',
                                    'name': '步骤1'
                                },
                                'n8c02adcaa8b31faa46b763bc986410e': {
                                    'type': 'ConvergeGateway',
                                    'outgoing': 'lad9a1554f4c3292ae495f096fb0b742',
                                    'incoming': [
                                        'l2cdc77111c93fb9995d585180726fc6'
                                    ],
                                    'id': 'n8c02adcaa8b31faa46b763bc986410e',
                                    'name': '步骤2_converge'
                                },
                                'n23727596509363f888f9e0c9216816d': {
                                    'type': 'ParallelGateway',
                                    'outgoing': [
                                        'lc4001904a773eb8b3f5f67a11bcafe6',
                                        'l3cbb53fa0e633e4811a98b5c08b27e5'
                                    ],
                                    'incoming': [
                                        'lad9a1554f4c3292ae495f096fb0b742'
                                    ],
                                    'id': 'n23727596509363f888f9e0c9216816d',
                                    'name': '步骤3'
                                }
                            },
                            'start_event': {
                                'type': 'EmptyStartEvent',
                                'outgoing': 'l8dbde73cb613452ae0d29a88d86cd97',
                                'incoming': '',
                                'id': 'n39a623de95b3a52b1de56ad7356616c',
                                'name': ''
                            },
                            'constants': {
                                '${task_start_time}': {
                                    'source_tag': 'datetime.datetime',
                                    'index': 0,
                                    'validation': '',
                                    'name': '任务起始时间',
                                    'custom_type': 'datetime',
                                    'value': '',
                                    'show_type': 'show',
                                    'source_type': 'custom',
                                    'schema': {
                                        'enum': [],
                                        'type': 'string',
                                        'description': '日期时间变量'
                                    },
                                    'version': 'legacy',
                                    'source_info': { },
                                    'key': '${task_start_time}',
                                    'is_meta': false,
                                    'desc': ''
                                },
                                '${task_end_time}': {
                                    'source_tag': 'datetime.datetime',
                                    'index': 1,
                                    'validation': '',
                                    'name': '任务结束时间',
                                    'custom_type': 'datetime',
                                    'value': '',
                                    'show_type': 'show',
                                    'source_type': 'custom',
                                    'schema': {
                                        'enum': [],
                                        'type': 'string',
                                        'description': '日期时间变量'
                                    },
                                    'version': 'legacy',
                                    'source_info': { },
                                    'key': '${task_end_time}',
                                    'is_meta': false,
                                    'desc': ''
                                },
                                '${92_deploy_pkg_version}': {
                                    'source_tag': 'input.input',
                                    'index': 2,
                                    'validation': '\d+.\d+.\d+.\d+',
                                    'name': '92服部署版本包名',
                                    'custom_type': 'input',
                                    'value': '',
                                    'show_type': 'show',
                                    'source_type': 'custom',
                                    'schema': {
                                        'enum': [],
                                        'type': 'string',
                                        'description': '输入框变量'
                                    },
                                    'version': 'legacy',
                                    'source_info': { },
                                    'key': '${92_deploy_pkg_version}',
                                    'is_meta': false,
                                    'desc': '需要部署Cheats版本包名(eg: gapp_cheats_server_2.4.0.4.tar.gz)'
                                }
                            }
                        },
                        'edit_time': '2020-11-24 20:38:28 +0800',
                        'create_time': '2020-11-19 21:48:52 +0800',
                        'editor': 'tobyjia',
                        'project_id': 5001212,
                        'bk_biz_name': '之路',
                        'id': 2999
                    },
                    'script': ''
                }
            ],
            'code': 200,
            'message': 'OK',
            'result': true,
            'request_id': '84479054-e643-4d75-bad0-21db7e7a83ee'
        }
    } else if (invoke === 'common') {
        return {
            result: true,
            code: 0,
            data: [],
            message: 'ok'
        }
    } else if (invoke === 'devopsProjectList') {
        return {
            result: true,
            code: 0,
            data: [
                {
                    'bk_biz_id': 'arena-cloud',
                    'name': '万智',
                    'project_id': '1c34243101d84ff59fd4f198b1d8f50c'
                }
            ],
            message: 'None'
        }
    } else if (invoke === 'devopsList') {
        return {
            result: true,
            code: 0,
            data: [
                {
                    'bk_biz_id': 'dnfcolg',
                    'id': 'p-3a3736710db24e2796ce69a7a31a0bf0',
                    'name': 'mdnf_bbs'
                }
            ],
            message: 'None'
        }
    } else if (invoke === 'devopsDetail') {
        return {
            result: true,
            code: 0,
            data: [
                {
                    'id': 'BK_CI_BUILD_wdwMSG',
                    'required': true,
                    'type': 'STRING',
                    'defaultValue': '',
                    'desc': "Descriwdwdwdwdwption of curre, purpd\\'s tri leaving a blank. ",
                    'label': '构建信息',
                    'placeholder': '手动触发',
                    'propertyType': 'BUILD'
                },
                {
                    'id': 'tag_pwdwdwaram',
                    'required': true,
                    'type': 'STRING',
                    'defaultValue': 'wdwd.9.7wwd3',
                    'desc': '需要更新的git版本号'
                }
            ]
        }
    } else if (invoke === 'devloper') {
        return {
            'result': true,
            'code': 200,
            'message': 'OK',
            'data': [
                {
                    'uid': 293,
                    'user_qq': '423',
                    'username': '432',
                    'qq_openid': '432',
                    'qq_nickname': '4234',
                    'wx_id': 'Q826771',
                    'wx_openid': null,
                    'wx_union_id': null,
                    'ww_user_id': '',
                    'ww_id': '',
                    'real_name': '43',
                    'phone': '4234234',
                    'email': '4324@qq.com',
                    'company': '4324324234',
                    'enabled': 1,
                    'role_level': 5,
                    'create_time': '2021-05-10 11:18:11',
                    'update_time': '2021-05-10 11:18:11',
                    'create_source': '管理员添加',
                    'create_user': 'heng',
                    'apply_count': 0,
                    'bind_count': 0,
                    'block_remark': null,
                    'is_blocked': 0,
                    'bugly_android_uid': null,
                    'bugly_ios_uid': null,
                    'is_encrypted': 1,
                    'is_wechat_subscribe': null,
                    'bk_qq_openid': '3432423423423'
                },
                {
                    'uid': 309,
                    'user_qq': '4432234',
                    'username': '432',
                    'qq_openid': '4234',
                    'qq_nickname': '434',
                    'wx_id': '4324234',
                    'wx_openid': null,
                    'wx_union_id': null,
                    'ww_user_id': '',
                    'ww_id': '',
                    'real_name': '良',
                    'phone': '2312312',
                    'email': '34234@432.com',
                    'company': '4324',
                    'enabled': 1,
                    'role_level': 6,
                    'create_time': '2021-06-03 19:52:26',
                    'update_time': '2021-06-03 19:52:26',
                    'create_source': '管理员添加',
                    'create_user': null,
                    'apply_count': 0,
                    'bind_count': 0,
                    'block_remark': null,
                    'is_blocked': 0,
                    'bugly_android_uid': null,
                    'bugly_ios_uid': null,
                    'is_encrypted': 1,
                    'is_wechat_subscribe': null,
                    'bk_qq_openid': '423423423423'
                },
                {
                    'uid': 310,
                    'user_qq': '356019340',
                    'username': '43434',
                    'qq_openid': '4324',
                    'qq_nickname': '43',
                    'wx_id': '4323',
                    'wx_openid': null,
                    'wx_union_id': null,
                    'ww_user_id': '',
                    'ww_id': '',
                    'real_name': '1',
                    'phone': '43234344',
                    'email': '4234234@4343.com',
                    'company': '上海43244434络科技有限公司',
                    'enabled': 1,
                    'role_level': 4,
                    'create_time': '2021-06-03 19:53:02',
                    'update_time': '2021-06-03 19:53:02',
                    'create_source': '管理员添加',
                    'create_user': null,
                    'apply_count': 0,
                    'bind_count': 0,
                    'block_remark': null,
                    'is_blocked': 0,
                    'bugly_android_uid': null,
                    'bugly_ios_uid': null,
                    'is_encrypted': 1,
                    'is_wechat_subscribe': null,
                    'bk_qq_openid': '423423432423423'
                },
                {
                    'uid': 562,
                    'user_qq': '4322334343',
                    'username': '44',
                    'qq_openid': '4234432',
                    'qq_nickname': '叶',
                    'wx_id': 'yxp508016986',
                    'wx_openid': '231231231231231',
                    'wx_union_id': '321312',
                    'ww_user_id': '',
                    'ww_id': '',
                    'real_name': '叶',
                    'phone': '231321312',
                    'email': '12321@tencent.com',
                    'company': '腾讯',
                    'enabled': 1,
                    'role_level': 4,
                    'create_time': '2021-11-05 16:39:51',
                    'update_time': '2021-11-05 16:39:51',
                    'create_source': '申请',
                    'create_user': '1',
                    'apply_count': 1,
                    'bind_count': 0,
                    'block_remark': null,
                    'is_blocked': 0,
                    'bugly_android_uid': null,
                    'bugly_ios_uid': null,
                    'is_encrypted': 1,
                    'is_wechat_subscribe': null,
                    'bk_qq_openid': '2312312312312312'
                },
                {
                    'uid': 574,
                    'user_qq': '35235238',
                    'username': '王',
                    'qq_openid': 'wdwEA3E86',
                    'qq_nickname': '王',
                    'wx_id': '33',
                    'wx_openid': 'wwd',
                    'wx_union_id': 'wdaa8',
                    'ww_user_id': '',
                    'ww_id': '',
                    'real_name': '王',
                    'phone': '22222222',
                    'email': '1',
                    'company': '腾讯',
                    'enabled': 1,
                    'role_level': 4,
                    'create_time': '2021-11-11 15:45:23',
                    'update_time': '2021-11-11 15:45:23',
                    'create_source': '外网申请',
                    'create_user': '王',
                    'apply_count': 1,
                    'bind_count': 0,
                    'block_remark': null,
                    'is_blocked': 0,
                    'bugly_android_uid': null,
                    'bugly_ios_uid': null,
                    'is_encrypted': 1,
                    'is_wechat_subscribe': null,
                    'bk_qq_openid': '231231231232'
                }
            ],
            'request_id': '70a301ab-b937-4a9c-b655-1e4bdc3760a0'
        }
    }
    return {
        code: 0,
        data: {}
    }
}
