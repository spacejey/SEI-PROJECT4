# Generated by Django 4.2 on 2023-04-21 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trucks', '0002_truck_latitude_truck_longitude'),
    ]

    operations = [
        migrations.AlterField(
            model_name='truck',
            name='latitude',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='truck',
            name='longitude',
            field=models.FloatField(null=True),
        ),
    ]