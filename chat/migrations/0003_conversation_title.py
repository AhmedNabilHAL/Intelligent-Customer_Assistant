# Generated by Django 4.0.3 on 2022-07-09 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_remove_customuser_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='conversation',
            name='title',
            field=models.CharField(default='test', max_length=256),
            preserve_default=False,
        ),
    ]