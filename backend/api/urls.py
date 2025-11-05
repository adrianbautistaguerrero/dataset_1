from django.urls import path
from . import views

urlpatterns = [
    # Información general
    path('overview/', views.dataset_overview, name='dataset_overview'),
    
    # Análisis de clases
    path('class-distribution/', views.class_distribution, name='class_distribution'),
    
    # Estadísticas descriptivas
    path('statistics/', views.statistics, name='statistics'),
    
    # Análisis de correlación
    path('correlation-matrix/', views.correlation_matrix, name='correlation_matrix'),
    
    # Distribuciones de características
    path('feature-distributions/', views.feature_distributions, name='feature_distributions'),
    
    # Análisis categórico
    path('categorical-analysis/', views.categorical_analysis, name='categorical_analysis'),
    
    # Análisis de anomalías
    path('anomaly-analysis/', views.anomaly_analysis, name='anomaly_analysis'),
    
    # Métricas del modelo
    path('model-metrics/', views.model_metrics, name='model_metrics'),
]
