from django.db import models

class Truck(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/', default='')
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
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    menu = models.ForeignKey(
    'menu.Menu',
        on_delete=models.CASCADE,
        default=1,
        related_name='trucks'
    )

    def update_reviewcount(self):
        self.reviewcount = self.reviews.count()
        self.save()
    def __str__(self):
        return self.name
    
    