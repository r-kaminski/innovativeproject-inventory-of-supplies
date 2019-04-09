from django.contrib import admin
from .models import InventoryReport, InventorySupply

admin.site.register(InventoryReport)
admin.site.register(InventorySupply)
