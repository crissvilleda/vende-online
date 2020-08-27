""" Reporte Viewset """
# rest_framework
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

# django
from django.db.models import Sum, Avg

# Serializer
from api.serializers import ReportesSerializer

# modelos
from api.models import Producto, Venta


class ReportesViewset(viewsets.GenericViewSet):
    queryset = Venta.objects.filter(activo=True)

    @action(detail=False, methods=['get'])
    def generar_reporte(self, request):
        # Total ventas por producto

        try:
            reporte_productos = Producto.objects.filter(
                usuario=self.request.user
            ).values('id', 'nombre', 'cantidad').annotate(
                total_venta=Sum('ventas__total'),
                cantidad_venta=Sum('ventas__cantidad'))
            serializer = ReportesSerializer(reporte_productos, many=True)

            reporte_global = Producto.objects.filter(
                usuario=self.request.user).aggregate(
                    venta_global=Sum('ventas__total'))

            reporte_cantidad_productos = Producto.objects.filter(
                usuario=self.request.user).aggregate(
                    cantidad_global=Sum('ventas__cantidad'))

            reporte_promedio = Producto.objects.filter(
                usuario=self.request.user).aggregate(avg_precio=Avg('precio'))

            data = {
                'productos': serializer.data,
                'total_venta': reporte_global['venta_global'],
                'precio_promedio': reporte_promedio['avg_precio'],
                'cantidad': reporte_cantidad_productos['cantidad_global']
            }
            return Response(data, status=status.HTTP_202_ACCEPTED)

        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_404_NOT_FOUND)
