from django.urls import path, include
from django.conf.urls import url

from .views import UserListView, UserDetailsView

app_name = "users"

urlpatterns = [
	path('', UserListView.as_view(), name="user-list"),
	path('<pk>/', UserDetailsView.as_view(), name="user-details"),
]