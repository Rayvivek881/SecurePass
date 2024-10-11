from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Credential(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  
  website = models.CharField(max_length=100)
  username = models.CharField(max_length=100)
  password = models.CharField(max_length=100)
  is_deleted = models.BooleanField(default=False)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def set_user(self, user_id):
    self.user = User.objects.get(id=user_id)
    self.save()

  def __str__(self):
    return self.website + ' - ' + self.username
  

class SharedCredential(models.Model):
  sharedBy = models.ForeignKey(User, on_delete=models.CASCADE)
  credential = models.ForeignKey(Credential, on_delete=models.CASCADE)
  accessAbleMembers = models.ManyToManyField(User, related_name='accessAbleMembers')

  created_at = models.DateTimeField(auto_now_add=True)
  
  def set_sharedBy(self, user_id):
    self.sharedBy = User.objects.get(id=user_id)
    self.save()

  def add_accessAbleMember(self, user_id):
    self.accessAbleMembers.add(User.objects.get(id=user_id))
    self.save()
  
  def remove_accessAbleMember(self, user_id):
    self.accessAbleMembers.remove(User.objects.get(id=user_id))
    self.save()
  
  def set_credential(self, credential_id):
    self.credential = Credential.objects.get(id=credential_id)
    self.save()
  
  def __str__(self):
    return self.credential.website + ' - ' + self.credential.username