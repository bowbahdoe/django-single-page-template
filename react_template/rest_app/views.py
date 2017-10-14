from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.decorators import authentication_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


from rest_framework.decorators import detail_route
@api_view(['GET'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@detail_route()
def hello_world(request):
    if request.user:
        return Response("hello " + request.user.username)
    else:
        return Response("hello world")
