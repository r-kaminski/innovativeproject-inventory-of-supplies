from rest_framework import serializers
from .models import QRCodePrint


class QRPrintSerializer(serializers.ModelSerializer):

    class Meta:
        model = QRCodePrint
        fields = '__all__'
