from django.db import models

class Antibiotic(models.Model):
    name = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name

class Box(models.Model):
    name = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name

class OrderSource(models.Model):
    name = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name

class Usage(models.Model):
    name = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name

class Shelf(models.Model):
    name = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name

class Rack(models.Model):
    name =  models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name

class Position(models.Model):
    name = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name

class Plasmid(models.Model):
    name = models.CharField(max_length=100)
    shelf = models.ForeignKey(Shelf, on_delete=models.PROTECT)
    rack = models.ForeignKey(Rack, on_delete=models.PROTECT)
    box = models.ForeignKey(Box, on_delete=models.PROTECT)
    position = models.ForeignKey(Position, on_delete=models.PROTECT)
    label = models.CharField(max_length=100)
    sequence = models.CharField(max_length=100, default='')
    antibiotics_resistance = models.ForeignKey(Antibiotic, on_delete=models.PROTECT)
    usage = models.ForeignKey(Usage, on_delete=models.PROTECT)
    ordered_from = models.ForeignKey(OrderSource, on_delete=models.PROTECT)
    ordered_by = models.CharField(max_length=100)
    limitations = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name
