from django.urls import path
from django.urls import re_path
from .views import InventoryReportListCreateView, InventoryReportDetailsView, InventoryReportRemoveView
from .views import InventorySupplyView, InventoryReportCSV, InventoryReportLastUpdateView, InventoryReportPDF
from .views import InventoryReportImportView
app_name = "inventories"

urlpatterns = [
    path('', InventoryReportListCreateView.as_view()),
    path('<int:pk>', InventoryReportDetailsView.as_view(), name='report-details'),
    path('<int:inventory_id>/supplies/<int:inventory_supply_id>',
         InventorySupplyView.as_view(), name='supplies-details-update'),
    path('remove/<int:pk>', InventoryReportRemoveView.as_view(), name='report-remove'),
    path('<int:pk>/last_update',
         InventoryReportLastUpdateView.as_view(), name="last-update"),
    path('csv/<int:pk>', InventoryReportCSV.as_view(), name='report-csv'),
    path('pdf/<int:pk>', InventoryReportPDF.as_view(), name='report-pdf'),
    path('import/', InventoryReportImportView.as_view(), name='import-csv'),
]
