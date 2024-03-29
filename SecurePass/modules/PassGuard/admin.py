from django.contrib import admin
from .models import Credential, SharedCredential

# Register your models here.

@admin.register(Credential)
class CredentialAdmin(admin.ModelAdmin):
  list_display = ('id', 'user', 'website', 'username', 'updated_at')
  search_fields = ('website', 'username')
  ordering = ('-updated_at',)


@admin.register(SharedCredential)
class SharedCredentialAdmin(admin.ModelAdmin):
  list_display = ('id', 'sharedBy', 'credential', 'created_at')
  ordering = ('-created_at',)
