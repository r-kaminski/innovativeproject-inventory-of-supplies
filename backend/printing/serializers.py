from rest_framework import serializers
from .models import PrintQueue
from users.models import User


class PrintSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','supplyId',)
        model = PrintQueue

class FullPrintSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','userId','supplyId',)
        model = PrintQueue

    