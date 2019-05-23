from django.db import models
from django.core.files.storage import FileSystemStorage

fs = FileSystemStorage(location='/media/photos')  # Django file storage


class Supply(models.Model):
    name = models.CharField(max_length=50)
    state = models.TextField(default="")
    description = models.TextField(default="")
    image = models.ImageField(storage=fs, default="")

    def __str__(self):
        return self.name
