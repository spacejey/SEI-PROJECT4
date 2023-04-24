# Generated by Django 4.2 on 2023-04-24 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.IntegerField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('text', models.TextField(max_length=300)),
            ],
        ),
    ]
