from django.db import models


class Sender(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Message(models.Model):
    text = models.CharField(max_length=2 ** 12)
    sender = models.ForeignKey(Sender, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.sender}: {self.text}"
