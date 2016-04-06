import os

from .base import *  # noqa


SECRET_KEY = 'testing'

DEBUG = True
TEMPLATES[0]['OPTIONS']['debug'] = True

MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'static', 'media')

INSTALLED_APPS += []

MIDDLEWARE_CLASSES += []

WSGI_APPLICATION = 'config.secrets.dev.wsgi.application'

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

CORS_ORIGIN_WHITELIST = [
    '127.0.0.1:4000',
]
