from django.urls import path
from .views import login, client
urlpatterns = [
     path('home/', login.HomeView.as_view(), name ='home'),
     path('logout/', login.LogoutView.as_view(), name ='logout'),
     path('create/', login.SingUp.as_view(), name ='SingUp'),
     
     
     
     # ---------------------Path Cliente----------------
     path('api/cadastro/client', client.Client.as_view(), name ='client_cad'),
     path('api/get/edit/client/<int:id>', client.Client.as_view(), name ='client_get_edit'),
     path('api/get/client/', client.get_all_client, name ='client_get'),
     path('api/put/client/<int:id>', client.Client.as_view(), name ='client_put'),
     path('api/delete/client/<int:id>', client.Client.as_view(), name ='client_delete'),
     
     
     
     # -----------------Path CNPJ-----------------
     
     path('api/cadastro/cnpj', client.CNPJ.as_view(), name='cadastro_cnpj'),
     path('api/get/empresa/<int:id>', client.get_all_cnpj, name ='cnpj_get_client'),
     path('api/get/edit/cnpj/<int:id>', client.CNPJ.as_view(), name ='cnpj_get_edit'),
     path('api/put/cnpj/<int:id>', client.CNPJ.as_view(), name ='cnpj_put'),
     
     

]