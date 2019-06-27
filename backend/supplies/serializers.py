from rest_framework import serializers
from .models import Supply


class SupplySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'state', 'description', 'to_be_scanned', 'last_time_scanned', 'deleted', 'quantity', 'repletion')
        model = Supply
        extra_kwargs = {
            'state': {'required': False, 'allow_blank': True},
            'description': {'required': False, 'allow_blank': True},
        }


class SupplyHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'description', 'quantity', 'repletion')
        model = Supply
