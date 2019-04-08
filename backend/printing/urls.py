from django.urls import path

from .views import PrintQueueView, PrintQueueDeleteView

urlpatterns = [
    path('', PrintQueueView.as_view()),
    path('<int:pk>/', PrintQueueDeleteView.as_view()),
]
