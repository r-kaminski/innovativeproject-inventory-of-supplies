from rest_framework import serializers
from .models import PrintQueue
from users.models import User
from supplies.serializers import SupplySerializer

class PrintSerializer(serializers.ModelSerializer):
    supply = SupplySerializer(required=False)
    class Meta:
        fields = ('id','supply')
        model = PrintQueue

class FullPrintSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','user','supply')
        model = PrintQueue
