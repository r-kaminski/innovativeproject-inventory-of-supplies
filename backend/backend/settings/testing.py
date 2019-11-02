from .base import *

# No need to load debug-toolbar module
DEBUG = False

DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'sqlite3.db',
            'TEST_NAME': 'test_sqlite3.db',
            }
        }
