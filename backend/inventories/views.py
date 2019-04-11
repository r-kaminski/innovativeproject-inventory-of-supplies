from django.shortcuts import render
from rest_framework import generics, permissions

from .models import InventoryReport
from .serializers import InventoryReportSerializer

class InventoryReportCreateView(generics.CreateAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer