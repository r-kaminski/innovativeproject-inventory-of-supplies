from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth.models import User

from .models import Room
from .views import RoomCreate


class RoomTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.testuser1 = User.objects.create_user(
            username='testuser1',
            password='testpassword1'
        )
        cls.testadmin = User.objects.create_superuser(
            username='admin1',
            email='admin@admin.com',
            password='testadminpassword1')
        cls.testuser1.save()
        cls.testadmin.save()

    def test_creating_room(self):
        roomListView = RoomCreate.as_view()
        factory = APIRequestFactory()
        request = factory.post('/api/room/create', {'name': 'room1'})
        force_authenticate(request, user=self.testadmin)
        response = roomListView(request)

        self.assertEqual(response.status_code, 201)
        try:
            Room.objects.get(name='room1')
        except:
            self.assertTrue(False)

    def test_creating_room_as_user(self):
        roomListView = RoomCreate.as_view()
        factory = APIRequestFactory()
        request = factory.post('/api/room/create', {'name': 'room2'})
        force_authenticate(request, user=self.testuser1)
        response = roomListView(request)

        self.assertEqual(response.status_code, 403)
        try:
            Room.objects.get(name='room2')
            self.assertTrue(False)
        except:
            pass
