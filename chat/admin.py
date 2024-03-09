from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import CustomUser, Message,Conversation



class MyUserAdmin(UserAdmin):
    model = CustomUser

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('role',)}),
    )
    add_fieldsets  = UserAdmin.add_fieldsets + (
            (None, {'fields': ('first_name','last_name','email','role')}),
    )

admin.site.register(CustomUser,MyUserAdmin)
admin.site.register(Message)
admin.site.register(Conversation)