from django.urls import path
from .views import BackupView

app_name = "inventories"

urlpatterns = [
    path('', BackupView.as_view(), name="Backup"),
]
