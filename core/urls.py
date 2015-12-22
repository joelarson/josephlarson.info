from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
import django.views
from . import views

from rest_framework import routers


urlpatterns = [
    # api urls
    url(r'^', include(router.urls)),
    # web urls
    # url(r'^$', views.activity, name='activity'),
    # url(r'^projects/$', views.projects, name='projects'),
    # url(r'^thoughts/$', views.thoughts, name='thoughts'),
    # url(r'^about-me/$', views.about_me, name='about-me'),
    # url(r'^api/', include(api_urlpatterns)),
    # misc urls
    url(r'^media/(?P<path>.*)$', django.views.static.serve,
        {'document_root': settings.MEDIA_ROOT}),
    url(r'^admin/', include(admin.site.urls)),
]


router = routers.DefaultRouter()
router.register(r'projects', views.ProjectViewSet, 'project')
