import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import logging

logger = logging.getLogger(__name__)

class DatasetAnalytics:
    """Análisis estadístico y visualización del dataset NSL-KDD"""
    
    def __init__(self, data):
        self.data = data
        self.numeric_cols = data.select_dtypes(include=[np.number]).columns.tolist()
        self.categorical_cols = data.select_dtypes(include=['object']).columns.tolist()
    
    def get_overview(self):
        """
        Retorna información general del dataset.
        
        NSL-KDD 2009 es un dataset de 125,973 registros de tráfico de red
        usado para entrenar modelos de detección de intrusiones.
        """
        return {
            'total_records': len(self.data),
            'total_features': len(self.data.columns),
            'numeric_features': len(self.numeric_cols),
            'categorical_features': len(self.categorical_cols),
            'feature_names': self.data.columns.tolist(),
            'dataset_description': (
                'NSL-KDD 2009: Dataset de detección de intrusiones en redes. '
                'Contiene registros de conexiones clasificadas como Normal o Anomalía. '
                '125,973 registros reales con 43 características de tráfico de red.'
            )
        }
    
    def get_class_distribution(self):
        """
        Distribución de clases (Normal vs Anomalía).
        Importante para entender el balance del dataset.
        
        En NSL-KDD: ~67% Normal, ~33% Ataques
        Esta proporción es crucial para evaluar métricas de accuracy.
        """
        if 'class' in self.data.columns:
            class_dist = self.data['class'].value_counts().to_dict()
            total = len(self.data)
            
            percentages = {
                k: round((v / total) * 100, 2) 
                for k, v in class_dist.items()
            }
            
            return {
                'distribution': class_dist,
                'percentages': percentages,
                'total_records': total,
                'explanation': (
                    'Distribución de clases en el dataset. '
                    'Normal: conexiones legítimas. '
                    'Anomaly: conexiones con intentos de ataque.'
                )
            }
        return {'error': 'Columna class no encontrada'}
    
    def get_statistics(self):
        """
        Estadísticas descriptivas de características numéricas.
        Media, mediana, desviación estándar, min, max.
        """
        stats = {}
        
        for col in self.numeric_cols:
            col_data = self.data[col].dropna()
            stats[col] = {
                'mean': float(col_data.mean()),
                'median': float(col_data.median()),
                'std': float(col_data.std()),
                'min': float(col_data.min()),
                'max': float(col_data.max()),
                'q25': float(col_data.quantile(0.25)),
                'q75': float(col_data.quantile(0.75)),
                'explanation': f'Estadísticas de {col}: Media, mediana, rango y dispersión.'
            }
        
        return stats
    
    def get_correlation_matrix(self):
        """
        Matriz de correlación de Pearson entre características numéricas.
        Valores cercanos a 1 o -1 indican fuerte correlación.
        
        Importante: Solo captura correlaciones LINEALES.
        """
        corr_matrix = self.data[self.numeric_cols].corr().round(3)
        
        return {
            'correlation_matrix': corr_matrix.to_dict(),
            'explanation': (
                'Matriz de correlación de Pearson entre características. '
                'Valores cercanos a 1: correlación positiva fuerte. '
                'Valores cercanos a -1: correlación negativa fuerte. '
                'Valores cercanos a 0: sin correlación lineal.'
            )
        }
    
    def get_feature_distributions(self):
        """
        Distribuciones de cada característica numérica.
        Útil para identificar outliers y patrones.
        """
        distributions = {}
        
        for col in self.numeric_cols[:10]:  # Limitar a 10 características por rendimiento
            col_data = self.data[col].dropna()
            
            # Crear histograma con 30 bins
            hist, bins = np.histogram(col_data, bins=30)
            
            distributions[col] = {
                'values': hist.tolist(),
                'bins': bins.tolist(),
                'count': int(col_data.count()),
                'explanation': f'Histograma de {col}: Distribucion de frecuencias en 30 intervalos.'
            }
        
        return distributions
    
    def get_categorical_analysis(self):
        """
        Análisis de características categóricas.
        Muestra frecuencia de cada categoría.
        """
        categorical_analysis = {}
        
        for col in self.categorical_cols[:5]:  # Limitar a 5 por rendimiento
            value_counts = self.data[col].value_counts().to_dict()
            total = sum(value_counts.values())
            
            categorical_analysis[col] = {
                'counts': value_counts,
                'total': total,
                'explanation': f'Frecuencia de valores en {col}. Utilizado para análisis de protocolos y servicios.'
            }
        
        return categorical_analysis
    
    def get_anomaly_statistics(self):
        """
        Estadísticas específicas para detección de anomalías.
        Compara características entre conexiones normales y anómalas.
        """
        if 'class' not in self.data.columns:
            return {'error': 'Columna class no encontrada'}
        
        normal_data = self.data[self.data['class'] == 'normal']
        anomaly_data = self.data[self.data['class'] == 'anomaly']
        
        comparison = {}
        
        for col in self.numeric_cols[:10]:
            if col in self.data.columns:
                normal_mean = float(normal_data[col].mean()) if len(normal_data) > 0 else 0
                anomaly_mean = float(anomaly_data[col].mean()) if len(anomaly_data) > 0 else 0
                
                comparison[col] = {
                    'normal_mean': normal_mean,
                    'anomaly_mean': anomaly_mean,
                    'difference': anomaly_mean - normal_mean,
                    'explanation': f'Comparación de {col} entre conexiones normales y anómalas.'
                }
        
        return {
            'comparison': comparison,
            'normal_count': len(normal_data),
            'anomaly_count': len(anomaly_data),
            'explanation': 'Análisis comparativo entre conexiones legítimas y conexiones con anomalías/ataques.'
        }
    
    def get_model_metrics(self):
        """
        Métricas de desempeño esperadas para un modelo de detección.
        Basadas en benchmarks del dataset NSL-KDD.
        """
        return {
            'expected_metrics': {
                'accuracy': 0.87,
                'precision': 0.85,
                'recall': 0.82,
                'f1_score': 0.83,
            },
            'explanation': (
                'Métricas esperadas basadas en benchmarks del dataset NSL-KDD. '
                'Accuracy: Proporción de predicciones correctas. '
                'Precision: Proporción de anomalías detectadas que son reales. '
                'Recall: Proporción de anomalías reales que fueron detectadas. '
                'F1-Score: Media armónica de Precision y Recall.'
            ),
            'dataset_characteristics': {
                'imbalanced': True,
                'challenge': 'Dataset desbalanceado: 67% normal, 33% anomalía',
                'real_world': 'Datos reales de traffic de red con múltiples tipos de ataques'
            }
        }
