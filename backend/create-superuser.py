from django.conf import settings
from users.models import User

if settings.DEBUG:
    try: 
        User.objects.get(username='admin')
        print("Default admin account already created. Skipping creation command.")
    except User.DoesNotExist:
        print("No default admin account present. Creating...")
        User.objects.create_superuser(username='admin', password='admin', email='')
        