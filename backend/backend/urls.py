"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework_jwt.views import refresh_jwt_token

from authentication.views import NameRegisterView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest-auth/', include('rest_auth.urls')),
    # Doesn't require first and last names:
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'), name="rest_register"),
    # Does require first and last names:
    url(r'^rest-auth/name-registration/', NameRegisterView.as_view(), name="rest_name_register"),
    url(r'^refresh-token/', refresh_jwt_token),

    url(r'^api/users/', include('users.urls')),
    url(r'^api/rooms/', include('rooms.urls')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
