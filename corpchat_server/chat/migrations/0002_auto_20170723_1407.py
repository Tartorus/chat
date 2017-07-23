# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-23 14:07
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='messages',
            name='dialog',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='chat.Dialog'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='dialogmember',
            name='dialog',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='members', to='chat.Dialog'),
        ),
        migrations.AlterField(
            model_name='dialogmember',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dialogs', to=settings.AUTH_USER_MODEL),
        ),
    ]
