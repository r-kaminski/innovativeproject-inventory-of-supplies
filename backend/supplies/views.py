from rest_framework import generics, permissions

from .models import Supply
from .serializers import SupplySerializer
from .permissions import IsAuthenticatedReadOnly


class SupplyListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedReadOnly | permissions.IsAdminUser,)
    queryset = Supply.objects.all()
    serializer_class = SupplySerializer


class SupplyDetailsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedReadOnly | permissions.IsAdminUser,)
    queryset = Supply.objects.all()
    serializer_class = SupplySerializer
