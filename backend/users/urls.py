from django.urls import path, include
from django.conf.urls import url

from .views import UserListView, UserDetailsView, RetrieveCurrentUserView

app_name = "users"

urlpatterns = [
    path('', UserListView.as_view(), name="user-list"),
    path('<pk>/', UserDetailsView.as_view(), name="user-details"),
    path('whoami', RetrieveCurrentUserView.as_view(),
         name="current-user-details"),
]
