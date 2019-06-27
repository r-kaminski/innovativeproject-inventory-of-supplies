from django.db import models
from .validators import validate_repletion

class Supply(models.Model):
    name = models.CharField(max_length=50)
    state = models.TextField(default="")
    description = models.TextField(default="")
    to_be_scanned = models.BooleanField(default=True)
    last_time_scanned = models.DateField(null=True, blank=True)
    deleted = models.BooleanField(default=False)

    quantity = models.PositiveIntegerField(null=True, blank=True)
    repletion = models.PositiveIntegerField(null=True, blank=True, validators=[validate_repletion])

    def __str__(self):
        return self.name
