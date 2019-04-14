from django.shortcuts import render
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .models import InventoryReport, InventorySupply
from .serializers import InventoryReportSerializer, InventorySupplySerializer



class InventoryReportCreateView(generics.CreateAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer


class InventoryReportListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer


class InventoryReportDetailsView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer


class InventoryReportRemoveView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer


class InventorySupplyDetailsUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = InventorySupply.objects.all()
    serializer_class = InventorySupplySerializer
