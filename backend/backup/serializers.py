from rest_framework import serializers


class BackupsSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    date = serializers.DateTimeField()
