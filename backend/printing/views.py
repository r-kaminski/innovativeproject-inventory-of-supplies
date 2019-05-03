from pyqrcode import QRCode
import io
from django.http import HttpResponse
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from PIL import Image, ImageDraw, ImageFont
from .serializers import PrintSerializer, FullPrintSerializer
from supplies.serializers import SupplySerializer
from .models import PrintQueue
from users.models import User


@api_view(["GET"])
def CreatePrintable(request):
    try:
        # A4 page dimensions in pixels @ 300 dpi, QR code will be 248 px x 248 px + 47 px for text
        # 110 qr codes per page

        # get items ids
        idList = request.GET.getlist('id')

        # check if the number of ids is lower or equal to 110, which is max amount of codes per page
        if len(idList) > 110:
            return Response("", status.HTTP_400_BAD_REQUEST)

        codes = Image.new('RGB', (2480, 3508), (255, 255, 255))
        draw = ImageDraw.Draw(codes)

        # using default PIL font until the issue with reading font from file is resolved
        font = ImageFont.load_default()
        finalImage = io.BytesIO()

        # str to int
        for x in idList:
            x = int(x)

        X = Y = itemCount = 0
        for qrid in idList:
            buffer = io.BytesIO()  # here, otherwise qr codes are the same
            qr = QRCode(qrid)
            qr.png(buffer, scale=6)

            qrcodeimage = Image.open(buffer).resize((248, 248))
            codes.paste(qrcodeimage, (X, Y))  # paste code into image
            draw.text((X, Y + 248), str(qrid), (0, 0, 0),
                      font=font)  # draw text under code

            # calculate new position
            X += 248
            itemCount += 1
            if itemCount % 10 == 0:  # next line
                Y += 293  # originally 295, but the text gets cut off at the last line
                X = 0

        codes.save(finalImage, format="PNG")
        return HttpResponse(finalImage.getvalue(), content_type="image/png")

    except MultiValueDictKeyError:
        return Response("id parameter was not provided", status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response("Wrong id: {}".format(str(e)), status.HTTP_400_BAD_REQUEST)


class PrintQueueView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PrintSerializer
    queryset = PrintQueue.objects.all()

    def get_queryset(self):
        """
        Filters queryset so only elements in current user's queue are returned
        """
        user_id = self.request.user.id
        qs = super().get_queryset().filter(user__id=user_id)
        return qs

    def post(self, request):
        serializer = FullPrintSerializer(
            data={'user': request.user.pk, 'supply': request.data.get('supplyId')})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
        Clear queue
        """
        user = request.user.pk
        qs = self.get_queryset()
        count = len(qs)
        qs.delete()
        return Response("Removed %d elements from printing queue" % count, status=status.HTTP_200_OK)


class PrintQueueDeleteView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PrintSerializer
    queryset = PrintQueue.objects.all()
