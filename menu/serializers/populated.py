from .common import MenuSerializer
from trucks.serializers.common import TruckSerializer

class PopulatedMenuSerializer(MenuSerializer):
    known_truck = TruckSerializer(many=True)