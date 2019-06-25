from .serializers import NameRegisterSerializer
from rest_auth.registration.views import RegisterView, SocialLoginView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

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


class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = "http://localhost/accounts/github/login/callback/"
    client_class = OAuth2Client
