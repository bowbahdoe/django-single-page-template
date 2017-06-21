import datetime
from django.utils import timezone
from django.test import TestCase
from .models import Question


class TestQuestions(TestCase):
    def test_future_questions(self):
        future_date = timezone.now() + datetime.timedelta(days=30)
        present_date = timezone.now()
        future_q = Question(pub_date=future_date, question_text="pub. in fut.")
        future_q.save()
        present_q = Question(pub_date=present_date, question_text="pub in pres.")
        present_q.save()
        self.assertFalse(future_q.was_published_recently())
        self.assertTrue(present_q.was_published_recently())
        self.assertTrue(len(Question.objects.all()) == 2)
