from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

from .models import Review
from .serializers.common import ReviewSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.exceptions import exceptions



# api/reviews/
class ReviewListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # get all the reviews
    # endpoint: GET /api/reviews/
    @exceptions
    def get(self, request):
        reviews = Review.objects.all()
        serialized_reviews = ReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data)
    
    # creat reviews
    # endpoint:  /api/reviews/
    @exceptions
    def post(self, request):
        print('REQUEST DATA ->', { **request.data, 'owner': request.user.id })
        review_to_create = ReviewSerializer(data={ **request.data, 'owner': request.user.id })
        review_to_create.is_valid(raise_exception=True)
        review_to_create.save()
        return Response(review_to_create.data, status.HTTP_201_CREATED)

class ReviewDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # edit reviews
    # endpoint: EDIT /api/reviews/id
    @exceptions
    def put(self, request, id):
        review = Review.objects.put(id=id)
        serialized_review = ReviewSerializer(review, request.data, partial=True)
        serialized_review.is_valid(raise_exception=True)
        serialized_review.save()
        return Response(serialized_review.data)

    # delete reviews
    # endpoint: DELETE /api/reviews/id
    def delete(self, request, id):
        review_to_delete = Review.objects.get(id=id)
        if review_to_delete.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


