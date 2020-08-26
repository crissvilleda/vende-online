"""Modelo Producto """

# django
from django.db import models
from django.contrib.auth.models import User


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='Productos', null=True, blank=True)
    descripción = models.TextField()
    precio = models.FloatField()
    cantidad = models.IntegerField()

    # Relaaciones
    usuario = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name='productos')

    # Información extra
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self):
        self.activo = False
        self.save()
