from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserViewSet, create_user

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('user', UserViewSet, basename='users')

urlpatterns = [
  path('new/', include(router.urls)),
  path('new/create', create_user, name='create_user'),
	path('jwtoken/get/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('jwtoken/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]