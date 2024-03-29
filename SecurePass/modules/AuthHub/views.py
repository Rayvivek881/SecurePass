from rest_framework import viewsets, status
from django.contrib.auth.models import User
from .serializer import UserSerializer
from modules.CustomResponse import SuccessResponse, ErrorResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['POST'])
def create_user(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return SuccessResponse(serializer.data, 'User Created', status.HTTP_201_CREATED)
  
  return ErrorResponse(serializer.errors, 'User Creation Failed', status.HTTP_400_BAD_REQUEST)

def check_validations(request, pk):
  user = User.objects.get(id=pk)
  
  if request.user != user: 
    return False, ErrorResponse('Unauthorized', 
                'You are Not Unauthorized to Do this Operation', status_code=status.HTTP_401_UNAUTHORIZED)

  return True, None


class UserViewSet(viewsets.ModelViewSet):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  unauthorized_response = ErrorResponse('Unauthorized', 
                            'You are Not Unauthorized to Do this Operation', status_code=status.HTTP_401_UNAUTHORIZED)
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def list(self, request, *args, **kwargs):    
    params, filterObj = request.query_params, {}
    if 'username' in params.keys():
      filterObj['username__contains'] = params['username']
    
    users = User.objects.filter(**filterObj)
    serializer = UserSerializer(users, many=True)
    return SuccessResponse(serializer.data, 'Users List', status.HTTP_200_OK)
  
  def update(self, request, pk : int):
    is_allowed, response = check_validations(request, pk)
    if not is_allowed: return response
    
    return super().update(request, pk)
  
  def partial_update(self, request, pk : int):
    is_allowed, response = check_validations(request, pk)
    if not is_allowed: return response
    
    return super().partial_update(request, pk)
  
  def destroy(self, request, pk : int):
    is_allowed, response = check_validations(request, pk)
    if not is_allowed: return response
    
    return super().destroy(request, pk)
  
  def retrieve(self, request, pk : int):
    is_allowed, response = check_validations(request, pk)
    if not is_allowed: return response
    
    return super().retrieve(request, pk)