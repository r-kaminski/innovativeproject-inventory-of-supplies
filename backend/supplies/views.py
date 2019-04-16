from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Supply
from .serializers import SupplySerializer
from .permissions import IsAuthenticatedReadOnly
from backend.pagination import ResultSetPagination


class SupplyListView(generics.ListCreateAPIView):
    """
    Parameters only affect on GET.
    Optional parameters:
        - order : ordler of data like in /api/supplies/
          If no order is provided sorts by supplies ascending.
          To sort descending add "-" before "order" eg: /api/supplies/?order=-name.
        - page: page to display
        - max_page: size of page
    """
    permission_classes = (IsAuthenticatedReadOnly | permissions.IsAdminUser,)
    serializer_class = SupplySerializer
    pagination_class = ResultSetPagination

    def get(self, request):
        if 'order' in request.query_params:
            order = request.query_params['order']
            if not validateOrder(order):
                return Response('Wrong order: {}'.format(order), status=status.HTTP_400_BAD_REQUEST)
        return super().get(request)

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
    pagination_class = ResultSetPagination

    def get(self, request):
        """
        Takes "name" as parameter, where "name" is part of supply's name.
        Returns error if no name is provided.

        Optional parameters:
        - order : ordler of data like in /api/supplies/
        - page: page to display
        - max_page: size of page
        """
        if 'name' not in request.query_params:
            return Response('Parameter "name" expected', status=status.HTTP_400_BAD_REQUEST)
        # if order is not Supply field return bad request status
        if 'order' in request.query_params:
            order = request.query_params['order']
            if not validateOrder(order):
                return Response('Wrong order: {}'.format(order), status=status.HTTP_400_BAD_REQUEST)
        return super().get(request)

    def get_queryset(self):
        if 'order' in self.request.query_params:
            order = self.request.query_params.get('order')
        else:
            order = "name"
        name = self.request.query_params.get('name')
        return Supply.objects.filter(name__icontains=name).order_by(order)


def validateOrder(order):
    if order[0] == '-' and len(order) > 1:
        order = order[1:]
    if order not in SupplySerializer.Meta.fields:
        return False
    return True
