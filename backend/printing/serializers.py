from rest_framework import serializers
from .views import QRCodePrint


class QRPrintSerializer(serializers.ModelSerializer):

    class Meta:
        model = QRCodePrint
        fields = '__all__'
