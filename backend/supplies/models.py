from django.db import models


class Supply(models.Model):
    name = models.CharField(max_length=50)
    state = models.TextField()

    def __str__(self):
        return self.name
