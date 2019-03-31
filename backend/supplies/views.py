from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Supply
from .serializers import SupplySerializer
from .permissions import IsAuthenticatedReadOnly
from .pagination import SuppliesResultSetPagination


class SupplyListView(generics.ListCreateAPIView):
    """
    Takes parameter "order" to sort supplies.
    If no order is provided sorts by supplies ascending.
    To sort descending add "-" before "order" eg: /api/supplies/?order=-name.
    Parameter only affects on GET.
    """
    permission_classes = (IsAuthenticatedReadOnly | permissions.IsAdminUser,)
    serializer_class = SupplySerializer
    pagination_class = SuppliesResultSetPagination

    def get_queryset(self):
        if 'order' in self.request.query_params:
            order = self.request.query_params.get('order')
        else:
            order = "name"
        return Supply.objects.order_by(order)


class SupplyDetailsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedReadOnly | permissions.IsAdminUser,)
    queryset = Supply.objects.all()
    serializer_class = SupplySerializer


class SearchSupplyView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SupplySerializer
    pagination_class = SuppliesResultSetPagination

    def get(self, request):
        """
        Takes "name" as parameter, where "name" is part of supply's name.
        Returns error if no name is provided.
        """
        if 'name' not in request.query_params:
            return Response('Parameter "name" expected', status=status.HTTP_400_BAD_REQUEST)
        return super().get(request)

    def get_queryset(self):
        name = self.request.query_params.get('name')
        return Supply.objects.filter(name__icontains=name).order_by('name')
