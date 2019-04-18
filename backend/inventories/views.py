from django.shortcuts import render
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .models import InventoryReport, InventorySupply
from .serializers import InventoryReportSerializer, InventorySupplySerializer, InventoryReportListSerializer
from backend.pagination import ResultSetPagination


class InventoryReportCreateView(generics.CreateAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer


class InventoryReportListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportListSerializer
    pagination_class = ResultSetPagination


class InventoryReportDetailsView(generics.ListAPIView):
    """
    Lists ONLY all supplies of a report.
    Also supports pagination, example: /api/inventories/3?page=1&page_size=10
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = InventorySupplySerializer
    pagination_class = ResultSetPagination

    def get(self, request, *args, **kwargs):
        if 'pk' not in kwargs:
            return Response('Parameter "id" expected', status=status.HTTP_400_BAD_REQUEST)
        try:
            InventoryReport.objects.get(pk=kwargs.get('pk'))
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)

        return super().get(request, args, kwargs)

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return InventorySupply.objects.filter(inventory_report__pk=pk)


class InventoryReportRemoveView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer


class InventorySupplyDetailsUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = InventorySupply.objects.all()
    serializer_class = InventorySupplySerializer
