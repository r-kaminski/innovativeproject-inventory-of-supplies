from django.shortcuts import render
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .models import InventoryReport, InventorySupply
from .serializers import InventoryReportSerializer, InventorySupplySerializer, InventorySupplyHeaderSerializer
from backend.pagination import ResultSetPagination
from backend.permissions import IsAuthenticatedReadOnly
from .validators import ParameterException, validate_input_data, validate_order


class InventoryReportListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedReadOnly | permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer
    pagination_class = ResultSetPagination


class InventoryReportDetailsView(generics.ListAPIView):
    """
    Lists ONLY all supplies of a report.
    Also supports pagination, example: /api/inventories/3?page=1&page_size=10
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = InventorySupplyHeaderSerializer
    pagination_class = ResultSetPagination

    def get(self, request, *args, **kwargs):
        if 'pk' not in kwargs:
            return Response('Parameter "id" expected', status=status.HTTP_400_BAD_REQUEST)
        try:
            InventoryReport.objects.get(pk=kwargs.get('pk'))
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)

        if 'order' in request.query_params:
            order = request.query_params['order']
            if not validate_order(order):
                return Response('Wrong order: {}'.format(order), status=status.HTTP_400_BAD_REQUEST)
        return super().get(request, args, kwargs)

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if 'order' in self.request.query_params:
            order = self.request.query_params.get('order')
        else:
            order = "id"
        return InventorySupply.objects.filter(inventory_report__pk=pk).order_by(order)


class InventoryReportRemoveView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer


class InventorySupplyView(generics.RetrieveUpdateAPIView):
    serializer_class = InventorySupplySerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = 'inventory_supply_id'

    def get(self, request, *args, **kwargs):
        try:
            validate_input_data(kwargs)
            return super().get(request, args, kwargs)
        except ParameterException as pe:
            return Response(pe.args[0], status=status.HTTP_400_BAD_REQUEST)
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)
        except InventorySupply.DoesNotExist:
            return Response('Supply does not exist', status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        try:
            validate_input_data(kwargs)
            return super().patch(request, args, kwargs)
        except ParameterException as pe:
            return Response(pe.args[0], status=status.HTTP_400_BAD_REQUEST)
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)
        except InventorySupply.DoesNotExist:
            return Response('Supply does not exist', status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        try:
            validate_input_data(kwargs)
            return super().put(request, args, kwargs)
        except ParameterException as pe:
            return Response(pe.args[0], status=status.HTTP_400_BAD_REQUEST)
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)
        except InventorySupply.DoesNotExist:
            return Response('Supply does not exist', status=status.HTTP_404_NOT_FOUND)

    def get_queryset(self):
        return InventorySupply.objects.filter(inventory_report_id=self.kwargs.get('inventory_id'))
