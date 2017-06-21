from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie # We provide CSRF tokens to the SPA via cookie
def serve_single_page(request):
    '''
    serves the index.html for a single page
    application
    '''
    return render(request, 'spa/index.html')
