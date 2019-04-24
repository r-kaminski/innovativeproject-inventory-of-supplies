from .models import InventoryReport, InventorySupply


class ParameterException(Exception):
    pass


def validate_input_data(kwargs):
    if 'inventory_id' not in kwargs:
        raise ParameterException(
            {'message': 'Parameter "inventory_id" expected'})
    if 'inventory_supply_id' not in kwargs:
        raise ParameterException(
            {'message': 'Parameter "inventory_supply_id" expected'})

    try:
        report = InventoryReport.objects.get(pk=kwargs.get('inventory_id'))
        supply = report.inventory_supplies.get(
            inventory_supply_id=kwargs.get('inventory_supply_id'))

        if supply not in report.inventory_supplies.all():
            raise ParameterException(
                {'message': 'No such supply in this inventory'})
    except InventoryReport.DoesNotExist:
        raise
    except InventorySupply.DoesNotExist:
        raise
