"""Reportes Serializer """

from rest_framework import serializers


class ReportesSerializer(serializers.Serializer):

    id = serializers.IntegerField()
    nombre = serializers.CharField()
    cantidad = serializers.IntegerField()
    total_venta = serializers.SerializerMethodField()
    cantidad_venta = serializers.SerializerMethodField()

    def get_total_venta(self, data):
        if data['total_venta'] is not None:
            return data['total_venta']
        else:
            return 0

    def get_cantidad_venta(self, data):
        if data['cantidad_venta'] is not None:
            return data['cantidad_venta']
        else:
            return 0
