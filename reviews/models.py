from django.db import models


class Review(models.Model):
    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        default=None,
        related_name='reviews'
    )
    truck = models.ForeignKey(
        'trucks.Truck',
        on_delete=models.CASCADE,
        default=None,
        related_name='reviews'
    )
    rate = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=300)

    def __str__(self):
      return f'{self.owner} - {self.rate}'
  
