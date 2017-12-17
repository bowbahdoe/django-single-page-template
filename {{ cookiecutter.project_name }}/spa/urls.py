from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^', views.serve_single_page, name='single-page-index')
]
