from django.urls import path, include
from .views import ReservaViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(" ", ReservaViewSet, basename="reserva") # puede ir vacio o usar la direccion reserva/

urlpatterns = [path(" ", include(router.urls))]  # rutas generadas automaticamente
