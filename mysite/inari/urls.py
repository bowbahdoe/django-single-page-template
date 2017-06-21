from django.conf.urls import url, include
from rest_framework import routers
from . import views
from rest_framework_swagger.views import get_swagger_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer

router = routers.DefaultRouter()
router.register(r'antibiotics', views.AntibioticsViewSet)
router.register(r'boxes', views.BoxesViewSet)
router.register(r'order_sources', views.OrderSourcesViewSet)
router.register(r'usages', views.UsagesViewSet)
router.register(r'positions', views.PositionsViewSet)
router.register(r'shelves', views.ShelvesViewSet)
router.register(r'racks', views.RacksViewSet)
router.register(r'plasmids', views.PlasmidsViewSet)



schema_view = get_swagger_view(title='InariDB API')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^docs/', schema_view)
]
