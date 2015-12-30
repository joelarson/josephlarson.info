from django.conf.urls import include, url
from core.views import api

from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'projects', api.ProjectViewSet, 'project')

urlpatterns = [
    url(r'^', include(router.urls)),
]
