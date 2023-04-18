from django.db import models

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
    open = models.TimeField(default='09:00')
    closed = models.TimeField(default='17:00')
    reviewcount = models.IntegerField(default=0)


    def update_review_count(self):
        self.review_count = self.reviews.count()
        self.save()

    def __str__(self):
        return self.name
    