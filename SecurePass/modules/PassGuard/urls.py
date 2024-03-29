from rest_framework.routers import DefaultRouter
from .views import CredentialViewSet, SharedCredentialViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'credentials', CredentialViewSet, basename='credential')
router.register(r'shared-credentials', SharedCredentialViewSet, basename='shared-credential')

urlpatterns = [
  path('', include(router.urls)),
]