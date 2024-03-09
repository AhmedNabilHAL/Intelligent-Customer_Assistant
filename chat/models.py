from django.db import models

from django.contrib.auth.models import AbstractUser
from .managers import UserManager


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=30,null=False,blank=False)
    last_name = models.CharField(max_length=30,null=False,blank=False)
    email = models.EmailField(unique=True,null=False,blank=False)
    date_of_birth = models.DateField(null=True)
 
    CUSTOMER = 1
    CUSTOMER_SERVICE = 2
      
    ROLE_CHOICES = [
        (CUSTOMER, 'CUSTOMER'),
        (CUSTOMER_SERVICE, 'CUSTOMER_SERVICE'),
    ]
    role = models.IntegerField(choices=ROLE_CHOICES,default=CUSTOMER)
    
    updated = models.DateTimeField(auto_now=True)
    

    REQUIRED_FIELDS = ['role','first_name','email']



    def is_upperclass(self):
        return self.role in {
            self.CUSTOMER,
            self.CUSTOMER_SERVICE,
        }



class Conversation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=256,null=False,blank=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)    
    open = 0
    solved = 1
    unsolved = 2
      
    ROLE_CHOICES = [
        (open, 'open'),
        (solved, 'solved'),
        (unsolved, 'unsolved'),
    ]
    state = models.IntegerField(choices=ROLE_CHOICES,default=open)


class Message(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['user','conversation','email']

    def __str__(self):
        return self.body[0:50]