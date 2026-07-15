from rest_framework import serializers
from .models import Sala,Asiento,Funcion,Reserva,Producto,Anuncio

class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = "__all__"

class AsientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asiento
        fields = "__all__"

class AsientoFuncionSerializer(serializers.ModelSerializer):
    reservado = serializers.SerializerMethodField()
    precio= serializers.SerializerMethodField()
    class Meta:
        model = Asiento
        fields = ["id","fila","columna","reservado","precio"]
    def get_precio(self,obj):
        return obj.sala.precio
    
    def get_reservado(self, obj):
        
        funcion = self.context.get("funcion")
        return Reserva.objects.filter(
            funcion=funcion,
            asiento=obj
        ).exists()

class FuncionSerializer(serializers.ModelSerializer):
    
    sala = serializers.StringRelatedField()

    class Meta :
        model = Funcion
        fields= "__all__" 
        
class ReservaSerializer( serializers.ModelSerializer):
    class Meta:
        model = Reserva 
        fields ="__all__"   

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Producto
        fields = '__all__'

class AnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anuncio 
        fields = "__all__"

