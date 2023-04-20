from django.urls import path
from .views import ReviewListView, ReviewDetailView

# api/reviews/
urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:id>/', ReviewDetailView.as_view()),
]