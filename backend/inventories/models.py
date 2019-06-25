from django.db import models
from datetime import date as datetime_date
from supplies.models import Supply
from django.utils import timezone
from users.models import User


class InventoryReport(models.Model):
    """
    InventoryReport holds one-to-many relationship with InventorySupply objects
    List of InventorySupply objects can be referenced by 'inventory_supplies.all()' attribute
    E.g.: InventoryReport.objects.get(pk=1).inventory_supplies.all()
    """
    date = models.DateField(default=datetime_date.today)
    name = models.CharField(max_length=50)
    last_update = models.DateTimeField(default=timezone.now)


class InventorySupply(models.Model):
    """
    InventorySupply maps regular Supply objects to statuses
    Possible statuses:
        is_checked = True, the supply has been checkout out during reporting stage
        is_checked = False (default), the supply hasn't been checked out yet
    """
    inventory_supply = models.ForeignKey(
        Supply, on_delete=models.CASCADE, blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    checked_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, blank=True, null=True)
    inventory_report = models.ForeignKey(InventoryReport,
                                         on_delete=models.CASCADE, related_name="inventory_supplies", blank=True, null=True)
