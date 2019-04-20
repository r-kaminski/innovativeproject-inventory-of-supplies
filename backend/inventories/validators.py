from .models import InventoryReport, InventorySupply

class ParameterException(Exception):
    pass

def validate_input_data(kwargs):
    if 'inventory_id' not in kwargs:
        raise ParameterException({'message': 'Parameter "inventory_id" expected'})
    if 'supply_id' not in kwargs:
        raise ParameterException({'message': 'Parameter "supply_id" expected'})

    try:
        report = InventoryReport.objects.get(pk=kwargs.get('inventory_id'))
        supply = InventorySupply.objects.get(pk=kwargs.get('supply_id'))

        if supply not in report.inventory_supplies.all():
            raise ParameterException({'message': 'No such supply in this inventory'})
    except InventoryReport.DoesNotExist:
        raise
    except InventorySupply.DoesNotExist:
        raise
