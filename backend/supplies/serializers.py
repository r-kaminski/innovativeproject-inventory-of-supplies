from rest_framework import serializers
from .models import Supply


class SupplySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'state')
        model = Supply
