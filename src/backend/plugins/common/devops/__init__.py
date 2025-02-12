"""
TencentBlueKing is pleased to support the open source community by making
蓝鲸智云PaaS平台社区版 (BlueKing PaaSCommunity Edition) available.
Copyright (C) 2017-2018 THL A29 Limited,
a Tencent company. All rights reserved.
Licensed under the MIT License (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://opensource.org/licenses/MIT
Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the License for the
specific language governing permissions and limitations under the License.
"""

import json

from opsbot import on_command, CommandSession
from .api import DevOpsTask


@on_command('bk_devops_project_list', aliases=('蓝盾流水线', 'bk_devops'))
async def _(session: CommandSession):
    try:
        bk_biz_id = session.ctx['SelectedItems']['SelectedItem']['OptionIds']['OptionId']
    except KeyError:
        bk_biz_id = None

    msg_template = await DevOpsTask(session, bk_biz_id).render_devops_project_list()
    msg_template and await session.send(**msg_template)


@on_command('bk_devops_project_select')
async def _(session: CommandSession):
    msg_template = await DevOpsTask(session).render_devops_pipeline_list()
    msg_template and await session.send(**msg_template)


@on_command('bk_devops_pipeline_select')
async def _(session: CommandSession):
    msg_template = await DevOpsTask(session).render_devops_pipeline_detail()
    msg_template and await session.send(**msg_template)


@on_command('bk_devops_pipeline_update')
async def _(session: CommandSession):
    if 'event_key' in session.ctx:
        _, bk_devops_pipeline = session.ctx['event_key'].split('|')
        session.state['bk_devops_pipeline'] = json.loads(bk_devops_pipeline)

    content = f'''>**CI TIP**
        >请顺序输入参数，**换行分隔**'''
    msg_template = session.bot.send_template_msg('render_markdown_msg', content)
    params, _ = session.get('params', prompt='...', **msg_template)
    params = params.split('\n')
    for i, item in enumerate(params):
        session.state['bk_devops_pipeline']['start_infos'][i]['value'] = item

    msg_template = await DevOpsTask(session).render_devops_pipeline_detail()
    msg_template and await session.send(**msg_template)


@on_command('bk_devops_pipeline_execute')
async def _(session: CommandSession):
    _, bk_devops_pipeline = session.ctx['event_key'].split('|')
    bk_devops_pipeline = json.loads(bk_devops_pipeline)

    flow = DevOpsTask(session)
    result = await flow.execute_task(bk_devops_pipeline)
    msg_template = flow.render_devops_execute_msg(result, bk_devops_pipeline)
    await session.send(**msg_template)


@on_command('bk_devops_pipeline_cancel')
async def _(session: CommandSession):
    _, bk_devops_pipeline_name = session.ctx['event_key'].split('|')
    content = f'''>**CI TIP** 
              ><font color=\"warning\">您的蓝盾流水线「{bk_devops_pipeline_name}」已取消...</font> 
              '''
    msg_template = session.bot.send_template_msg('render_markdown_msg', content)
    await session.send(**msg_template)
