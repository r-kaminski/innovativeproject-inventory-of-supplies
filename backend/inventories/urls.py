from django.urls import path
from .views import InventoryReportListView, InventoryReportCreateView, InventoryReportDetailsView, InventoryReportRemoveView, InventorySupplyDetailsUpdateView


app_name = "inventories"

urlpatterns = [
    path('', InventoryReportListView.as_view()),
    path('<int:pk>', InventoryReportDetailsView.as_view(), name='report-details'),
    path('create', InventoryReportCreateView.as_view()),
    path('remove/<int:pk>', InventoryReportRemoveView.as_view(), name='report-remove'),
    path('supplies/<int:pk>', InventorySupplyDetailsUpdateView.as_view(), name='supplies-details-update'), 
]
