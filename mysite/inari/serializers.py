from rest_framework import serializers
from . import models

class AntibioticSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Antibiotic
        fields = '__all__'

class BoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Box
        fields = '__all__'

class OrderSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderSource
        fields = '__all__'

class UsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Usage
        fields = '__all__'

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Position
        fields = '__all__'

class ShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Shelf
        fields = '__all__'

class RackSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rack
        fields = '__all__'

class PlasmidSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Plasmid
        fields = '__all__'
