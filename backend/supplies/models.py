from django.db import models

class Supply(models.Model):
    name = models.CharField(max_length=50)
    state = models.TextField(default="")
    description = models.TextField(default="")
    to_be_scanned = models.BooleanField(default=True)
    last_time_scanned = models.DateField(null=True, blank=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
