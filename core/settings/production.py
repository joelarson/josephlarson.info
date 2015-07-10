import os

from main.settings.base import *


# SECURITY WARNING: keep the secret key used in production secret!
try:
    SECRET_KEY = os.environ['DJANGO_SETTINGS_SECRET_KEY']
except KeyError:
    print("Please create env variable DJANGO_SETTINGS_SECRET_KEY")

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': os.environ['DB_HOST'],
        'PORT': os.environ['DB_PORT'],
    }
}

MEDIA_ROOT = os.path.join(os.environ['DATA_DIR'], 'media')

INSTALLED_APPS += ()

MIDDLEWARE_CLASSES += ()

DEFAULT_FILE_STORAGE = 'django_s3_storage.storage.S3Storage'

# The region to connect to when storing files.
AWS_REGION = os.environ['AWS_REGION']

# The AWS access key used to access the storage buckets.
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']

# The AWS secret access key used to access the storage buckets.
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']

# The S3 bucket used to store uploaded files.
AWS_S3_BUCKET_NAME = os.environ['AWS_S3_BUCKET_NAME']