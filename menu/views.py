from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers.common import MenuSerializer

from .models import Menu
from lib.exceptions import exceptions


# api/menu/
class MenuListView(APIView):
    @exceptions
    def get(self, request):
        menu = Menu.objects.all()
        serialized_menu = MenuSerializer(menu, many=True)
        return Response(serialized_menu.data)

    @exceptions    
    def post(self, request):
        print('POST FUNCTION EXCUTED')
        menu = MenuSerializer(data=request.data)
        menu.is_valid(raise_exception=True)
        menu.save()
        print(menu.data)
        return Response(menu.data, status.HTTP_201_CREATED)

# api/menu/:id
class MenuDetailView(APIView):
    @exceptions
    def get(self, request, id):
        menu = Menu.objects.get(id=id)
        serialized_menu = MenuSerializer(menu)
        return Response(serialized_menu.data)
    
    @exceptions
    def put(self, request, id):
        menu = Menu.objects.get(id=id)
        serialized_menu = MenuSerializer(menu, request.data)
        serialized_menu.is_valid(raise_exception=True)
        serialized_menu.save()
        print('PUT IS PRINTED')
        return Response(serialized_menu.data)
    
    @exceptions
    def delete(self, request, id):
        menu = Menu.objects.get(id=id)
        menu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



