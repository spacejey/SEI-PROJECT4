from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers.common import TruckSerializer

from .models import Truck
from lib.exceptions import exceptions

# api/trucks/
class TruckListView(APIView):
    @exceptions
    def get(self, request):
        trucks = Truck.objects.all()
        serialized_trucks = TruckSerializer(trucks, many=True)
        return Response(serialized_trucks.data)
    
    @exceptions
    def post(self, request):
        print('POST FUNCTION EXCUTED')
        truck = TruckSerializer(data=request.data)
        truck.is_valid(raise_exception=True)
        truck.save()
        print(truck.data)
        return Response(truck.data, status.HTTP_201_CREATED)

# api/trucks/:id
class TruckDetailView(APIView):
    @exceptions
    def get(self, request, id):
        truck = Truck.objects.get(id=id)
        serialized_truck = TruckSerializer(truck)
        return Response(serialized_truck.data)
    
    @exceptions
    def put(self, request, id):
        truck = Truck.objects.get(id=id)
        serialized_truck = TruckSerializer(truck, request.data)
        serialized_truck.is_valid(raise_exception=True)
        serialized_truck.save()
        print('PUT IS PRINTED')
        return Response(serialized_truck.data)
    
    @exceptions
    def delete(self, request, id):
        truck = Truck.objects.get(id=id)
        truck.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

