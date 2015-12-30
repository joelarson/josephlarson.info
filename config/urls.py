from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
import django.views
from core.urls import web, api


urlpatterns = [
    # web urls
    url(r'^', include(web.urlpatterns)),
    # api urls
    url(r'^api/', include(api.urlpatterns)),
    # static/media
    url(r'^media/(?P<path>.*)$', django.views.static.serve,
        {'document_root': settings.MEDIA_ROOT}),
    # third party
    url(r'^admin/', include(admin.site.urls)),
]
