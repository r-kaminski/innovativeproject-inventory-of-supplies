from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase
from rest_framework import status
from rest_framework.request import Request
from django.urls import reverse

from .models import InventoryReport, InventorySupply
from users.models import User
from supplies.models import Supply
from .views import InventoryReportListCreateView, InventoryReportDetailsView, InventoryReportRemoveView
from .views import InventorySupplyView

class InventoryReportCreateTests(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()
        cls.test_user = User.objects.create_user(
            username='testuser1',
            password='testpassword1')

        cls.test_admin = User.objects.create_superuser(
            username='admin1',
            email='admin@admin.com',
            password='testadminpassword1')

        cls.report_name = "Q2 2019 Report"
        cls.test_supply1 = Supply(name="3D printer", state="Brand new", description="User manual is lost")
        cls.test_supply1.save()
        cls.test_supply2 = Supply(name="Screwdriver", state="Worn out", description="Handle is broken")
        cls.test_supply2.save()

    def test_create_report_admin(self):
        """
        Test correctly creating new report with admin account
        Report name is given as a parameter
        Additional check is performed to see if the report has been automatically populated with supplies
        """

        request = self.factory.post(
            '/api/inventories/', {'name': self.report_name})
        force_authenticate(request, user=self.test_admin)
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        try:
            report = InventoryReport.objects.get(name=self.report_name)
            self.assertEqual(report.name, self.report_name)
            self.assertTrue(len(report.inventory_supplies.all()) > 0)
        except InventoryReport.DoesNotExist:
            self.fail()

    def test_create_invalid_report_admin(self):
        """
        Test incorrectly creating new report with admin account
        Required name parameter is not given
        """
        request = self.factory.post(
            '/api/inventories/', {})
        force_authenticate(request, user=self.test_admin)
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(InventoryReport.objects.all()), 0)

    def test_create_report_user(self):
        """
        Test incorrectly creating new report with user account
        Report name is given as a parameter
        """
        request = self.factory.post(
            '/api/inventories/', {'name': self.report_name})
        force_authenticate(request, user=self.test_user)
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(len(InventoryReport.objects.all()), 0)

    def test_create_invalid_report_user(self):
        """
        Test incorrectly creating new report with user account
        Required name paramater is not given
        Authorization check is performed firstly, therefore 'forbidden' response should be returned
        """
        request = self.factory.post(
            '/api/inventories/', {})
        force_authenticate(request, user=self.test_user)
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(len(InventoryReport.objects.all()), 0)

    def test_create_report_unauthorized(self):
        """
        Test incorrectly creating new report
        Authentication is not performed
        Required name parameter is given
        """
        request = self.factory.post(
            '/api/inventories/', {'name': self.report_name})
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(InventoryReport.objects.all()), 0)

    def test_create_invalid_report_unauthorized(self):
        """
        Test incorrectly creating new report
        Authentication is not performed
        Required name parameter is not given
        Authorization check is performed firstly, therefore 'unauthorized' response should be returned
        """
        request = self.factory.post(
            '/api/inventories/', {})
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(InventoryReport.objects.all()), 0)


class InventoryReportListTests(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()
        cls.test_user = User.objects.create_user(
            username='testuser1',
            password='testpassword1')

        cls.test_admin = User.objects.create_superuser(
            username='admin1',
            email='admin@admin.com',
            password='testadminpassword1')

        cls.report_name = "Q2 2019 Report"
        cls.test_supply1 = Supply(name="3D printer", state="Brand new", description="User manual is lost")
        cls.test_supply1.save()
        cls.test_supply2 = Supply(name="Screwdriver", state="Worn out", description="Handle is broken")
        cls.test_supply2.save()

        
        # Report has to be generated through view to make sure it's populated with supplies
        cls.test_report_name = 'Test report'
        request = cls.factory.post(
            '/api/inventories/', {'name': cls.test_report_name})
        force_authenticate(request, user=cls.test_admin)
        InventoryReportListCreateView.as_view()(request)

    def test_list_reports_admin(self):
        """
        Test correctly listing reports with admin account
        """
        request = self.factory.get(
            '/api/inventories')
        force_authenticate(request, user=self.test_admin)
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_list_reports_user(self):
        """
        Test correctly listing reports with user account
        """
        request = self.factory.get(
            '/api/inventories')
        force_authenticate(request, user=self.test_user)
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_list_reports_unauthorized(self):
        """
        Test incorrectly listing reports unauthorized
        """
        request = self.factory.get(
            '/api/inventories')
        response = InventoryReportListCreateView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class InventoryReportDetailsTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()
        cls.test_user = User.objects.create_user(
            username='testuser1',
            password='testpassword1')

        cls.test_admin = User.objects.create_superuser(
            username='admin1',
            email='admin@admin.com',
            password='testadminpassword1')

        cls.report_name = "Q2 2019 Report"
        cls.test_supply1 = Supply(name="3D printer", state="Brand new", description="User manual is lost")
        cls.test_supply1.save()
        cls.test_supply2 = Supply(name="Screwdriver", state="Worn out", description="Handle is broken")
        cls.test_supply2.save()

        
        # Report has to be generated through view to make sure it's populated with supplies
        cls.test_report_name = 'Test report'
        request = cls.factory.post(
            '/api/inventories/', {'name': cls.test_report_name})
        force_authenticate(request, user=cls.test_admin)
        InventoryReportListCreateView.as_view()(request)
        cls.test_report = InventoryReport.objects.get(name=cls.test_report_name)

    def test_report_details_admin(self):
        """
        Test correctly checking existing report details with admin account
        """
        url = reverse("inventories:report-details", args=[self.test_report.id])
        request = self.factory.get(url)
        force_authenticate(request, user=self.test_admin)
        response = InventoryReportDetailsView.as_view()(request, pk=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        #self.assertEqual(response.data['name'], self.test_report_name)

    def test_report_details_user(self):
        """
        Test correctly checking existing report details with user account
        """
        url = reverse("inventories:report-details", args=[self.test_report.id])
        request = self.factory.get(url)
        force_authenticate(request, user=self.test_user)
        response = InventoryReportDetailsView.as_view()(request, pk=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        #self.assertEqual(response.data['name'], self.test_report_name)

    def test_report_details_unauthorized(self):
        """
        Test incorrectly checking existing report unauthorized
        """
        url = reverse("inventories:report-details", args=[self.test_report.id])
        request = self.factory.get(url)
        response = InventoryReportDetailsView.as_view()(request, pk=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_invalid_report_details(self):
        """
        Test incorrectly checking non-existing report while being authorized
        """
        invalid_test_report_id = 153
        url = reverse("inventories:report-details", args=[invalid_test_report_id])
        request = self.factory.get(url)
        force_authenticate(request, user=self.test_user)
        response = InventoryReportDetailsView.as_view()(request, pk=invalid_test_report_id)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class InventoryReportRemovalTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()
        cls.test_user = User.objects.create_user(
            username='testuser1',
            password='testpassword1')

        cls.test_admin = User.objects.create_superuser(
            username='admin1',
            email='admin@admin.com',
            password='testadminpassword1')

        cls.report_name = "Q2 2019 Report"
        cls.test_supply1 = Supply(name="3D printer", state="Brand new", description="User manual is lost")
        cls.test_supply1.save()
        cls.test_supply2 = Supply(name="Screwdriver", state="Worn out", description="Handle is broken")
        cls.test_supply2.save()

        
        # Report has to be generated through view to make sure it's populated with supplies
        cls.test_report_name = 'Test report'
        request = cls.factory.post(
            '/api/inventories/', {'name': cls.test_report_name})
        force_authenticate(request, user=cls.test_admin)
        InventoryReportListCreateView.as_view()(request)
        cls.test_report = InventoryReport.objects.get(name=cls.test_report_name)

    def test_remove_report_admin(self):
        """
        Test correctly removing existing report with admin account
        """
        url = reverse("inventories:report-remove", args=[self.test_report.id])
        request = self.factory.delete(url)
        force_authenticate(request, user=self.test_admin)
        response = InventoryReportRemoveView.as_view()(request, pk=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(InventoryReport.objects.all()), 0)

    def test_remove_report_user(self):
        """
        Test incorrectly removing existing report with user account (no privileges)
        """
        url = reverse("inventories:report-remove", args=[self.test_report.id])
        request = self.factory.delete(url)
        force_authenticate(request, user=self.test_user)
        response = InventoryReportRemoveView.as_view()(request, pk=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(len(InventoryReport.objects.all()) > 0)

    def test_remove_report_unauthorized(self):
        """
        Test incorrectly removing existing report while unauthorized
        """
        url = reverse("inventories:report-remove", args=[self.test_report.id])
        request = self.factory.delete(url)
        response = InventoryReportRemoveView.as_view()(request, pk=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue(len(InventoryReport.objects.all()) > 0)

    def test_remove_invalid_report_admin(self):
        """
        Test incorrectly removing non-existing report with admin account
        """
        invalid_test_report_id = 153
        url = reverse("inventories:report-remove", args=[invalid_test_report_id])
        request = self.factory.delete(url)
        force_authenticate(request, user=self.test_admin)
        response = InventoryReportRemoveView.as_view()(request, pk=invalid_test_report_id)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(len(InventoryReport.objects.all()) > 0)


class InventorySupplyTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()
        cls.test_user = User.objects.create_user(
            username='testuser1',
            password='testpassword1')

        cls.test_admin = User.objects.create_superuser(
            username='admin1',
            email='admin@admin.com',
            password='testadminpassword1')

        cls.report_name = "Q2 2019 Report"
        cls.test_supply_name = "3D printer"
        cls.test_supply_state = "Brand new"
        cls.test_supply_description = "User manual is lost"
        cls.test_supply = Supply(name=cls.test_supply_name, 
            state=cls.test_supply_state, 
            description=cls.test_supply_description)
        cls.test_supply.save()

        cls.test_report = InventoryReport(name=cls.report_name)
        cls.test_report.save()

        cls.test_inventory_supply = InventorySupply(inventory_supply=cls.test_supply, 
            inventory_report=cls.test_report)
        cls.test_inventory_supply.save()

    def test_supply_details_admin(self):
        """
        Test correctly checking existing inventory supply details with admin account
        """
        url = reverse("inventories:supplies-details-update", args=[self.test_report.id, self.test_supply.id])
        request = self.factory.get(url)
        force_authenticate(request, user=self.test_admin)
        response = InventorySupplyView.as_view()(
            request, inventory_supply_id=self.test_supply.id, inventory_id=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['supply']['name'], self.test_supply_name)

    def test_supply_details_user(self):
        """
        Test correctly checking existing inventory supply details with user account
        """
        url = reverse("inventories:supplies-details-update", args=[self.test_report.id, self.test_supply.id])
        request = self.factory.get(url)
        force_authenticate(request, user=self.test_user)
        response = InventorySupplyView.as_view()(
            request, inventory_supply_id=self.test_supply.id, inventory_id=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['supply']['name'], self.test_supply_name)


    def test_supply_details_unauthorized(self):
        """
        Test correctly checking existing inventory supply details with user account
        """
        url = reverse("inventories:supplies-details-update", args=[self.test_report.id, self.test_supply.id])
        request = self.factory.get(url)
        response = InventorySupplyView.as_view()(
            request, inventory_supply_id=self.test_supply.id, inventory_id=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_invalid_supply_details(self):
        """
        Test incorrectly checking non-existing inventory supply while authorized
        """
        invalid_test_inventory_supply_id = 153
        url = reverse("inventories:supplies-details-update", args=[self.test_report.id, invalid_test_inventory_supply_id])
        request = self.factory.get(url)
        force_authenticate(request, user=self.test_user)
        response = InventorySupplyView.as_view()(
            request, inventory_supply_id=invalid_test_inventory_supply_id, inventory_id=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_supply_admin(self):
        """
        Test correctly setting existing inventory supply's  "is_checked" status to true
        Admin privileges are used
        """
        is_checked = InventorySupply.objects.get(pk=self.test_inventory_supply.id).is_checked
        self.assertFalse(is_checked)
        url = reverse("inventories:supplies-details-update", args=[self.test_report.id, self.test_supply.id])
        request = self.factory.patch(url, {'is_checked': True})
        force_authenticate(request, user=self.test_admin)
        response = InventorySupplyView.as_view()(
            request, inventory_supply_id=self.test_inventory_supply.id, inventory_id=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        is_checked = InventorySupply.objects.get(pk=self.test_inventory_supply.id).is_checked
        self.assertTrue(is_checked)

    def test_update_supply_user(self):
        """
        Test correctly setting existing inventory supply's  "is_checked" status to true
        User privileges are used
        """
        is_checked = InventorySupply.objects.get(pk=self.test_inventory_supply.id).is_checked
        self.assertFalse(is_checked)
        url = reverse("inventories:supplies-details-update", args=[self.test_report.id, self.test_supply.id])
        request = self.factory.patch(url, {'is_checked': True})
        force_authenticate(request, user=self.test_user)
        response = InventorySupplyView.as_view()(
            request, inventory_supply_id=self.test_supply.id, inventory_id=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        is_checked = InventorySupply.objects.get(pk=self.test_inventory_supply.id).is_checked
        self.assertTrue(is_checked)

    def test_update_supply_unauthorized(self):
        """
        Test incorrectly setting existing inventory supply's  "is_checked" status to true
        User in unauthorized
        """
        is_checked = InventorySupply.objects.get(pk=self.test_inventory_supply.id).is_checked
        self.assertFalse(is_checked)
        url = reverse("inventories:supplies-details-update", args=[self.test_report.id, self.test_supply.id])
        request = self.factory.patch(url, {'is_checked': True})
        response = InventorySupplyView.as_view()(
            request, inventory_supply_id=self.test_supply.id, inventory_id=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        is_checked = InventorySupply.objects.get(pk=self.test_inventory_supply.id).is_checked
        self.assertFalse(is_checked)

    def test_update_invalid_supply(self):
        """
        Test incorrectly setting non-existing inventory supply's "is_checked" status to true
        """
        invalid_test_inventory_supply_id = 153
        url = reverse("inventories:supplies-details-update", args=[invalid_test_inventory_supply_id, self.test_supply.id])
        request = self.factory.patch(url, {'is_checked': True})
        force_authenticate(request, user=self.test_user)
        response = InventorySupplyView.as_view()(
            request, inventory_supply_id=invalid_test_inventory_supply_id, inventory_id=self.test_report.id)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
