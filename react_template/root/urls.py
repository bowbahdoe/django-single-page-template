"""mysite URL Configuration"""

from django.conf.urls import include, url
from django.conf import settings
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer

schema_view = get_swagger_view(title='API Documentation')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^app/', include('spa.urls')),
    url(r'^rest/', include('rest_app.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^docs/', schema_view, name='swagger-documentation')
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
