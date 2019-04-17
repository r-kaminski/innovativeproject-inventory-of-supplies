from django.urls import path
from QRPrint import views

urlpatterns = [
    path('', views.CreatePrintable, name='CreatePrintable')
]
