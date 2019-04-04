from django.db import models


class QRCodePrint(models.Model):
    value = models.TextField()

    def __str__(self):
        return self.value
