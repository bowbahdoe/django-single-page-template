from django.test import TestCase, Client
from django.urls import reverse

class TestIndexView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_response_200(self):
        response = self.client.get(reverse('single-page-index'))
        self.assertEqual(response.status_code, 200)

    def test_csrf_cookie_is_set(self):
        self.assertEqual(len(self.client.cookies), 0)
        response = self.client.get(reverse('single-page-index'))
        csrftoken = self.client.cookies.get('csrftoken', None)
        self.assertNotEqual(csrftoken, None)

    def test_csrf_cookie_decent_length(self):
        response = self.client.get(reverse('single-page-index'))
        csrftoken = self.client.cookies.get('csrftoken', None)
        self.assertNotEqual(csrftoken, None)
        self.assertGreater(len(csrftoken), 2) # We dont want a short csrf
