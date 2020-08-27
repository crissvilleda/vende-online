# Generated by Django 2.2.13 on 2020-08-27 03:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_producto'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('dirección', models.TextField()),
                ('teléfono', models.CharField(max_length=15)),
                ('activo', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('total', models.FloatField()),
                ('activo', models.BooleanField(default=True)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ventas', to='api.Cliente')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ventas', to='api.Producto')),
            ],
        ),
    ]
