from django.urls import path

from .views import SupplyListView, SupplyDetailsView, SearchSupplyView, SupplyImageView

urlpatterns = [
    path('', SupplyListView.as_view()),
    path('<int:pk>/', SupplyDetailsView.as_view()),
    path('search', SearchSupplyView.as_view()),
    path('image', SupplyImageView.as_view()),
]
