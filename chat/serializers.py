from rest_framework import serializers
from chat.models import Conversation, CustomUser, Message
from django.contrib.auth.models import User


class ConversationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Conversation
        fields = '__all__'
        exclude = []

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username','role','first_name','last_name']
        exclude = []
class MessageSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    conversation = serializers.ReadOnlyField(source='conversation_id')


    class Meta:
        model = Message
        fields = '__all__'
        exclude = []
