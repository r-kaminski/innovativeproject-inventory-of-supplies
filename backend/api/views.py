from rest_framework import generics, permissions

from .models import Room
from .serializers import RoomSerializer


class RoomList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomCreate(generics.CreateAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
