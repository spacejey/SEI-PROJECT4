from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from .serializers.common import ReviewSerializer

from .models import Review

# api/reviews/
class ReviewListView(APIView):
    def get(self, request):
        reviews = Review.objects.all()
        serialized_reviews = ReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data)
    
    def post(self, request):
        print('POST FUNCTION EXCUTED')
        review = ReviewSerializer(data=request.data)
        review.is_valid(raise_exception=True)
        review.save()
        print(review.data)
        return Response(review.data, status.HTTP_201_CREATED)

# api/reviews/:id
class ReviewDetailView(APIView):
    def get(self, request, id):
        review = Review.objects.get(id=id)
        serialized_review = ReviewSerializer(review)
        return Response(serialized_review.data)
    
    def put(self, request, id):
        review = Review.objects.get(id=id)
        serialized_review = ReviewSerializer(review, request.data)
        serialized_review.is_valid(raise_exception=True)
        serialized_review.save()
        print('PUT IS PRINTED')
        return Response(serialized_review.data)
    
    def delete(self, request, id):
        review = Review.objects.get(id=id)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


