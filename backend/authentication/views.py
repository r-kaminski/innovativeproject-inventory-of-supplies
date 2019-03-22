from .serializers import NameRegisterSerializer
from rest_auth.registration.views import RegisterView


class NameRegisterView(RegisterView):
    serializer_class = NameRegisterSerializer