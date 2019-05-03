from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from users.models import User
from django.urls import reverse
from rest_framework import status

from .models import User
from .views import UserListView, UserDetailsView


class UserTests(APITestCase):

    @classmethod
    def setUp(cls):
        cls.testuser = User.objects.create_user(
            username='testuser',
            password='testpassword')

        cls.testadmin = User.objects.create_superuser(
            username='admin',
            email='admin@admin.com',
            password='testadminpassword')

        cls.testuser.save()
        cls.testadmin.save()
        cls.factory = APIRequestFactory()

    def test_user_details(self):
        """
        Test user details view.
        Existing user credentials are used to authenticate the request.
        """
        url = reverse("users:user-details", args=[self.testuser.pk])
        request = self.factory.get(url)
        force_authenticate(request, user=self.testuser)
        response = UserDetailsView.as_view()(request, pk=self.testuser.pk)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_details_unauthenticated(self):
        """
        Test user details view.
        No authentication is performed.
        """
        url = reverse("users:user-details", args=[self.testuser.pk])
        request = self.factory.get(url)
        response = UserDetailsView.as_view()(request, pk=self.testuser.pk)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_list_as_superuser(self):
        """
        Test users list view.
        Existing superuser credentials are used to authenticate the request.
        """
        request = self.factory.get('/api/users/')
        force_authenticate(request, user=self.testadmin)
        response = UserListView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_list_as_user(self):
        """
        Test user list view.
        Existing user credentials are used, but they should be insufficient.
        """
        request = self.factory.get('/api/users/')
        force_authenticate(request, user=self.testuser)
        response = UserListView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_list_unauthenticated(self):
        """
        Test user list view.
        No authentication is performed.
        """
        request = self.factory.get('/api/users/')
        response = UserListView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_current_user_authenticated(self):
        """
        Test getting current user data.
        Authentication is provided
        """
        request = self.factory.get('/api/users/whoami')
        force_authenticate(request, user=self.testuser)
        response = UserDetailsView.as_view()(request, pk=self.testuser.pk)

        # compare if response matches with user data
        for key, value in response.data.items():
            self.assertEqual(value, vars(request.user)[key])

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_current_user_unauthenticated(self):
        """
        Test getting current user data.
        Authentication is not provided
        """
        request = self.factory.get('/api/users/current')
        response = UserDetailsView.as_view()(request, pk=None)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
