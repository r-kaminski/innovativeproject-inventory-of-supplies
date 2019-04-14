from rest_framework import serializers
from .models import InventoryReport, InventorySupply

from supplies.models import Supply
from supplies.serializers import SupplySerializer, SupplyHeaderSerializer


class InventorySupplySerializer(serializers.ModelSerializer):
    supply = SupplySerializer(source='inventory_supply', many=False, read_only=True)

    class Meta:
        model = InventorySupply
        fields = ('id','supply', 'is_checked')

class InventorySupplyHeaderSerializer(serializers.ModelSerializer):
    """
    This header serializer is used in case of listing contents of particular InventoryReport (not InventorySupply)
    Instead of serializing all details of a supply (supplies.models.Supply), only ID and name is serialized
    The rest of details can be accessed by '/api/inventories/supplies/<int:pk>' with ID provided by this serializer
    This will future-proof that adding more details to supply (e.g. image) won't attach unnecessary data to InventoryReport details view
    """
    supply_header = SupplyHeaderSerializer(source='inventory_supply', many=False, read_only=True)

    class Meta:
        model = InventorySupply
        fields = ('id', 'supply_header', 'is_checked')

class InventoryReportSerializer(serializers.ModelSerializer):
    supplies = InventorySupplyHeaderSerializer(source='inventory_supplies', many=True, read_only=True)

    class Meta:
        model = InventoryReport
        fields = ('id', 'date', 'name', 'supplies',)
        extra_kwargs = {
            'supplies': {'required': False},
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


