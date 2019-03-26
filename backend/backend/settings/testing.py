from .base import *

DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'sqlite3.db',
            'TEST_NAME': 'test_sqlite3.db',
            }
        }
