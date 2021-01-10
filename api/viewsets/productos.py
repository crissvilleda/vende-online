""" Productos ViewSets """

# rest_framework
from django.core.files import File
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

# serializer
from api.serializers import ProductoSerializer, ReadProductoSerializer

# modelos
from api.models import Producto


import json


class ProductosViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer
    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    search_fields = ('nombre', 'descripción')
    ordering_fields = ('nombre', 'precio')

    def get_permissions(self):
        permissions = []
        if self.action == "productos":
            permissions.append(AllowAny)
        else:
            permissions.append(IsAuthenticated)
        return [p() for p in permissions]

    def get_queryset(self):
        queryset = Producto.objects.filter(activo=True)
        if self.action == 'list':
            return queryset.filter(usuario=self.request.user)
        return queryset

    def create(self, request, *args, **kwargs):
        try:
            data = json.loads(request.data['data'])
            imagen = request.data.get('imagen')
            if imagen is not None:
                data['imagen'] = File(imagen)
            data['usuario'] = self.request.user.id
            data['precio'] = float(data['precio'])
            data['cantidad'] = int(data['cantidad'])
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({'erros': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        try:
            data = json.loads(request.data['data'])
            imagen = request.data.get('imagen')

            data['usuario'] = self.request.user.id
            data['precio'] = float(data['precio'])
            data['cantidad'] = int(data['cantidad'])
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            instance = self.get_object()

            instance.nombre = serializer.data['nombre']
            instance.descripción = serializer.data['descripción']
            instance.precio = serializer.data['precio']
            instance.cantidad = serializer.data['cantidad']
            if imagen is not None:
                instance.imagen = File(imagen)
            instance.save()
            return Response(serializer.data,
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def productos(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        queryset = queryset.filter(cantidad__gt=0)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ReadProductoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
