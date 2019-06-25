from django.shortcuts import render
from django.utils import timezone
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.renderers import JSONRenderer

from supplies.models import Supply
from .models import InventoryReport, InventorySupply
from .serializers import InventoryReportSerializer, InventorySupplySerializer, InventorySupplyHeaderSerializer, InventoryReportLastUpdateSerializer
from backend.pagination import ResultSetPagination
from backend.permissions import IsAuthenticatedReadOnly
from .renderers import ReportCSVRenderer, ReportPdfRenderer
from .validators import ParameterException, validate_input_data, validate_order
from rest_framework_csv import renderers as r
from users.models import User

from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser, MultiPartParser
import csv
import io


class InventoryReportListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedReadOnly | permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer
    pagination_class = ResultSetPagination


class InventoryReportDetailsView(generics.ListAPIView):
    """
    Lists ONLY all supplies of a report.
    Also supports pagination, example: /api/inventories/3?page=1&page_size=10
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = InventorySupplyHeaderSerializer
    pagination_class = ResultSetPagination

    def get(self, request, *args, **kwargs):
        if 'pk' not in kwargs:
            return Response('Parameter "id" expected', status=status.HTTP_400_BAD_REQUEST)
        try:
            InventoryReport.objects.get(pk=kwargs.get('pk'))
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)

        if 'order' in request.query_params:
            order = request.query_params['order']
            if not validate_order(order):
                return Response('Wrong order: {}'.format(order), status=status.HTTP_400_BAD_REQUEST)
        return super().get(request, args, kwargs)

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if 'order' in self.request.query_params:
            order = self.request.query_params.get('order')
        else:
            order = "id"
        return InventorySupply.objects.filter(inventory_report__pk=pk).order_by(order)


class InventoryReportRemoveView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer


class InventoryReportLastUpdateView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportLastUpdateSerializer


class InventorySupplyView(generics.RetrieveUpdateAPIView):
    serializer_class = InventorySupplySerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = 'inventory_supply_id'

    def update_timestamp(self, kwargs):
        inventory_id = kwargs['inventory_id']
        report = InventoryReport.objects.get(pk=inventory_id)
        report.last_update = timezone.now()
        report.save()

    def get(self, request, *args, **kwargs):
        try:
            validate_input_data(kwargs)
            return super().get(request, args, kwargs)
        except ParameterException as pe:
            return Response(pe.args[0], status=status.HTTP_400_BAD_REQUEST)
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)
        except InventorySupply.DoesNotExist:
            return Response('Supply does not exist', status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        try:
            validate_input_data(kwargs)
            supply = Supply.objects.get(pk=self.kwargs.get('inventory_supply_id'))
            supply.last_time_scanned = timezone.now().date()
            supply.save()
            self.update_timestamp(kwargs)
            # make sure data is mutable
            request._full_data = request.data.copy()
            if request.data['is_checked']:
                request.data['checked_by'] = request.user.id
            else:
                request.data['checked_by'] = None
            return super().patch(request, args, kwargs)
        except ParameterException as pe:
            return Response(pe.args[0], status=status.HTTP_400_BAD_REQUEST)
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)
        except InventorySupply.DoesNotExist:
            return Response('Supply does not exist', status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        try:
            validate_input_data(kwargs)
            supply = Supply.objects.get(pk=self.kwargs.get('inventory_supply_id'))
            supply.last_time_scanned = timezone.now().date()
            supply.save()
            self.update_timestamp(kwargs)
            # make sure data is mutable
            request._full_data = request.data.copy()
            if request.data['is_checked']:
                request.data['checked_by'] = request.user.id
            else:
                request.data['checked_by'] = None
            return super().put(request, args, kwargs)
        except ParameterException as pe:
            return Response(pe.args[0], status=status.HTTP_400_BAD_REQUEST)
        except InventoryReport.DoesNotExist:
            return Response('Report does not exist', status=status.HTTP_404_NOT_FOUND)
        except InventorySupply.DoesNotExist:
            return Response('Supply does not exist', status=status.HTTP_404_NOT_FOUND)

    def get_queryset(self):
        return InventorySupply.objects.filter(inventory_report_id=self.kwargs.get('inventory_id'))


class InventoryReportCSV(generics.RetrieveAPIView):
    renderer_classes = (ReportCSVRenderer, )
    permission_classes = (permissions.IsAuthenticated,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer

    def get(self, request, *args, **kwargs):
        try:
            report = InventoryReport.objects.get(pk=self.kwargs.get('pk'))
            serializer = self.serializer_class(report)
            # Content has to be the same as header in renderers.py
            content = [{'ID': report.id,
                        'Date': report.date,
                        'Name': report.name,
                        'Supplies total': serializer.data['supplies_total'],
                        'Supplies scanned': serializer.data['supplies_checked_out']
                        }]

            for supply in report.inventory_supplies.all():
                # First write checked supplies, then not checked
                if supply.is_checked and supply.inventory_supply:
                    content.append({'Supply ID': supply.inventory_supply.id,
                                    'Supply name': supply.inventory_supply.name,
                                    'Found': '1',
                                    'Checked by': supply.checked_by.username if isinstance(supply.checked_by, User) else "Unknown user" })
                if not supply.is_checked and supply.inventory_supply:
                    content.append({'Supply ID': supply.inventory_supply.id,
                                    'Supply name': supply.inventory_supply.name,
                                    'Found': '0'})

            return Response(content)
        except InventoryReport.DoesNotExist:
            # Cannot fall back to JSON Renderer to send 404 response, instead return empty CSV
            return Response('')


class InventoryReportPDF(generics.RetrieveAPIView):
    renderer_classes = (ReportPdfRenderer, )
    permission_classes = (permissions.IsAuthenticated,)
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer

    def get(self, request, *args, **kwargs):
        try:
            report = self.get_queryset().get(pk=self.kwargs.get('pk'))
            serializer = self.serializer_class(report)
            data = {
                'id': report.id,
                'name': report.name,
                'date': report.date,
                'Supplies total': serializer.data['supplies_total'],
                'Supplies scanned': serializer.data['supplies_checked_out'],
                'data': report.inventory_supplies.order_by('-is_checked', 'checked_by', 'inventory_supply__id')
            }
            return Response(data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class InventoryReportImportView(APIView):
    parser_classes = (MultiPartParser, )
    permission_classes = (permissions.IsAdminUser,)

    def post(self, request, format=None):
        csv_file = request.data['file']

        if not csv_file.name.endswith('.csv'):
            return Response('Wrong format. Input CSV file.', status=status.HTTP_400_BAD_REQUEST)

        decoded_file = csv_file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        file_data = list(csv.reader(io_string))
        
        header = ReportCSVRenderer().header

        if file_data[0] != header:
            return Response('Wrong CSV header formatting.', status=status.HTTP_400_BAD_REQUEST)

        name_index = header.index('Supply name')

        for data in file_data[2:]:
            name = data[name_index]
            Supply.objects.create(name=name).save()

        return Response(status=status.HTTP_201_CREATED)



