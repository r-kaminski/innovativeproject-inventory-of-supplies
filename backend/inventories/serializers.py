from rest_framework import serializers
from .models import InventoryReport, InventorySupply

from supplies.models import Supply
from supplies.serializers import SupplySerializer, SupplyHeaderSerializer


class InventorySupplySerializer(serializers.ModelSerializer):
    supply = SupplySerializer(source='inventory_supply', many=False, read_only=True)

    class Meta:
        model = InventorySupply
        fields = ('supply', 'is_checked')


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
    """
    Serializer for the purpose of listing all InventoryReport objects
    It doesn't contain details about it's supplies, and provides only representational form
    """
    supplies_total = serializers.SerializerMethodField()
    supplies_checked_out = serializers.SerializerMethodField()

    class Meta:
        model = InventoryReport
        fields = ('id', 'date', 'name', 'supplies_total', 'supplies_checked_out',)

    def get_supplies_total(self, obj):
        return obj.inventory_supplies.all().count()

    def get_supplies_checked_out(self, obj):
        return obj.inventory_supplies.all().exclude(is_checked=False).count()

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


class InventoryReportCSVSerializer(serializers.ModelSerializer):
    """
    Serializer for the purpose of exporting report contents to CSV file
    """
    supplies = InventorySupplySerializer(source='inventory_supplies', many=True, read_only=True)
    class Meta:
        model = InventoryReport
        fields = ('id', 'date', 'name', 'supplies')



