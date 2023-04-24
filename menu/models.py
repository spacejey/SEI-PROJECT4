from django.db import models

class Menu(models.Model):
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(max_length=20)
    
    def __str__(self):
        return f'{self.name} ··· {self.price}'