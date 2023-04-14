from django.db import models

class RatingField(models.DecimalField):
    decimal_places = 1
    max_digits = 2

class Review(models.Model):
    rate = models.DecimalField(max_digits=3, decimal_places=1)
    date = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=300)
