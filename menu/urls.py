from django.urls import path
from .views import MenuListView, MenuDetailView

urlpatterns = [
    path('', MenuListView.as_view()),
    path('<int:id>/', MenuDetailView.as_view()),
]