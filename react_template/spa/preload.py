from django.urls import reverse

def get_preload_data(request):
    '''
    given a request returns a dictionary of data that should
    be presupplied to the frontend

    Assumes that AuthenticationMiddleware is installed
    '''

    preload = {}
    preload['user_info'] = get_user_preload_data(request)
    preload['swagger_url'] = get_docs_url()

    return preload

def get_docs_url():
    '''
    Returns the url to the swagger spec
    '''
    return reverse('swagger-documentation') + '?format=openapi'

def get_user_preload_data(request):
    '''
    Gets all the basic info about a user to be sent as preload
    '''
    user = request.user

    if request.user.is_authenticated:
        return {"first_name" : user.first_name,
                "last_name" : user.last_name,
                "username" : user.get_username(),
                "logged_in" :  True,
                "last_login" : user.last_login.isoformat() }
    else:
        return {"logged_in" : False}
