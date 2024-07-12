from django.urls import path, include
from .views import ReservaViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("reserva", ReservaViewSet, basename="reserva")

urlpatterns = [path("", include(router.urls))]  # rutas generadas automaticamente
