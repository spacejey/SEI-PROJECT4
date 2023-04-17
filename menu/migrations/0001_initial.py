# Generated by Django 4.2 on 2023-04-16 14:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('trucks', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('notes', models.TextField(max_length=20)),
                ('truck_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menu', to='trucks.truck')),
            ],
        ),
    ]
