from rest_framework.serializers import ModelSerializer
from ..models import Truck

class TruckSerializer(ModelSerializer):
    class Meta:
        model = Truck
        fields = '__all__'