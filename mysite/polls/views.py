from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')
    context = {
        'questions': latest_question_list,
    }

    return render(request, 'polls/index.html', context)


def detail(request, question_id):
    res = get_object_or_404(Question.objects, id=question_id)
    return HttpResponse(f"You're looking at question <b>{res.question_text}</b>")


def results(request, question_id):
    response = f"You're looking at the results of question {question_id}."
    return HttpResponse(response)


def vote(request, question_id):
    return HttpResponse(f"You're voting on question {question_id}")
