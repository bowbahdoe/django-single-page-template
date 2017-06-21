from django.db import models
from django.utils import timezone
import datetime

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def was_published_recently(self):
        now = timezone.now()
        return self.pub_date >= now - datetime.timedelta(days=1) \
            and not (self.pub_date > now)


    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text

class Crime(models.Model):
    severity = models.IntegerField(default=0)
    inf_date = models.DateTimeField('date committed')


class OJ(models.Model):
    crimes =  models.ForeignKey(Crime)