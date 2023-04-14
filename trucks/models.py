from django.db import models

# Create your models here.
class Truck(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    # image = models.ImageField()
    on_monday = models.BooleanField(default=False)
    on_tuesday = models.BooleanField(default=False)
    on_wednesday = models.BooleanField(default=False)
    on_thursday = models.BooleanField(default=False)
    on_friday = models.BooleanField(default=False)
    on_saturday = models.BooleanField(default=False)
    on_sunday = models.BooleanField(default=False)
    start_time = models.TimeField(default='09:00')
    end_time = models.TimeField(default='17:00')

    def __str__(self):
        return self.name