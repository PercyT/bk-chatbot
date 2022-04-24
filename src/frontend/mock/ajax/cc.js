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
                    'bk_biz_id': '148',
                    'bk_biz_name': '绿色征途'
                },
                {
                    'bk_biz_id': '511',
                    'bk_biz_name': '全职大师'
                },
                {
                    'bk_biz_id': '734',
                    'bk_biz_name': '天堂2-点击屠龙'
                },
                {
                    'bk_biz_id': '768',
                    'bk_biz_name': '王牌NBA'
                },
                {
                    'bk_biz_id': '820',
                    'bk_biz_name': '流放之路'
                },
                {
                    'bk_biz_id': '943',
                    'bk_biz_name': 'windows安全周边支持'
                },
                {
                    'bk_biz_id': '1092',
                    'bk_biz_name': 'NBA2KOL2'
                },
                {
                    'bk_biz_id': '100202',
                    'bk_biz_name': '罗博造造'
                },
                {
                    'bk_biz_id': '639',
                    'bk_biz_name': 'Fortnite'
                }
            ],
            'result': true
        }
    } else if (invoke === 'enterExample1') {
        const delay = getArgs.delay
        await sleep(delay)
        return {
            // http status code, 后端返回的数据没有这个字段，这里模拟这个字段是为了在 mock 时更灵活的自定义 http status code，
            // 同时热更新即改变 http status code 后无需重启服务，这个字段的处理参见 build/ajax-mbk_biz_iddleware.js
            // statusCode: 401,
            code: 0,
            data: {
                msg: `我是 enterExample1 请求返回的数据。本请求需耗时 ${delay} ms`
            },
            message: 'ok'
        }
    }
    return {
        code: 0,
        data: {}
    }
}
