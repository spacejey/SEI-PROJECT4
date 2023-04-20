from django.urls import path
from .views import RegisterView, LoginView, GetUsersView, userDetailView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('users/', GetUsersView.as_view()),
    path('users/:userId', userDetailView.as_view())
]