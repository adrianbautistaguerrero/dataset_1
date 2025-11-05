from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def health_check(request):
    """Verificar que el servidor está funcionando"""
    return Response({
        'status': 'healthy',
        'message': 'API de análisis NSL-KDD funcionando correctamente'
    })

urlpatterns = [
    path('health/', health_check, name='health_check'),
    path('api/', include('api.urls')),
]
