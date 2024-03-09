# Generated by Django 4.0.3 on 2022-07-09 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_conversation_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='conversation',
            name='role',
            field=models.IntegerField(choices=[(0, 'open'), (1, 'solved'), (2, 'solved')], default=0),
        ),
    ]
