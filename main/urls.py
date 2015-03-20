from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

from rest_framework import routers

from main.views import api

api_router = routers.DefaultRouter()
api_router.register(r'project', api.ProjectViewSet)

urlpatterns = patterns('',
    url(r'^api/', include(api_router.urls)),
    url(r'^projects/$', 'main.views.web.projects', name='projects'),
    url(r'^$', 'main.views.web.activity', name='activity'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$',
        'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)
