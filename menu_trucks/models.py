from django.db import models

class menu_trucks(models.Model):
    truck_id = models.ForeignKey(
        'trucks.Truck',
        on_delete=models.CASCADE,
        related_name='menu_trucks',
        null=True
        )
    menu_id = models.ForeignKey(
        'menu.Menu',
        on_delete=models.CASCADE,
        related_name='menu_trucks',
        null=True        
        )

    def __str__(self):
        return f'{self.truck_id}  {self.menu_id}'