from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
import django.views

import core.urls


urlpatterns = [
    # third party
    url(r'^admin/', include(admin.site.urls)),
    # app/api urls
    url(r'^', include(core.urls.urlpatterns)),
    # static/media
    url(r'^media/(?P<path>.*)$', django.views.static.serve,
        {'document_root': settings.MEDIA_ROOT}),

]
