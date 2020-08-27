"""Modelo Cliente """

# django
from django.db import models


class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    dirección = models.TextField()
    teléfono = models.CharField(max_length=15)
    # Utilidad
    activo = models.BooleanField(default=True)
    
    def delete(self):
        self.activo = False
        self.save()
