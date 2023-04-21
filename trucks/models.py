from django.db import models

class Truck(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    Monday = models.BooleanField(default=False)
    Tuesday = models.BooleanField(default=False)
    Wednesday = models.BooleanField(default=False)
    Thursday = models.BooleanField(default=False)
    Friday = models.BooleanField(default=False)
    Saturday = models.BooleanField(default=False)
    Sunday = models.BooleanField(default=False)
    open = models.TimeField(default='09:00')
    closed = models.TimeField(default='17:00')
    reviewcount = models.IntegerField(default=0)
    latitude = models.FloatField(default='51.531017363425065')
    longitude = models.FloatField(default='-0.156907085362684')

    def update_review_count(self):
        self.review_count = self.reviews.count()
        self.save()

    def __str__(self):
        return self.name