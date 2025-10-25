from django.urls import path
from .views import (
    get_note,
    CustomTokenObtainPairView,
    CustomRefreshTokenView,
    logout,
    is_authenticated,
    register,
    get_sermon,
)

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomRefreshTokenView.as_view(), name="token_refresh"),
    path("notes/", get_note),
    path("logout/", logout, name="logout"),
    path("authenticated/", is_authenticated),
    path("register/", register),
    path("sermon/", get_sermon),
]
