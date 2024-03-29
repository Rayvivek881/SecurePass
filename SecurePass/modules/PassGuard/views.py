from django.shortcuts import render
from .serializer import CredentialSerializer, SharedCredentialSerializer
from .models import Credential, SharedCredential
from rest_framework import viewsets, status
from modules.CustomResponse import SuccessResponse, ErrorResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from modules.Helpers import CustomPagination

# Create your views here.
class CredentialViewSet(viewsets.ViewSet):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def list(self, request):
    filterObject = {}
    for key, val in request.query_params.items():
      if key != 'page' and key != 'page_size':
        filterObject[key] = val
    
    credentials = Credential.objects.filter(user=request.user, is_deleted=False, **filterObject)
    
    paginator = CustomPagination()  
    result_page = paginator.paginate_queryset(credentials, request)
    serializer = CredentialSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
    

  def create(self, request):
    serializer = CredentialSerializer(data=request.data, context={'body': request.data})
    if serializer.is_valid():
      serializer.save(user=request.user)
      return SuccessResponse(serializer.data, 'Credential Created', status.HTTP_201_CREATED)
    
    return ErrorResponse(serializer.errors, 
              'Credential Creation Failed', status.HTTP_400_BAD_REQUEST)
  
  def retrieve(self, request, pk=None):
    try:
      credential = Credential.objects.get(id=pk, user=request.user, is_deleted=False)
    except Credential.DoesNotExist:
      return ErrorResponse(None, 'Credential Not Found', status.HTTP_404_NOT_FOUND)
    
    serializer = CredentialSerializer(credential)
    return SuccessResponse(serializer.data, 'Credential Details', status.HTTP_200_OK)
  
  def update(self, request, pk=None):
    try:
      credential = Credential.objects.get(id=pk, user=request.user, is_deleted=False)
    except Credential.DoesNotExist:
      return ErrorResponse(None, 'Credential Not Found', status.HTTP_404_NOT_FOUND)
    
    serializer = CredentialSerializer(credential, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return SuccessResponse(serializer.data, 'Credential Updated', status.HTTP_200_OK)
    
    return ErrorResponse(serializer.errors, 
              'Credential Update Failed', status.HTTP_400_BAD_REQUEST)
  
  def partial_update(self, request, pk=None):
    try:
      credential = Credential.objects.get(id=pk, user=request.user, is_deleted=False)
    except Credential.DoesNotExist:
      return ErrorResponse(None, 'Credential Not Found', status.HTTP_404_NOT_FOUND)
    
    serializer = CredentialSerializer(credential, data=request.data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return SuccessResponse(serializer.data, 'Credential Updated', status.HTTP_200_OK)
    
    return ErrorResponse(serializer.errors, 
              'Credential Update Failed', status.HTTP_400_BAD_REQUEST)
  
  def destroy(self, request, pk=None):
    try:
      credential = Credential.objects.get(id=pk, user=request.user, is_deleted=False)
    except Credential.DoesNotExist:
      return ErrorResponse(None, 'Credential Not Found', status.HTTP_404_NOT_FOUND)
    
    credential.is_deleted = True
    credential.save()
    return SuccessResponse(None, 'Credential Deleted', status.HTTP_200_OK)


class SharedCredentialViewSet(viewsets.ViewSet):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def list(self, request):
    filterObject = {}
    for key, val in request.query_params.items():
      if key != 'page' and key != 'page_size':
        filterObject[key] = val
    
    sharedCredentials = SharedCredential.objects.filter(accessAbleMembers=request.user, **filterObject)
    
    paginator = CustomPagination()  
    result_page = paginator.paginate_queryset(sharedCredentials, request)
    serializer = SharedCredentialSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
    

  def create(self, request):
    request.data["accessAbleMembers"].append(request.user.id)
    serializer = SharedCredentialSerializer(data=request.data, context={'body': request.data})
    if serializer.is_valid():
      serializer.save(sharedBy=request.user)
      return SuccessResponse(serializer.data, 'Shared Credential Created', status.HTTP_201_CREATED)
    
    return ErrorResponse(serializer.errors, 
              'Shared Credential Creation Failed', status.HTTP_400_BAD_REQUEST)

  def retrieve(self, request, pk=None):
    try:
      sharedCredential = SharedCredential.objects.get(id=pk, accessAbleMembers=request.user)
    except SharedCredential.DoesNotExist:
      return ErrorResponse(None, 'Shared Credential Not Found', status.HTTP_404_NOT_FOUND)
    
    serializer = SharedCredentialSerializer(sharedCredential)
    return SuccessResponse(serializer.data, 'Shared Credential Details', status.HTTP_200_OK)
  
  def destroy(self, request, pk=None):
    try:
      sharedCredential = SharedCredential.objects.get(id=pk, sharedBy=request.user)
    except SharedCredential.DoesNotExist:
      return ErrorResponse(None, 'Shared Credential Not Found', status.HTTP_404_NOT_FOUND)
    
    sharedCredential.delete()
    return SuccessResponse(None, 'Shared Credential Deleted', status.HTTP_200_OK)