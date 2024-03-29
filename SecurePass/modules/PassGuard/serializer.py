from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Credential, SharedCredential
from modules.Helpers import generate_password, encrypt


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email']

class CredentialSerializer(serializers.ModelSerializer):
  class Meta:
    model = Credential
    fields = ['id', 'website', 'username', 'password', 'created_at', 'updated_at']
  
  def create(self, validated_data):
    if 'length' in validated_data.keys():
      validated_data['password'] = generate_password(validated_data['length'])
    
    validated_data['password'] = encrypt(validated_data['password'], validated_data['user'].id)
    return Credential.objects.create(**validated_data)
  


class SharedCredentialSerializer(serializers.ModelSerializer):
  sharedBy = UserSerializer(read_only=True)
  credential = CredentialSerializer(read_only=True)
  class Meta:
    model = SharedCredential
    fields = ['id', 'sharedBy', 'accessAbleMembers', 'credential', 'created_at']
  
  def create(self, validated_data):
    Arr = validated_data.pop('accessAbleMembers')
    validated_data['credential'] = Credential.objects.get(id=self.context['body']['credential'])
    sharedCredential = SharedCredential.objects.create(**validated_data)
    sharedCredential.accessAbleMembers.set(Arr)
    return sharedCredential