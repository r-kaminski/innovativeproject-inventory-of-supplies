from django.db import models
from users.models import User
from supplies.models import Supply

class PrintQueue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    supply = models.ForeignKey(Supply, on_delete=models.CASCADE)