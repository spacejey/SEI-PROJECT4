from .common import TruckSerializer
from menu.serializers.common import MenuSerializer
from reviews.serializers.common import ReviewSerializer

class PopulatedTruckSerializer(TruckSerializer):
    known_menu = MenuSerializer(many=True)
    known_reviews = ReviewSerializer(many=True)  