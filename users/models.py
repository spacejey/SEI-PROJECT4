from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator

class User(AbstractUser):
    email = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile_images', blank=True, null=True)
