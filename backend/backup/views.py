from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.core import management
import io
import logging
import re
import datetime
from .serializers import BackupsSerializer


class BackupView(generics.GenericAPIView):
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = BackupsSerializer
    queryset = []

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.capture_log = io.StringIO()
        ch = logging.StreamHandler(self.capture_log)
        ch.setLevel(logging.DEBUG)
        logger = logging.getLogger('dbbackup')
        logger.addHandler(ch)

    def post(self, request, *args, **kwargs):
        management.call_command('dbbackup')
        txt = self.capture_log.getvalue()
        return Response(txt)

    def get(self, request, *args, **kwargs):
        f = io.StringIO()
        management.call_command('listbackups', quiet=True, stdout=f)
        txt = f.getvalue()
        f.close()

        lines = txt.splitlines()
        data = map(
            lambda x: re.match(
                r'(.*\.psql) *(\d\d/\d\d/\d\d \d\d:\d\d:\d\d)', x).groups(), lines
        )

        data = map(
            lambda x: {'name': x[0], 'date': datetime.datetime.strptime(
                x[1], '%m/%d/%y %H:%M:%S')}, data
        )

        data = sorted(data, key=lambda x: x['date'], reverse=True)
        serializer = BackupsSerializer(data, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        if 'name' not in request.data:
            return Response('you must specify \'name\' in url', status=status.HTTP_400_BAD_REQUEST)
        try:
            management.call_command(
                'dbrestore', '--noinput', input_filename=request.data.get('name'))
            txt = self.capture_log.getvalue()
            return Response(txt)
        except:
            return Response('Error while restoring backup', status=status.HTTP_400_BAD_REQUEST)
