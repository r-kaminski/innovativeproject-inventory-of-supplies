from django.shortcuts import render

from django.shortcuts import render
from rest_framework import permissions, generics


from .models import User
from .serializers import UserSerializer


class UserListView(generics.ListAPIView):
    # Only admin is able to view full list of users
    permission_classes = [
        permissions.IsAuthenticated, permissions.IsAdminUser, ]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailsView(generics.RetrieveAPIView):
    # User can inspect other users' details
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RetrieveCurrentUserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        self.kwargs['pk'] = request.user.id
        return super().get(request, *args, **kwargs)
