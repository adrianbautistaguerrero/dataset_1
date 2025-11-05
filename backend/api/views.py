from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import logging
from .data_loader import get_dataset
from .analytics import DatasetAnalytics
from .serializers import FeatureFilterSerializer, ClassFilterSerializer

logger = logging.getLogger(__name__)

# Cargar dataset una sola vez
_dataset = None
_analytics = None

def _initialize_analytics():
    """Inicializar analytics con lazy loading"""
    global _dataset, _analytics
    if _analytics is None:
        try:
            _dataset, _ = get_dataset()
            _analytics = DatasetAnalytics(_dataset)
            logger.info("Analytics inicializado correctamente")
        except Exception as e:
            logger.error(f"Error inicializando analytics: {e}")
    return _analytics

@api_view(['GET'])
def dataset_overview(request):
    """
    GET /api/overview/
    
    Retorna información general del dataset NSL-KDD 2009:
    - Total de registros: 125,973 (o 5,000 en demostración)
    - Total de características: 43
    - Tipos de datos: numéricos y categóricos
    - Descripción completa del dataset
    """
    try:
        analytics = _initialize_analytics()
        data = analytics.get_overview()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error en dataset_overview: {e}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def class_distribution(request):
    """
    GET /api/class-distribution/
    
    Retorna la distribución de clases (Normal vs Anomalía):
    - Normal: ~67% (conexiones legítimas)
    - Anomaly: ~33% (intentos de ataque)
    
    Importante para entender el balance del dataset y evaluar métricas.
    """
    try:
        analytics = _initialize_analytics()
        data = analytics.get_class_distribution()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error en class_distribution: {e}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def statistics(request):
    """
    GET /api/statistics/
    
    Estadísticas descriptivas de todas las características numéricas:
    - Media: promedio de valores
    - Mediana: valor central
    - Desviación estándar: dispersión de datos
    - Mín/Máx: rangos
    - Cuartiles (Q25, Q75): distribución percentil
    """
    try:
        analytics = _initialize_analytics()
        data = analytics.get_statistics()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error en statistics: {e}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def correlation_matrix(request):
    """
    GET /api/correlation-matrix/
    
    Matriz de correlación de Pearson entre características:
    - Valores cercanos a 1: correlación positiva fuerte
    - Valores cercanos a -1: correlación negativa fuerte
    - Valores cercanos a 0: sin correlación lineal
    
    NOTA: Solo captura relaciones LINEALES. Relaciones no-lineales no se detectan.
    """
    try:
        analytics = _initialize_analytics()
        data = analytics.get_correlation_matrix()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error en correlation_matrix: {e}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def feature_distributions(request):
    """
    GET /api/feature-distributions/
    
    Histogramas de distribución de características numéricas:
    - Frecuencia en 30 intervalos (bins)
    - Útil para identificar distribuciones normales, sesgadas, multimodales
    - Ayuda a detectar outliers y anomalías
    """
    try:
        analytics = _initialize_analytics()
        data = analytics.get_feature_distributions()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error en feature_distributions: {e}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def categorical_analysis(request):
    """
    GET /api/categorical-analysis/
    
    Análisis de características categóricas:
    - Frecuencia de cada valor (protocolo, servicio, etc.)
    - Útil para entender qué tipos de protocolos y servicios dominan
    - Importante para análisis de patrones de ataque
    """
    try:
        analytics = _initialize_analytics()
        data = analytics.get_categorical_analysis()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error en categorical_analysis: {e}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def anomaly_analysis(request):
    """
    GET /api/anomaly-analysis/
    
    Comparación estadística entre conexiones normales y anómalas:
    - Media de características para cada clase
    - Diferencias que pueden ser indicadores de ataque
    - Cuenta total de registros normales vs anómalos
    """
    try:
        analytics = _initialize_analytics()
        data = analytics.get_anomaly_statistics()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error en anomaly_analysis: {e}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def model_metrics(request):
    """
    GET /api/model-metrics/
    
    Métricas esperadas de modelos de machine learning para NSL-KDD:
    - Accuracy: Porcentaje de predicciones correctas
    - Precision: De las anomalías detectadas, cuántas son reales
    - Recall: De todas las anomalías reales, cuántas detectamos
    - F1-Score: Balance entre Precision y Recall
    
    Estas son métricas benchmark basadas en investigaciones sobre NSL-KDD.
    """
    try:
        analytics = _initialize_analytics()
        data = analytics.get_model_metrics()
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error en model_metrics: {e}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
