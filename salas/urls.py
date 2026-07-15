from django.urls import path
from rest_framework import routers
from .views import asientos_por_funcion, reservar_asiento, lista_funciones, ProductoViewSet, comprar_productos,AnuncioViewSet


router = routers.DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'anuncios',AnuncioViewSet)

urlpatterns =[
    path("funciones/", lista_funciones),
    path("funciones/<int:funcion_id>/asientos/", asientos_por_funcion),
    path ("reservar/", reservar_asiento),
    path("comprar-productos/", comprar_productos),
]

urlpatterns += router.urls



