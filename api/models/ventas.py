"""Modelo Ventas"""

# django
from django.db import models

# modelo
from api.models import Cliente, Producto


class Venta(models.Model):
    cantidad = models.IntegerField()
    total = models.FloatField()

    # Relaciones
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE,
                                related_name="ventas")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE,
                                 related_name="ventas")

    # Utilidad
    activo = models.BooleanField(default=True)

    def delete(self):
        self.activo = False
        self.save()
