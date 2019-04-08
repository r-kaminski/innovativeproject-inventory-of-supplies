from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from .serializers import PrintSerializer,FullPrintSerializer
from .models import PrintQueue


class PrintQueueView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PrintSerializer
    pagination_class = PageNumberPagination
    queryset = PrintQueue.objects.all()

    def post(self,request):
        serializer = FullPrintSerializer(data={'userId':request.user.pk,'supplyId':request.data.get('supplyId')})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def get(self,request):
        serializer = self.get_serializer_class()(request.user.printqueue_set.all(),many=True)
        return Response(serializer.data,status=status.HTTP_201_CREATED)


class PrintQueueDeleteView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PrintSerializer
    pagination_class = PageNumberPagination
