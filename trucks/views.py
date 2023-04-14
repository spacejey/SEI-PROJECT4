from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from .serializers.common import TruckSerializer

from .models import Truck

# api/trucks/
class TruckListView(APIView):
    def get(self, request):
        trucks = Truck.objects.all()
        serialized_trucks = TruckSerializer(trucks, many=True)
        return Response(serialized_trucks.data)
    
    def post(self, request):
        print('POST FUNCTION EXCUTED')
        truck = TruckSerializer(data=request.data)
        truck.is_valid(raise_exception=True)
        truck.save()
        print(truck.data)
        return Response(truck.data, status.HTTP_201_CREATED)

# api/trucks/:id
class TruckDetailView(APIView):
    def get(self, request, id):
        truck = Truck.objects.get(id=id)
        serialized_truck = TruckSerializer(truck)
        return Response(serialized_truck.data)
    
    def put(self, request, id):
        truck = Truck.objects.get(id=id)
        serialized_truck = TruckSerializer(truck, request.data)
        serialized_truck.is_valid(raise_exception=True)
        serialized_truck.save()
        print('PUT IS PRINTED')
        return Response(serialized_truck.data)
    
    def delete(self, request, id):
        truck = Truck.objects.get(id=id)
        truck.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

