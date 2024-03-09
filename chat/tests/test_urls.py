
from django.test import TestCase
from django.urls import resolve,reverse
from chat.views import ConversationList,ConversationDetail,MessageDetail

# Create your tests here.

class TestUrls(TestCase):

    def test_conversation_url_is_resolved(self):
        url = reverse('conversation')
        self.assertEquals(resolve(url).func.view_class,ConversationList)

    def test_conversation_detail_url_is_resolved(self):
        url = reverse('conversationDetail',args=[1])
        self.assertEquals(resolve(url).func.view_class,ConversationDetail)
    
    def test_message_detail_url_is_resolved(self):
        url = reverse('messageDetail',args=[1])
        self.assertEquals(resolve(url).func.view_class,MessageDetail)