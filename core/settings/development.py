import os

from main.settings.base import *


SECRET_KEY = '80^ffqbpia(b4&tyaul@^zmy&^6frt^urd^mg-aud7y6o(s7ve'

DEBUG = True
TEMPLATE_DEBUG = True

# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}

MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'static', 'media')

INSTALLED_APPS += ()

MIDDLEWARE_CLASSES += ()

WSGI_APPLICATION = 'main.wsgi.application'

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

CORS_ORIGIN_WHITELIST = (
    '127.0.0.1:4000',
)
