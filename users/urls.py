from django.urls import path
from .views import RegisterView, LoginView, GetUsersView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('users/', GetUsersView.as_view())
]