from django.urls import path
from .views import TruckListView, TruckDetailView

# /api/trucks/:id

urlpatterns = [
    path('', TruckListView.as_view()),
    path('<int:id>/', TruckDetailView.as_view()),
]