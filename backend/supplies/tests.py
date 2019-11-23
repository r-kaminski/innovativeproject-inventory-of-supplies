from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase
from rest_framework import status
from rest_framework.request import Request
from django.http import HttpRequest
from users.models import User

from .models import Supply
from .views import SupplyListView, SupplyDetailsView, SearchSupplyView


class CRUDSupplyTests(APITestCase):
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
        Supply(name="testSupply2").save()
        Supply(name="testSupply3").save()
        Supply(name="testSupply4").save()
        Supply(name="testSupply5").save()

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
            '/api/supplies/', {'name': '3d printer', 'state': 'good state', 'description': 'prints 3d objects'})
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        try:
            supply = Supply.objects.get(name='3d printer')
        except Supply.DoesNotExist:
            self.fail()
            

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
            '/api/supplies/%s/' % id, {'name': '3d printer', 'state': 'broken'})
        force_authenticate(request, user=self.testuser1)
        response = SupplyDetailsView.as_view()(request, pk=id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Supply.objects.get(id=id).state, 'broken')

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

    def test_ordering_by_name_asc(self):
        request = self.factory.get(
            '/api/supplies/?order=name')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView().as_view()(request)
        self.assertEqual(
            response.data['results'][0]['name'], "test supply")
        self.assertEqual(
            response.data['results'][1]['name'], "testSupply{}".format(2))
        self.assertEqual(
            response.data['results'][2]['name'], "testSupply{}".format(3))
        self.assertEqual(
            response.data['results'][3]['name'], "testSupply{}".format(4))
        self.assertEqual(
            response.data['results'][4]['name'], "testSupply{}".format(5))

    def test_ordering_by_name_desc(self):
        request = self.factory.get(
            '/api/supplies/?order=-name')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView().as_view()(request)
        self.assertEqual(
            response.data['results'][0]['name'], "testSupply{}".format(5))
        self.assertEqual(
            response.data['results'][1]['name'], "testSupply{}".format(4))
        self.assertEqual(
            response.data['results'][2]['name'], "testSupply{}".format(3))
        self.assertEqual(
            response.data['results'][3]['name'], "testSupply{}".format(2))
        self.assertEqual(
            response.data['results'][4]['name'], "test supply")

    def test_ordering_by_id_asc(self):
        request = self.factory.get(
            '/api/supplies/?order=id')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView().as_view()(request)
        for i in range(1, 5):
            self.assertTrue(
                response.data['results'][i]['id']-response.data['results'][i-1]['id'] > 0)

    def test_ordering_by_id_desc(self):
        request = self.factory.get(
            '/api/supplies/?order=-id')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView().as_view()(request)
        for i in range(1, 5):
            self.assertTrue(
                response.data['results'][i]['id']-response.data['results'][i-1]['id'] < 0)

    def test_default_page(self):
        request = self.factory.get(
            '/api/supplies/?order=name&page_size=2')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView().as_view()(request)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['name'], 'test supply')
        self.assertEqual(response.data['results'][1]['name'], 'testSupply2')

    def test_page_in_parameter(self):
        request = self.factory.get(
            '/api/supplies/?order=name&page_size=2&page=2')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView().as_view()(request)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['name'], 'testSupply3')
        self.assertEqual(response.data['results'][1]['name'], 'testSupply4')

    def test_unfull_page(self):
        request = self.factory.get(
            '/api/supplies/?order=name&page_size=2&page=3')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView().as_view()(request)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'testSupply5')

    def test_wrong_page(self):
        request = self.factory.get(
            '/api/supplies/?order=name&page_size=2&page=4')
        force_authenticate(request, user=self.testuser1)
        response = SupplyListView().as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class SearchSupplyTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.testuser1 = User.objects.create_user(
            username='testuser1',
            password='testpassword1')
        Supply(name="testSupply1").save()
        Supply(name="testSupply2").save()
        Supply(name="testSupply3").save()
        Supply(name="testSupply4").save()
        Supply(name="testSupply5").save()
        cls.factory = APIRequestFactory()

    def test_searching_single_result(self):
        request = self.factory.get('/api/supplies/search/?name=y1')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        self.assertEqual(len(response.data['results']), 1)

    def test_searching_multiple_results(self):
        request = self.factory.get('/api/supplies/search/?name=test')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        self.assertEqual(len(response.data['results']), 5)

    def test_searching_no_results(self):
        request = self.factory.get('/api/supplies/search/?name=tet')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        self.assertEqual(len(response.data['results']), 0)

    def test_ordering_by_name_asc(self):
        request = self.factory.get(
            '/api/supplies/search/?name=test&order=name')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        for i in range(5):
            self.assertEqual(
                response.data['results'][i]['name'], "testSupply{}".format(i+1))

    def test_ordering_by_name_desc(self):
        request = self.factory.get(
            '/api/supplies/search/?name=test&order=-name')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        for i in range(5):
            self.assertEqual(
                response.data['results'][i]['name'], "testSupply{}".format(5-i))

    def test_ordering_by_id_asc(self):
        request = self.factory.get(
            '/api/supplies/search/?name=test&order=id')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        for i in range(1, 5):
            self.assertTrue(
                response.data['results'][i]['id']-response.data['results'][i-1]['id'] > 0)

    def test_ordering_by_id_desc(self):
        request = self.factory.get(
            '/api/supplies/search/?name=test&order=-id')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        for i in range(1, 5):
            self.assertTrue(
                response.data['results'][i]['id']-response.data['results'][i-1]['id'] < 0)

    def test_default_page(self):
        request = self.factory.get(
            '/api/supplies/search/?name=test&order=name&page_size=2')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['name'], 'testSupply1')
        self.assertEqual(response.data['results'][1]['name'], 'testSupply2')

    def test_page_in_parameter(self):
        request = self.factory.get(
            '/api/supplies/search/?name=test&order=name&page_size=2&page=2')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['name'], 'testSupply3')
        self.assertEqual(response.data['results'][1]['name'], 'testSupply4')

    def test_unfull_page(self):
        request = self.factory.get(
            '/api/supplies/search/?name=test&order=name&page_size=2&page=3')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'testSupply5')

    def test_wrong_page(self):
        request = self.factory.get(
            '/api/supplies/search/?name=test&order=name&page_size=2&page=4')
        force_authenticate(request, user=self.testuser1)
        response = SearchSupplyView().as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_without_authentication(self):
        request = self.factory.get('/api/supplies/search/?name=test')
        response = SearchSupplyView().as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
