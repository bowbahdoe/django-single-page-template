from rest_framework import viewsets
from . import models
from . import serializers

class AntibioticsViewSet(viewsets.ModelViewSet):
    queryset = models.Antibiotic.objects.all()
    serializer_class = serializers.AntibioticSerializer

class BoxesViewSet(viewsets.ModelViewSet):
    queryset = models.Box.objects.all()
    serializer_class = serializers.BoxSerializer

class OrderSourcesViewSet(viewsets.ModelViewSet):
    queryset = models.OrderSource.objects.all()
    serializer_class = serializers.OrderSourceSerializer

class UsagesViewSet(viewsets.ModelViewSet):
    queryset = models.Usage.objects.all()
    serializer_class = serializers.UsageSerializer

class PositionsViewSet(viewsets.ModelViewSet):
    queryset = models.Position.objects.all()
    serializer_class = serializers.PositionSerializer

class ShelvesViewSet(viewsets.ModelViewSet):
    queryset = models.Shelf.objects.all()
    serializer_class = serializers.ShelfSerializer

class RacksViewSet(viewsets.ModelViewSet):
    queryset = models.Rack.objects.all()
    serializer_class = serializers.RackSerializer

class PlasmidsViewSet(viewsets.ModelViewSet):
    queryset = models.Plasmid.objects.all()
    serializer_class = serializers.PlasmidSerializer
