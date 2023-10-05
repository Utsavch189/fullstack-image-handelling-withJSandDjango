from rest_framework.response import Response
from rest_framework.decorators import api_view,parser_classes
import json
import base64
from rest_framework.parsers import JSONParser
from datetime import datetime

class MyResponse(Response):
    def __init__(self, data=None, status=None, template_name=None, headers=None, exception=False, content_type=None):
        timestamp=datetime.timestamp(datetime.now())
        data={**data,"timestamp":timestamp}
        super().__init__(data, status, template_name, headers, exception, content_type)

@api_view(['POST'])
@parser_classes([JSONParser])
def file(request):
    filename=request.data['filename']
    username=request.data['username']
    fileObj=request.data['data'].split(',')[1]
    try:
        decoded_data=base64.b64decode((fileObj))
        with open(f'media/{username+filename}','wb') as f:
            f.write(decoded_data)
            f.close()
    except:
        pass
    return MyResponse({"status":"ok!"})

@api_view(['POST'])
@parser_classes([JSONParser])
def chunk_file(request):
    filename=request.data['filename']
    chunk_number=request.data['chunk_number']
    username=request.data['username']
    fileObj=request.data['data'].split(',')[1]
    try:
        decoded_data=base64.b64decode((fileObj))
        with open(f'media/{username+filename}','ab') as f:
            f.write(decoded_data)
            f.close()
    except:
        pass
    return MyResponse({"status":"ok!","chunk_number_received":chunk_number})