from rest_framework.views import exception_handler
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """Manejador personalizado de excepciones"""
    response = exception_handler(exc, context)
    
    if response is None:
        logger.error(f"Error no manejado: {str(exc)}")
        return Response({
            'error': 'Error interno del servidor',
            'detail': str(exc) if hasattr(exc, '__str__') else 'Error desconocido'
        }, status=500)
    
    return response
