from email import message
from rest_framework.response import Response
from chat.models import Conversation, CustomUser,Message
from chat.serializers import ConversationSerializer, MessageSerializer, UserSerializer
from rest_framework import generics
from rest_framework import permissions
from chat.permissions import IsConversationOpen, IsConversationOwner,IsMessageOwner
from rest_framework.views import APIView

class ConversationList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ConversationSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
                    
    def get_queryset(self):
        if(self.request.user.role==2): 
            return Conversation.objects.all()
        return Conversation.objects.filter(user=self.request.user,state=0)

class ConversationDetail(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated,IsConversationOwner,IsConversationOpen]

    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        conversation_id = self.kwargs['conversationID']
        serializer.save(user=self.request.user,conversation_id=conversation_id)


        user = CustomUser.objects.get(username="CustomerSupp")
        message = Message(body="Hendi be7b shawkey", conversation_id=conversation_id,user=user)
        message.save()
        
    def get_queryset(self):
        pk = self.kwargs['conversationID']
        return Message.objects.filter(conversation_id=pk)

class MessageDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated,IsMessageOwner]
    serializer_class = MessageSerializer
    queryset = Message


class UserDetail(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)