from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status
from users.models import User

from .models import Supply
from .views import SupplyListView, SupplyDetailsView


class SupplyTests(TestCase):
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

    def test_creating_supply_admin(self):
        """
        Test creating supply authenticated as admin
        """
        request = self.factory.post(
            '/api/supplies/', {'name': '3d printer', 'state': 'good state', 'description': 'prints 3d objects'})
        force_authenticate(request, user=self.testadmin)
        response = SupplyListView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        try:
            supply = Supply.objects.get(name='3d printer')
            self.assertEqual(supply.name, '3d printer')
            self.assertEqual(supply.state, 'good state')
            self.assertEqual(supply.description, 'prints 3d objects')
        except Supply.DoesNotExist:
            self.fail()

    def test_creating_supply_user(self):
        """
        Test creating supply authenticated as user
        """
        request = self.factory.post(
            '/api/supplies/', {'name': '3d printer 2', 'state': 'good state', 'description': 'prints 3d objects'})
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        try:
            Supply.objects.get(name='3d printer')
            self.fail()
        except Supply.DoesNotExist:
            pass

    def test_creating_supply_unauthenticated(self):
        """
        Test creating supply with no authentication
        """
        request = self.factory.post(
            '/api/supplies/', {'name': '3d printer 2', 'state': 'good state', 'description': 'prints 3d objects'})
        response = SupplyListView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        try:
            Supply.objects.get(name='3d printer')
            self.fail()
        except Supply.DoesNotExist:
            pass

    def test_listing_supplies_admin(self):
        """
        Test listing supplies authenticated as admin
        """
        request = self.factory.get(
            '/api/supplies')
        force_authenticate(request, user=self.testadmin)
        response = SupplyListView.as_view()(request)
        # admin can browse the data
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_listing_supplies_user(self):
        """
        Test listing supplies authenticated as user
        """
        request = self.factory.get(
            '/api/supplies')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView.as_view()(request)
        # normal user can browse the data
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_listing_supplies_unauthenticated(self):
        """
        Test listing supplies with no authentication
        """
        request = self.factory.get('/api/supplies')
        response = SupplyListView.as_view()(request)
        # no permission
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_editing_supplies_admin(self):
        """
        Test editing supply authenticated as admin
        """
        id = self.testsupply.id
        request = self.factory.put(
            '/api/supplies/1/', {'name': '3d printer', 'state': 'broken'})
        force_authenticate(request, user=self.testadmin)
        response = SupplyDetailsView.as_view()(request, pk=id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Supply.objects.get(id=id).state, 'broken')

    def test_editing_supplies_user(self):
        """
        Test editing supply authenticated as user
        """
        id = self.testsupply.id
        oldstate = self.testsupply.state
        request = self.factory.put(
            '/api/supplies/%s/' % id, {'name': '3d printer', 'state': 'aaa'})
        force_authenticate(request, user=self.testuser1)
        response = SupplyDetailsView.as_view()(request, pk=id)
        # normal user should get forbidden error
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        # data should not change
        self.assertEqual(Supply.objects.get(id=id).state, oldstate)

    def test_editing_supplies_unauthenticated(self):
        """
        Test editing supply with no authentication
        """
        id = self.testsupply.id
        oldstate = self.testsupply.state
        request = self.factory.put(
            '/api/supplies/%s/' % id, {'name': '3d printer', 'state': 'bbb'})
        response = SupplyDetailsView.as_view()(request, pk=id)
        # unauthenticated user should get unauthorized error
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        # data should not change
        self.assertEqual(Supply.objects.get(id=id).state, oldstate)
