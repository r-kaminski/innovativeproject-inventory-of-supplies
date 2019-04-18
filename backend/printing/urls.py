from django.urls import path
from .views import CreatePrintable

urlpatterns = [
    path('', CreatePrintable, name='CreatePrintable')
]
