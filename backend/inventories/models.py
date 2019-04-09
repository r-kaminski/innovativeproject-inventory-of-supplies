from django.db import models
from datetime import date as datetime_date

from supplies.models import Supply

class InventoryReport(models.Model):
    """
    InventoryReport object holds OneToMany relationship with InventorySupply objects.
    It can be referenced by InventoryReport.get(...).supplies
    """
    date = models.DateField(default=datetime_date.today)
    name = models.CharField(max_length=50)


class InventorySupply(models.Model):
    inventory_supply = models.OneToOneField(Supply, on_delete=models.CASCADE, primary_key=True)
    is_checked = models.BooleanField(default=False)
    inventory_report = models.ForeignKey(InventoryReport, on_delete=models.CASCADE, related_name="supplies")