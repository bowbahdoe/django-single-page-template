from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'antibiotics', views.AntibioticsViewSet)
router.register(r'boxes', views.BoxesViewSet)
router.register(r'order_sources', views.OrderSourcesViewSet)
router.register(r'usages', views.UsagesViewSet)
router.register(r'positions', views.PositionsViewSet)
router.register(r'shelves', views.ShelvesViewSet)
router.register(r'racks', views.RacksViewSet)
router.register(r'plasmids', views.PlasmidsViewSet)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.decorators import authentication_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

@api_view(['GET', 'POST'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
def hello_world(request):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "Hello, world!"})

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^whynot/', hello_world)
]
