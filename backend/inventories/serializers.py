from rest_framework import serializers
from .models import InventoryReport, InventorySupply

from supplies.models import Supply

class InventoryReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryReport
        fields = ('id', 'date', 'name', 'inventory_supplies',)
        extra_kwargs = {
            'inventory_supplies': {'required': False},
            'date': {'required': False},
        }

    def create(self, validated_data, **kwargs):
        """
        Automatically populates with InventorySupply
        """
        report = InventoryReport.objects.create(**validated_data)
        for supply in Supply.objects.all():
            inventory_supply = InventorySupply.objects.create(inventory_supply=supply, inventory_report=report, is_checked=False)
            inventory_supply.save()
        report.save()
        return report


class InventorySupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = InventorySupply
        fields = ('id','inventory_supply', 'is_checked', 'inventory_report')
