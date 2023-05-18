from typing import Iterable, Optional
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from rest_framework.validators import ValidationError

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_flieds):
        email = self.normalize_email(email)
        user = self.model(
            email = email,
            **extra_flieds
        ) 
        user.set_password(password)
        user.save()
        return user


class User(AbstractUser):
    email = models.CharField(max_length=80, unique=True)
    username = models.CharField(max_length=45)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
    
class Clientes(models.Model):
    id = models.AutoField(primary_key=True)
    empresa = models.CharField(max_length=99, blank=False, null=False)
    status = models.CharField(max_length=15,blank=False, null=False)
    id_user = models.ForeignKey('User', on_delete=models.DO_NOTHING, db_column='id_user')
    
class ClienteCnpj(models.Model):
    id = models.AutoField(primary_key=True)
    cnpj_empresa = models.CharField(max_length=99, blank=False, null=False)
    nome = models.CharField(max_length=99, blank=False, null=False)
    status = models.CharField(max_length=15,blank=False, null=False)
    id_cliente = models.ForeignKey('Clientes', on_delete=models.DO_NOTHING, db_column='id_cliente')