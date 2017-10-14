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

urlpatterns = [
    url(r'^api/', include(router.urls))
]
