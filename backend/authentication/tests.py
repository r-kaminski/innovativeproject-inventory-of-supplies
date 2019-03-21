from rest_framework.test import APIRequestFactory, APITestCase
from django.urls import reverse
from rest_framework import status
from users.models import User

class RegistrationTests(APITestCase):

	@classmethod
	def setUpTestData(cls):
		cls.username = 'testuser'
		cls.password = 'testpassword'
		cls.email = 'test@mail.com'
		cls.invalid_email = 'invalid_email.com'
		cls.first_name = 'John'
		cls.last_name = 'Doe'


	def test_register_user(self):
		"""
		Test default rest-auth registration with valid credentials.
		First and last names would fail silently.
		(User would be created, but wouldn't have names assigned)
		"""
		url = reverse('rest_register')
		response = self.client.post(url, {'username': self.username,
										'password1': self.password,
										'password2': self.password,
										'email': self.email})

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		try:
			User.objects.get(username=self.username)
		except:
			self.assertTrue(False)


	def test_register_invalid_user(self):
		"""
		Test default rest-auth registration with invalid credentials.
		Given email is not in accepted form.
		"""
		url = reverse('rest_register')
		response = self.client.post(url, {'username': self.username,
										'password1': self.password,
										'password2': self.password,
										'email': self.invalid_email})

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		try:
			User.objects.get(username=self.username)
			self.assertTrue(False)
		except:
			pass


	def test_register_user_with_name(self):
		"""
		Test custom registration with first and last names on top of rest-auth.
		First and last names are optional.
		"""
		url = reverse('rest_name_register')
		response = self.client.post(url, {'username': self.username,
										'password1': self.password,
										'password2': self.password,
										'email': self.email,
										'first_name': self.first_name,
										'last_name': self.last_name})

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		try:
			user = User.objects.get(username=self.username)
			self.assertEqual(user.first_name, self.first_name)
			self.assertEqual(user.last_name, self.last_name)
		except:
			self.assertTrue(False)


	def test_register_invalid_user_with_name(self):
		"""
		Test custom registration with first and last names on top of rest-auth.
		Invalid email is given.
		"""
		url = reverse('rest_name_register')
		response = self.client.post(url, {'username': self.username,
										'password1': self.password,
										'password2': self.password,
										'email': self.invalid_email,
										'first_name': self.first_name,
										'last_name': self.last_name})

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		try:
			user = User.objects.get(username=self.username)
			self.assertTrue(False)
		except:
			pass


class LoginTests(APITestCase):

	@classmethod
	def setUpTestData(cls):
		cls.username = 'testuser'
		cls.password = 'testpassword'
		cls.url = '/rest-auth/login/'

		cls.testuser = User.objects.create_user(
			username=cls.username,
			password=cls.password)
		cls.testuser.save()


	def test_login(self):
		"""
		Test default rest-auth login.
		Valid username and password are given.
		"""
		response = self.client.post(self.url, {'username': self.username,
										'password': self.password})

		self.assertEqual(response.status_code, status.HTTP_200_OK)


	def test_invalid_password_login(self):
		"""
		Test default rest-auth login.
		Valid username and invalid password are given.
		"""
		invalid_password = 'invalidpassword'
		response = self.client.post(self.url, {'username': self.username,
										'password': invalid_password})

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


	def test_invalid_username_login(self):
		"""
		Test default rest-auth login.
		Invalid username and valid password are given.
		"""
		invalid_username = 'invalidusername'
		response = self.client.post(self.url, {'username': invalid_username,
										'password': self.password})

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
