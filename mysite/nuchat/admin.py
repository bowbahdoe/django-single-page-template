from django.contrib import admin
from .models import Sender, Message
# Register your models here.

admin.site.register(Sender)
admin.site.register(Message)
