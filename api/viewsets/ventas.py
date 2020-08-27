""" Ventas ViewSet """

import json

# rest_framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

# django
from django.db import transaction

# modelos
from api.models import Cliente, Venta, Producto

# serializer
from api.serializers import VentasSerializer


class VentaViewset(viewsets.ModelViewSet):
    queryset = Venta.objects.filter(activo=True)
    serializer_class = VentasSerializer

    def get_permissions(self):
        permission = []

        if self.action == "create":
            permission.append(AllowAny)

        else:
            permission.append(IsAuthenticated)

        return [p() for p in permission]

    def create(self, request, *args, **kwargs):

        try:

            with transaction.atomic():
                venta_data = request.data['venta']
                cliente_data = request.data['cliente']

                cliente = Cliente.objects.create(
                    nombre=cliente_data['nombre'],
                    dirección=cliente_data['dirección'],
                    teléfono=cliente_data['teléfono']
                )
                venta_data['cliente'] = cliente.id
                # Obtenemos producto para actualizar cantidad
                producto = Producto.objects.get(pk=venta_data['producto'])
                actualizar_cantidad = producto.cantidad - \
                    venta_data['cantidad']
                serializer = VentasSerializer(data=venta_data)
                if serializer.is_valid():
                    serializer.save()
                    producto.cantidad = actualizar_cantidad
                    producto.save()
                    return Response(serializer.data,
                                    status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': 'Error al guardar'},
                                    status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_404_NOT_FOUND)
