from .common import ReviewSerializer
from trucks.serializers.common import TruckSerializer

class PopulatedReviewSerializer(ReviewSerializer):
    known_truck = TruckSerializer(many=True)