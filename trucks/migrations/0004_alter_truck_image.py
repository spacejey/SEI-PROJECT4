# Generated by Django 4.2 on 2023-04-24 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trucks', '0003_alter_truck_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='truck',
            name='image',
            field=models.ImageField(default='', upload_to='images/'),
        ),
    ]
