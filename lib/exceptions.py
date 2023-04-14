from functools import wraps
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from django.core.exceptions import ImproperlyConfigured
from rest_framework import status
from trucks.models import Truck

def exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
          return func(*args, **kwargs)
        except (NotFound, Truck.DoesNotExist) as e:
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) }, status.HTTP_404_NOT_FOUND)
        except (ValidationError, ImproperlyConfigured) as e:
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) }, status.HTTP_500_INTERNAL_SERVER_ERROR)
    return wrapper