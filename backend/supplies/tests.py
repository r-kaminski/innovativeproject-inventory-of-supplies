from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth.models import User

from .models import Supply
from .views import SupplyListView, SupplyDetailsView


class RoomTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.testuser1 = User.objects.create_user(
            username='testuser1',
            password='testpassword1')

        cls.testadmin = User.objects.create_superuser(
            username='admin1',
            email='admin@admin.com',
            password='testadminpassword1')
        cls.testuser1.save()
        cls.testadmin.save()
        cls.factory = APIRequestFactory()
        cls.testsupply = Supply(name='test supply', state='abc')
        cls.testsupply.save()

    def test_creating_supply(self):
        request = self.factory.post(
            '/api/supplies/', {'name': '3d printer', 'state': 'good state'})
        force_authenticate(request, user=self.testadmin)
        response = SupplyListView.as_view()(request)

        self.assertEqual(response.status_code, 201)
        try:
            Supply.objects.get(name='3d printer')
        except:
            self.fail()

        request = self.factory.post(
            '/api/supplies/', {'name': '3d printer 2', 'state': 'good state'})
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView.as_view()(request)

        self.assertEqual(response.status_code, 403)
        try:
            Supply.objects.get(name='3d printer')
            self.fail()
        except:
            pass

    def test_listing_supplies(self):
        request = self.factory.get(
            '/api/supplies')
        force_authenticate(request, user=self.testadmin)
        response = SupplyListView.as_view()(request)
        # admin can browse the data
        self.assertEqual(response.status_code, 200)

        request = self.factory.get(
            '/api/supplies')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView.as_view()(request)
        # normal user can browse the data
        self.assertEqual(response.status_code, 200)

        request = self.factory.get(
            '/api/supplies')
        response = SupplyListView.as_view()(request)
        # no permission
        self.assertEqual(response.status_code, 403)

    def test_editing_supplies(self):
        id = self.testsupply.id
        print('/api/supplies/{}/'.format(id))
        request = self.factory.put(
            '/api/supplies/1/', {'name': '3d printer', 'state': 'broken'})
        force_authenticate(request, user=self.testadmin)
        response = SupplyDetailsView.as_view()(request, pk=id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Supply.objects.get(id=id).state, 'broken')

        request = self.factory.put(
            '/api/supplies/%s/' % id, {'name': '3d printer', 'state': 'aaa'})
        force_authenticate(request, user=self.testuser1)
        response = SupplyDetailsView.as_view()(request, pk=id)
        # non admin user should get no permission error
        self.assertEqual(response.status_code, 403)
        # data should not change
        self.assertEqual(Supply.objects.get(id=id).state, 'broken')

        request = self.factory.put(
            '/api/supplies/%s/' % id, {'name': '3d printer', 'state': 'bbb'})
        response = SupplyDetailsView.as_view()(request, pk=id)
        # unauthenticated user should get no permission error
        self.assertEqual(response.status_code, 403)
        # data should not change
        self.assertEqual(Supply.objects.get(id=id).state, 'broken')
