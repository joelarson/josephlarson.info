from django.conf.urls import include, url
from core.views import web


urlpatterns = [
    url(r'^$', web.activity, name='activity'),
    url(r'^projects/$', web.projects, name='projects'),
    url(r'^thoughts/$', web.thoughts, name='thoughts'),
    url(r'^about-me/$', web.about_me, name='about-me'),
]
