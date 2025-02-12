# Generated by Django 2.2.16 on 2022-03-03 15:23

import common.models.base
import common.models.json
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TimerModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_by', models.CharField(blank=True, default='admin', max_length=255, null=True, verbose_name='创建人')),
                ('created_at', common.models.base.FormatDateTimeField(auto_now_add=True, null=True, verbose_name='创建时间')),
                ('updated_by', models.CharField(blank=True, default='admin', max_length=255, null=True, verbose_name='更新人')),
                ('updated_at', common.models.base.FormatDateTimeField(auto_now=True, null=True, verbose_name='更新时间')),
                ('is_deleted', models.BooleanField(default=False, verbose_name='是否删除')),
                ('deleted_by', models.CharField(blank=True, default='admin', max_length=255, null=True, verbose_name='删除人')),
                ('deleted_at', common.models.base.FormatDateTimeField(blank=True, null=True, verbose_name='删除时间')),
                ('description', models.TextField(blank=True, null=True, verbose_name='描述')),
                ('biz_id', models.IntegerField(verbose_name='业务id')),
                ('timer_name', models.CharField(max_length=256, verbose_name='定时任务名称')),
                ('timer_type', models.IntegerField(choices=[(0, 'DEFAULT'), (1, 'ONCE'), (2, 'REPEAT')], default=0, verbose_name='定时任务类型')),
                ('timer_status', models.IntegerField(choices=[(1, 'OPEN'), (2, 'CLOSE')], default=1, verbose_name='定时任务状态')),
                ('timer_user', models.CharField(default='', max_length=128, verbose_name='定时任务添加人')),
                ('exec_data', common.models.json.DictCharField(verbose_name='执行数据')),
                ('execute_time', models.CharField(default='', max_length=256, verbose_name='一次执行时间')),
                ('expression', models.CharField(default='', max_length=256, verbose_name='定时规则')),
                ('job_timer_id', models.IntegerField(default=0, verbose_name='job定时任务id')),
            ],
            options={
                'db_table': 'tab_timers',
            },
        ),
    ]
