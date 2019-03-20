from django.urls import path

from .views import RoomList, RoomDetail, RoomCreate

urlpatterns = [
    path('rooms/<int:pk>/', RoomDetail.as_view()),
    path('rooms', RoomList.as_view()),
    path('rooms/create', RoomCreate.as_view()),
]
