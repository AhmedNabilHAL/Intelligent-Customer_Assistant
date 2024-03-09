from django.urls import path
from chat import views

urlpatterns = [
    path('chat/conversations/', views.ConversationList.as_view(),name='conversation'),
    path('chat/conversations/<int:conversationID>/', views.ConversationDetail.as_view(),name='conversationDetail'),
    path('chat/messages/<int:pk>/', views.MessageDetail.as_view(),name='messageDetail'),
    path('userInfo/', views.UserDetail.as_view(),name='userInfo'),
    
]
