from django.urls import path, include
from django.conf.urls import url

from .views import UserListView, UserDetailsView

urlpatterns = [
	path('', UserListView.as_view()),
	path('<int:pk>/', UserDetailsView.as_view()),
]