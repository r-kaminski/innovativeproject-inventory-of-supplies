from django.db import models
from datetime import date as datetime_date

class InventoryReport(models.Model):
    """
    InventoryReport holds one-to-many relationship with InventorySupply objects
    List of InventorySupply objects can be referenced by 'supplies'
    E.g.: InventoryReport.objects.get(pk=1).supplies
    """
    date = models.DateField(default=datetime_date.today)
    name = models.CharField(max_length=50)


class InventorySupply(models.Model):
    """
    InventorySupply maps regular Supply objects to statuses
    Possible statuses:
        is_checked = True, the supply has been checkout out during reporting stage
        is_checked = False (default), the supply hasn't been checked out yet
    """
    inventory_supply = models.OneToOneField('supplies.Supply', on_delete=models.CASCADE)
    is_checked = models.BooleanField(default=False)
    inventory_report = models.ForeignKey(InventoryReport, on_delete=models.CASCADE, related_name="inventory_supplies")