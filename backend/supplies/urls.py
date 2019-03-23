from django.urls import path

from .views import SupplyListView, SupplyDetailsView

urlpatterns = [
    path('', SupplyListView.as_view()),
    path('<int:pk>/', SupplyDetailsView.as_view()),
]
