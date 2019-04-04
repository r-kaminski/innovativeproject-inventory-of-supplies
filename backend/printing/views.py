from pyqrcode import QRCode
import io
from django.http import HttpResponse
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import QRCodePrint
from .serializers import QRPrintSerializer
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

# TODO: Classes and urls.py file


@api_view(["GET"])
def CreatePrintable(request):
    try:
        # A4 page dimensions in pixels @ 300 dpi, QR code will be 248 px x 248 px + 47 px for text
        # ~110 qr codes per page

        codes = Image.new('RGB', (2480, 3508))
        draw = ImageDraw.Draw(codes)
        font = ImageFont.truetype("Consolas Bold.ttf", 40)  # .tff file might be needed, as well as path

        # get items ids
        idList = request.GET.getlist('id')

        finalImage = io.BytesIO()

        # str to int
        for x in idList:
            x = int(x)

        X = Y = itemCount = 0;
        for qrid in idList:
            buffer = io.BytesIO()  # here, otherwise qr codes are the same. Will look for better alternative if needed
            qr = QRCode(qrid)
            qr.png(buffer, scale=6)

            qrcodeimage = Image.open(buffer).resize((248, 248))
            codes.paste(qrcodeimage, (X, Y))  # paste code into image
            draw.text((X, Y + 248), str(qrid), (255, 255, 255), font=font)  # draw text under code

            # calulate new position
            X += 248
            itemCount += 1
            if itemCount % 10 == 0:  # next line
                Y += 293  # originally 295, but the text gets cut off at the last line
                X = 0

        codes.save(finalImage, format="PNG")
        return HttpResponse(finalImage.getvalue(), content_type="image/png")

    except MultiValueDictKeyError as e:
        return Response("", status.HTTP_400_BAD_REQUEST)
