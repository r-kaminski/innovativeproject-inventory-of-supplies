from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework import status
from .serializers import PrintSerializer,FullPrintSerializer
from supplies.serializers import SupplySerializer
from .models import PrintQueue



class PrintQueueView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PrintSerializer
    queryset = PrintQueue.objects.all()

    def post(self,request):
        serializer = FullPrintSerializer(data={'user':request.user.pk,'supply':request.data.get('supplyId')})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class PrintQueueDeleteView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PrintSerializer
