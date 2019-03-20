from rest_framework import generics, permissions

from .models import Room
from .serializers import RoomSerializer


class RoomListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomCreateView(generics.CreateAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
