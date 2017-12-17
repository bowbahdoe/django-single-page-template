from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.conf import settings
from .preload import get_preload_data
import json

@ensure_csrf_cookie # We provide CSRF tokens to the SPA via cookie
def serve_single_page(request):
    '''
    serves the index.html for a single page
    application
    '''
    response_context = {}

    preload_data = get_preload_data(request)
    response_context["preload_data"] = json.dumps(preload_data)

    return render(request, 'spa/index.html', response_context)
