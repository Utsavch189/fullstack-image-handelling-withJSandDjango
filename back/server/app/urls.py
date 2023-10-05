from django.urls import path
from .views import *

urlpatterns = [
    path('file',file),
    path('chunk_file',chunk_file)
]
