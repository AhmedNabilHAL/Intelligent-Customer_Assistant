
from http import client
from urllib import response
from django.test import TestCase, Client
from django.urls import reverse
from chat.models import Conversation,Message
import json 
class TestViews(TestCase):
    
    def setUp(self):
        self.client = Client()

    def test_conversation_list_GET(self):

        response = self.client.get(reverse('conversation'))
        
        self.assertEquals(response.status_code, 403)
