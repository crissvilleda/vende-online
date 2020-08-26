"""Productos Serializer """

# rest framework
from rest_framework import serializers

# modelos
from api.models import Producto


class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields = "__all__"
        extra_kwargs = {'imagen': {'required': False}}
