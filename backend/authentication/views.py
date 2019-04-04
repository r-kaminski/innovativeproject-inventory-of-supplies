from .serializers import NameRegisterSerializer
from rest_auth.registration.views import RegisterView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class NameRegisterView(RegisterView):
    serializer_class = NameRegisterSerializer


class LogoutView(APIView):
    """
    Use to logout useing jwt auth.
    Removes JWT_TOKEN from cookies
    """

    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        response = Response("Logged out successfully")
        response.delete_cookie('JWT_TOKEN')
        return response
