"""Ventas Serializer"""

# rest_framework
from rest_framework import serializers

# modelo
from api.models import Venta


class VentasSerializer(serializers.ModelSerializer):

    class Meta:
        model = Venta
        fields = "__all__"
