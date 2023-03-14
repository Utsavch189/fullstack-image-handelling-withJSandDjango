from rest_framework.response import Response
from rest_framework.decorators import api_view,parser_classes
import json
import base64
from rest_framework.parsers import JSONParser


@api_view(['POST'])
@parser_classes([JSONParser])
def file(request):
    filename=request.data['filename']
    fileObj=request.data['data'].split(',')[1]
    try:
        decoded_data=base64.b64decode((fileObj))
        with open(f'media/{filename}','wb') as f:
            f.write(decoded_data)
            f.close()
    except:
        pass
    return Response({"status":"ok!"})