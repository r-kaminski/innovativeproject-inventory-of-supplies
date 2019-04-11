from django.urls import path
from .views import InventoryReportCreateView

urlpatterns = [
    path('create', InventoryReportCreateView.as_view())
]
# /api/inventories/ in backend.urls

# '/reports' - list InventoryReport objects (List)

# '/reports/<int:pk>' - details of particular InventoryReport object (Details)
#   List of assigned InventorySupply objects can be accesed by 'supplies' attribute
#   RetrieveUpdateDestroyAPIView for admin user
#   RetrieveAPIView for other users
#   Most likely scanning QR codes and manual ID input should be handled here on client side

# '/reports/create' - create InventoryReport object (Create)
#   Whenever admin creates new report, it should be populated with supplies existing in database
#   Therefore create method for this view should be overrided, and population flow provided

# '/reports/<int:pk>/supplies/checkout'
#   a supplies.Supply id is provided in request
#   id can be used to map to InventorySupply
#   e.g.: InventorySupply.objects.filter(inventory_report__id=ir_ID).filter(inventory_supply__id=is_ID)[0]

# '/supplies/<int:pk>' - view or update (status of) particular InventorySupply (RetrieveUpdate)
#   Update should only handle setting is_checked flag on or off
#   Other modifications shouldn't be allowed there
#   inventories.InventorySupply maps to supplies.Supply so modificating latter would affect the former
#   Population (creation) of inventories.InventorySupply will be handled through InventoryReport creation view

