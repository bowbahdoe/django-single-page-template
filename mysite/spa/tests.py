from django.test import TestCase, Client
from django.urls import reverse
from bs4 import BeautifulSoup

class TestIndexView(TestCase):
    def setUp(self):
        self.client = Client()
        self.root_url = reverse('single-page-index')

    def test_response_200(self):
        '''
        Makes sure that a request to root_url responds with the right response
        code
        '''
        response = self.client.get(self.root_url)
        self.assertEqual(response.status_code, 200)

    def test_csrf_cookie_is_set(self):
        '''
        Makes sure that a csrf cookie is sent with the response from root
        '''
        self.assertEqual(len(self.client.cookies), 0)
        response = self.client.get(self.root_url)
        csrftoken = self.client.cookies.get('csrftoken', None)
        self.assertNotEqual(csrftoken, None)

    def test_csrf_cookie_decent_length(self):
        '''
        Makes sure that the cookie sent is at least 8 digits
        '''
        response = self.client.get(self.root_url)
        csrftoken = self.client.cookies.get('csrftoken', None)
        self.assertNotEqual(csrftoken, None)
        self.assertGreaterEqual(len(csrftoken), 8) # We dont want a short csrf

    def test_has_mount_div(self):
        '''
        Tests to make sure that there exists a div with the id mount

        This is assumed by the mounting functions of an SPA
        '''
        response = self.client.get(self.root_url)
        soup = BeautifulSoup(response.content, 'html.parser')
        mount_div = soup.find("div", {"id":"mount"})
        self.assertNotEqual(mount_div, None)

    def test_div_empty(self):
        '''
        Tests to make sure that the div with the id mount has no inner contents

        (an SPA should fill that itself)
        '''
        response = self.client.get(self.root_url)
        soup = BeautifulSoup(response.content, 'html.parser')
        mount_div = soup.find("div", {"id":"mount"})
        self.assertEqual(len(mount_div.contents), 0)
