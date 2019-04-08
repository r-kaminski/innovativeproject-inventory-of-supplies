from django.db import models
from users.models import User
from supplies.models import Supply

class PrintQueue(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    supplyId = models.ForeignKey(Supply, on_delete=models.CASCADE)