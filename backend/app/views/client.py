from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..serializers import ClientesSerializer, ClienteCnpjSerializer
from ..models import Clientes, ClienteCnpj , User
from rest_framework.decorators import api_view



@api_view(['GET'])
def get_all_client(request):
     try:
          clientes = Clientes.objects.filter(id_user=request.user.id)
          result = ClientesSerializer(clientes, many=True,context={'request': request}).data
          return Response(result, status=status.HTTP_200_OK)
     except Exception as e:
          return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_cnpj(request, id):
     try:
          cnpj_ = ClienteCnpj.objects.filter(id_cliente = id)
          result = ClienteCnpjSerializer(cnpj_, many=True,context={'request': request}).data
          return Response(result, status=status.HTTP_200_OK)
     except Exception as e:
          return Response(status=status.HTTP_400_BAD_REQUEST)

class Client(APIView):
     permission_classes = [IsAuthenticated]
     def post(self, request):
          try:
               dados = request.data
          
               client_exists= Clientes.objects.filter(empresa=dados['empresa'], id_user =request.user.id).exists()
               if client_exists:
                    return Response('Essa empressa já existe!', status=status.HTTP_400_BAD_REQUEST)
               else:
                    cliente = Clientes.objects.create(
                    empresa = dados["empresa"],
                    status = dados["ativo"],
                    id_user = User.objects.get(id = request.user.id)
                    )
                    cliente.save()      
                         
               return Response(cliente.id,status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
     
     def get(self, request, id):
          try:
               clientes = Clientes.objects.filter(id=id)
               result = ClientesSerializer(clientes, many=True,context={'request': request}).data
               return Response(result, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          
     def put(self, request, id):
          try:
               dados = request.data
               query = Clientes.objects.filter(id = id)
               query.update(empresa = dados["empresa"], status = dados["ativo"])
               return Response(status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)

     def delete(self, request, id):
          # try:
               ClienteCnpj.objects.filter(id_cliente__id =id).delete()
               Clientes.objects.filter(id = id).delete()
               return Response(status=status.HTTP_200_OK)
          # except Exception as e:
          #      return Response(status=status.HTTP_400_BAD_REQUEST)
     
class CNPJ(APIView):
     permission_classes = [IsAuthenticated]
     def post(self, request):
          try:
               dados = request.data
               if ClienteCnpj.objects.filter( nome = dados["nome"], id_cliente__id_user = request.user.id, cnpj_empresa = dados['cnpj']).exists():
                    return Response('Esse CNPJ já existe!', status=status.HTTP_400_BAD_REQUEST)
               else:
                    cnpj_ = ClienteCnpj.objects.create(
                    cnpj_empresa = dados["cnpj"],
                    nome = dados["nome"],
                    status = dados["status"],
                    id_cliente = Clientes.objects.get(id = dados["id"])
                    )
                    cnpj_.save()      
                              
                    return Response(status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
     
     def get(self, request, id):
          try:
               cnpj = ClienteCnpj.objects.filter(id=id)
               result = ClienteCnpjSerializer(cnpj, many=True,context={'request': request}).data
               return Response(result, status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          
     def put(self, request, id):
          try:
               dados = request.data
               query = ClienteCnpj.objects.filter(id = id)
               if(ClienteCnpj.objects.filter(cnpj_empresa = dados["cnpj"], status = dados["status"], nome = dados['nome'],id_cliente__id_user = request.user.id).exists()):
                    return Response("Dados já cadastrados!",status.HTTP_400_BAD_REQUEST)
               else:  
                    query.update(cnpj_empresa = dados["cnpj"], status = dados["status"], nome = dados['nome'])
               return Response(status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)