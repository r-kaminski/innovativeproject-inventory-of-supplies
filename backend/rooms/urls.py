from django.urls import path

from .views import RoomListView, RoomDetailView, RoomCreateView

app_name = "rooms"

urlpatterns = [
    path('<int:pk>/', RoomDetailView.as_view(), name="room-details"),
    path('', RoomListView.as_view(), name="room-list"),
    path('create', RoomCreateView.as_view(), name="room-create"),
]
