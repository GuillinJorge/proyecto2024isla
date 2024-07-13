from django.contrib import admin
from .models import Reserva

# Register your models here.
#admin.site.register(Reserva)


@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
     pass
