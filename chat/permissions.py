from pickle import TRUE
from rest_framework import permissions
from chat.models import Conversation,Message

CUSTOMER = 1
CUSTOMER_SERVICE = 2

OPEN = 0
SOLVED = 1
UNSOLVED = 2
      
class IsConversationOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_permission(self, request, view):

        if request.user and request.user.role == CUSTOMER_SERVICE :
            return True
        conversation_id = view.kwargs['conversationID']
        conversation = Conversation.objects.get(id=conversation_id)
        return request.user and request.user.is_authenticated and conversation.user == request.user

    def has_object_permission(self, request, view, obj):
        if request.user and request.user.role == CUSTOMER_SERVICE :
            return True
        return request.user == obj.user
class IsConversationOpen(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        conversation_id = view.kwargs['conversationID']
        conversation = Conversation.objects.get(id=conversation_id)
        return conversation.state == OPEN
class IsMessageOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return  request.user and request.user == obj.user