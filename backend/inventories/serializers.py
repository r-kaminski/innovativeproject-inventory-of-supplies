from rest_framework import serializers
from .models import InventoryReport, InventorySupply

class InventoryReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryReport
        fields = ('id', 'date', 'name', 'supplies',)


class InventorySupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = InventorySupply
        fields = ('id','inventory_supply', 'is_checked', 'inventory_report')
