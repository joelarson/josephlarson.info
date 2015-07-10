from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
import django.views

from api.urls import urlpatterns as api_urlpatterns
# from core import views

urlpatterns = [
    # url(r'^$', views.activity, name='activity'),
    # url(r'^projects/$', views.projects, name='projects'),
    # url(r'^thoughts/$', views.thoughts, name='thoughts'),
    # url(r'^about-me/$', views.about_me, name='about-me'),
    # url(r'^api/', include(api_urlpatterns)),
    url(r'^', include(api_urlpatterns)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$',
        django.views.static.serve, {'document_root': settings.MEDIA_ROOT}),
]
