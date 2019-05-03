from django.urls import path

from .views import PrintQueueView, PrintQueueDeleteView, CreatePrintable

urlpatterns = [
    path('', CreatePrintable, name='CreatePrintable'),
    path('queue/', PrintQueueView.as_view()),
    path('queue/<int:pk>/', PrintQueueDeleteView.as_view()),
]
