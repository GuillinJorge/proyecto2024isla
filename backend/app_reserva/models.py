from django.db import models
from datetime import date

# Create your models here.

class Reserva(models.Model):
    class Meta:
        db_table = 'reserva'
        
    nombre = models.CharField(max_length=200, unique=True)
    dias = models.IntegerField()
    habitacion = models.CharField(max_length=200)
    fecha_release = models.DateField(default=date.today)
    
    def __str__(self):
        return self.nombre