from .base import *

ALLOWED_HOSTS = ['*']

ACCOUNT_EMAIL_VERIFICATION = 'none'
STATIC_URL = '/backend_static/'

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

INTERNAL_IPS = [
    '127.0.0.1',
    'localhost',
]
