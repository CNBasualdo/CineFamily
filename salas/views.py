from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Funcion, Asiento, Reserva, Producto, Anuncio
from .serializer import FuncionSerializer, AsientoFuncionSerializer, ProductoSerializer,AnuncioSerializer

@api_view(["GET"])
def asientos_por_funcion(request, funcion_id):
    funcion = get_object_or_404(Funcion, id=funcion_id)
    asientos = Asiento.objects.filter(sala=funcion.sala)
    serializer = AsientoFuncionSerializer(
        asientos,
        many=True,
        context={"funcion":funcion}
    )
    return Response(serializer.data)


@api_view(["POST"])
def reservar_asiento(request):
    funcion_id = request.data["funcion_id"]
    asiento_id = request.data["asiento_id"]

    reserva, created = Reserva.objects.get_or_create(
        funcion_id = funcion_id,
        asiento_id = asiento_id
    )
    return Response({"reservado":True})

@api_view(["GET"])
def lista_funciones(request):
    funciones =Funcion.objects.all()
    serializer = FuncionSerializer(funciones, many=True )
    
    return Response(serializer.data)


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(disponible=True)
    serializer_class = ProductoSerializer


@api_view(["POST"])
def comprar_productos(request):
    productos = request.data.get("productos", [])

    for item in productos :
        producto = Producto.objects.get(id=item["id"])

        if producto.stock >= item["cantidad"]:
            producto.stock -= item["cantidad"]
            producto.save()
        
        else :
            return Response({
                "error": f"Stock insuficiente para {producto.nombre}"
            }, status=400)
        
        return Response({"success": True})
    
class AnuncioViewSet(viewsets.ModelViewSet):
    queryset = Anuncio.objects.filter(activo=True).order_by("orden")
    serializer_class = AnuncioSerializer