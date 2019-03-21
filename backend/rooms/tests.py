from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from rest_framework import status
from users.models import User

from .models import Room
from .views import RoomCreateView




class RoomTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.testuser = User.objects.create_user(
            username='testuser1',
            password='testpassword1')

        cls.testadmin = User.objects.create_superuser(
            username='admin1',
            email='admin@admin.com',
            password='testadminpassword1')
        cls.testuser.save()
        cls.testadmin.save()
        cls.factory = APIRequestFactory()

    def test_creating_room(self):
        request = self.factory.post('/api/room/create', {'name': 'room1'})
        force_authenticate(request, user=self.testadmin)
        response = RoomCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        try:
            Room.objects.get(name='room1')
        except:
            self.assertTrue(False)

    def test_creating_room_as_user(self):
        request = self.factory.post('/api/room/create', {'name': 'room2'})
        force_authenticate(request, user=self.testuser)
        response = RoomCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        try:
            Room.objects.get(name='room2')
            self.assertTrue(False)
        except:
            pass
