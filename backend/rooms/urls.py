from django.urls import path

from .views import RoomListView, RoomDetailView, RoomCreateView

urlpatterns = [
    path('<int:pk>/', RoomDetailView.as_view()),
    path('', RoomListView.as_view()),
    path('create', RoomCreateView.as_view()),
]
