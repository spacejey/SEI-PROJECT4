from django.urls import path
from .views import ReviewListView, ReviewDetailView

# api/reviews/
urlpatterns = [
    path('reviews/', ReviewListView.as_view()),
    path('reviews/<int:id>/', ReviewDetailView.as_view()),
]