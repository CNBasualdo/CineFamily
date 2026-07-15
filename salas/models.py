from django.db import models

# Create your models here.
class Sala(models.Model):
    nombre = models.CharField(max_length=50)
    filas = models.IntegerField()
    columnas = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=3500)

    def __str__(self):
        return self.nombre
    
    def save(self, *args, **kwargs):
        nueva = self.pk is None
        super().save(*args, **kwargs)

        if nueva :
            for fila in range(1,self.filas + 1):
                for columna in range(1, self.columnas +1 ):
                    Asiento.objects.create(
                        sala = self,
                        fila=fila,
                        columna = columna
                        )
    
class Asiento(models.Model):
    sala = models.ForeignKey(Sala, on_delete=models.CASCADE, related_name="asientos")
    fila = models.IntegerField()
    columna = models.IntegerField()
    precio = models.IntegerField(default=12000)

    def __str__(self):
        return f"Sala {self.sala.nombre} - Fila {self.fila} Col {self.columna}"
    
class Funcion(models.Model):
    pelicula_id = models.IntegerField()
    sala = models.ForeignKey(Sala, on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField()

    def __str__(self):
        return f"Peli {self.pelicula_id} - {self.fecha_hora}"
    
class Reserva(models.Model):
    funcion = models.ForeignKey(Funcion, on_delete=models.CASCADE, related_name="reservas" )
    asiento =models.ForeignKey(Asiento, on_delete=models.CASCADE)

    def __str__(self):
        return f"Asiento{self.asiento.id}reservado"



class Producto(models.Model):
    CATEGORIAS =(
        ('combo','Combo'),
        ('bebida','Bebida'),
        ('alimento','Alimento'), 
        ('merch','Merch'),
    )
    nombre= models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen =models.ImageField(upload_to='productos/')
    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    disponible = models.BooleanField(default=True)
    stock = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.nombre
    

class Anuncio(models.Model):
    POSICIONES = (
        ("top","Arriba"),
        ("middle", "Medio"),
        ("bottom", "Abajo"),
    )
    titulo = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to="anuncios/")
    activo = models.BooleanField(default=True)
    posicion = models.CharField(max_length=20, choices=POSICIONES)
    orden = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.titulo