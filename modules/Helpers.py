import random
import string
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
  page_size = 5
  page_size_query_param = 'page_size'
  max_page_size = 100



def generate_password(length: int) -> str:
  uppercase_letters = string.ascii_uppercase
  lowercase_letters = string.ascii_lowercase
  digits = string.digits
  characters = string.punctuation
  txt = uppercase_letters + lowercase_letters + digits + characters

  password = [random.choice(uppercase_letters), random.choice(lowercase_letters), random.choice(digits), random.choice(characters)]

  remaining_length = length - 4 
  for _ in range(remaining_length):
    password.append(random.choice(txt))

  return r"".join(random.shuffle(password))


def encrypt(text : str, key : int) -> str:
  encrypted_text = r""
  for char in text:
    encrypted_text += chr(ord(char) ^ key)
  return encrypted_text

def decrypt(encrypted_text, key):
  decrypted_text = r""
  for char in encrypted_text:
    decrypted_text += chr(ord(char) ^ key)
  return decrypted_text
