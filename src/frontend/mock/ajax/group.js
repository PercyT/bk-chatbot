/**
 * @file mock index module
 * @author
 */

import moment from 'moment'
import faker from 'faker'
import chalk from 'chalk'
import Mock from 'mockjs'

import { randomInt, sleep } from './util'

export async function response (getArgs, postArgs, req) {
    const invoke = getArgs.invoke
    if (invoke === 'groupTableData') {
        return {
            'result': true,
            'code': '200',
            'message': 'success',
            'data': {
                'count': 3,
                'next': null,
                'previous': null,
                'results': [
                    {
                        'chat_group_id': 'ww8495829849',
                        'chat_group_name': 'wedw',
                        'chat_bot_type': 'WEWORK',
                        'biz_id': '638',
                        'biz_name': '王者荣耀',
                        'created_by': 'System',
                        'created_at': '2021-04-22T15:09:12.553449',
                        'updated_by': 'System',
                        'updated_at': '2021-04-22T15:09:12.553213',
                        'is_deleted': false,
                        'deleted_by': null,
                        'deleted_at': null,
                        'description': null,
                        'chat_index_id': '-1'
                    },
                    {
                        'chat_group_id': 'ww2131231231',
                        'chat_bot_type': 'WEWORK',
                        'chat_group_name': 'wewdwdw',
                        'biz_id': '820',
                        'biz_name': 'POE',
                        'created_by': 'System',
                        'created_at': '2021-04-22T15:08:50.283922',
                        'updated_by': 'System',
                        'updated_at': '2021-04-22T15:08:50.283494',
                        'is_deleted': false,
                        'deleted_by': null,
                        'deleted_at': null,
                        'description': null,
                        'chat_index_id': '-1'
                    },
                    {
                        'chat_group_id': 'abcd11',
                        'chat_bot_type': 'WEWORK',
                        'chat_group_name': 'wewdwwddw',
                        'biz_id': '123',
                        'biz_name': '业务123',
                        'created_by': 'System',
                        'created_at': '2021-04-22T15:08:03.723619',
                        'updated_by': 'System',
                        'updated_at': '2021-04-22T15:08:03.723317',
                        'is_deleted': false,
                        'deleted_by': null,
                        'deleted_at': null,
                        'description': null,
                        'chat_index_id': '-1'
                    }
                ]
            },
            'request_id': '9739a8c6-c77d-489f-a9e8-f50b352bbc8a'
        }
    } else if (invoke === 'getGroupSummary') {
        return {
            'result': true,
            'data': [
                { 'chat_group_name': 'wedw',
                    'chat_index_id': -1 }
            ]
        }
    }
    return {
        code: 0,
        data: {}
    }
}
