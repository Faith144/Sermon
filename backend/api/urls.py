from django.urls import path
from .views import (
    get_note,
    CustomTokenObtainPairView,
    CustomRefreshTokenView,
    logout,
    is_authenticated,
    register,
    get_sermon,
    create_sermon,
    get_telegram_audios,
    create_telegram_audio,
)

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomRefreshTokenView.as_view(), name="token_refresh"),
    path("notes/", get_note),
    path("logout/", logout, name="logout"),
    path("authenticated/", is_authenticated),
    path("register/", register),
    path("sermon/", get_sermon),
    path("sermon/create/", create_sermon),
    path("telegram_audios/", get_telegram_audios),
    path("telegram_audios/create/", create_telegram_audio),
]
