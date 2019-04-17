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
from django.urls import include
from django.conf.urls import url
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token

from authentication.views import NameRegisterView, LogoutView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest-auth/', include('rest_auth.urls')),
    # Doesn't require first and last names:
    url(r'^rest-auth/registration/',
        include('rest_auth.registration.urls'), name="rest_register"),
    # Does require first and last names:
    url(r'^rest-auth/name-registration/',
        NameRegisterView.as_view(), name="rest_name_register"),
    url(r'^refresh-token/', refresh_jwt_token),
    url(r'^obtain-token/', obtain_jwt_token),
    url(r'^remove-token/', LogoutView.as_view()),

    url(r'^api/users/', include('users.urls', namespace="users")),
    url(r'^api/rooms/', include('rooms.urls', namespace="rooms")),
    url(r'^api/supplies/', include('supplies.urls')),
    url(r'^api/inventories/', include('inventories.urls', namespace="inventories")),
    url(r'^api/printing/', include('printing.urls')),
]

if settings.DEBUG:
    import debug_toolbar
    from rest_framework.documentation import include_docs_urls

    API_TITLE = 'Inventory of supplies API'
    API_DESCRIPTION = 'REST API for inventory of supplies in technology workspace'
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
        url(r'^docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    ] + urlpatterns
