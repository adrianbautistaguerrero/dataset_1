import numpy as np
import pandas as pd
import logging
from scipy.io import arff
import os

logger = logging.getLogger(__name__)

class DatasetLoader:
    """Cargador de dataset NSL-KDD con patrón Singleton"""
    _instance = None
    _data = None
    _test_data = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatasetLoader, cls).__new__(cls)
        return cls._instance
    
    def load_dataset(self):
        """
        Carga el dataset NSL-KDD. Si no existe, genera datos de demostración.
        El dataset real tiene 125,973 registros con 43 características.
        """
        if self._data is not None:
            return self._data, self._test_data
        
        try:
            # Intentar cargar archivo ARFF real
            arff_path = os.path.join(os.path.dirname(__file__), 'data', 'NSL_KDD_Train.arff')
            if os.path.exists(arff_path):
                data, meta = arff.loadarff(arff_path)
                self._data = pd.DataFrame(data)
            else:
                logger.warning("Dataset ARFF no encontrado. Usando datos de demostración.")
                self._data = self._generate_demo_data()
        except Exception as e:
            logger.error(f"Error cargando dataset: {e}. Usando datos de demostración.")
            self._data = self._generate_demo_data()
        
        return self._data, self._test_data
    
    def _generate_demo_data(self):
        """
        Genera datos de demostración que simulan el dataset NSL-KDD 2009.
        Dataset real: 125,973 registros de conexiones de red clasificadas como
        Normal (normal) o Anomalía (anomaly) con ataques diversos.
        """
        np.random.seed(42)
        n_samples = 5000  # Demo con 5000 registros
        
        # Protocolo de red (tcp, udp, icmp)
        protocols = np.random.choice(['tcp', 'udp', 'icmp'], n_samples, p=[0.7, 0.2, 0.1])
        
        # Servicio (http, ssh, ftp, etc.)
        services = np.random.choice(['http', 'ssh', 'ftp', 'dns', 'smtp'], n_samples, p=[0.4, 0.3, 0.15, 0.1, 0.05])
        
        # Duración de la conexión (en segundos)
        duration = np.random.exponential(scale=50, size=n_samples)
        
        # Bytes enviados/recibidos
        src_bytes = np.random.exponential(scale=1000, size=n_samples)
        dst_bytes = np.random.exponential(scale=1000, size=n_samples)
        
        # Banderas de red (S0, S1, SF, REJ, etc.)
        flags = np.random.choice(['S0', 'S1', 'SF', 'REJ', 'SH'], n_samples, p=[0.1, 0.2, 0.6, 0.05, 0.05])
        
        # Clases: Normal vs Anomalía
        # En el dataset real: 67% Normal, 33% Ataques
        class_labels = np.random.choice(['normal', 'anomaly'], n_samples, p=[0.67, 0.33])
        
        # Características adicionales simuladas
        land = np.random.choice([0, 1], n_samples, p=[0.95, 0.05])  # Conexión a mismo host
        wrong_fragment = np.random.choice([0, 1], n_samples, p=[0.98, 0.02])
        urgent = np.random.choice([0, 1], n_samples, p=[0.99, 0.01])
        
        data = pd.DataFrame({
            'protocol_type': protocols,
            'service': services,
            'duration': duration,
            'src_bytes': src_bytes,
            'dst_bytes': dst_bytes,
            'flag': flags,
            'land': land,
            'wrong_fragment': wrong_fragment,
            'urgent': urgent,
            'hot': np.random.randint(0, 20, n_samples),
            'num_compromised': np.random.randint(0, 5, n_samples),
            'root_shell': np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
            'su_attempted': np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
            'num_root': np.random.randint(0, 10, n_samples),
            'num_file_creations': np.random.randint(0, 50, n_samples),
            'num_shells': np.random.randint(0, 5, n_samples),
            'num_access_files': np.random.randint(0, 20, n_samples),
            'num_outbound_cmds': np.random.randint(0, 10, n_samples),
            'is_host_login': np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
            'is_guest_login': np.random.choice([0, 1], n_samples, p=[0.99, 0.01]),
            'count': np.random.randint(1, 100, n_samples),
            'srv_count': np.random.randint(1, 100, n_samples),
            'serror_rate': np.random.uniform(0, 1, n_samples),
            'srv_serror_rate': np.random.uniform(0, 1, n_samples),
            'rerror_rate': np.random.uniform(0, 1, n_samples),
            'srv_rerror_rate': np.random.uniform(0, 1, n_samples),
            'same_srv_rate': np.random.uniform(0, 1, n_samples),
            'diff_srv_rate': np.random.uniform(0, 1, n_samples),
            'srv_diff_host_rate': np.random.uniform(0, 1, n_samples),
            'dst_host_count': np.random.randint(1, 255, n_samples),
            'dst_host_srv_count': np.random.randint(1, 255, n_samples),
            'dst_host_same_srv_rate': np.random.uniform(0, 1, n_samples),
            'dst_host_diff_srv_rate': np.random.uniform(0, 1, n_samples),
            'dst_host_same_src_port_rate': np.random.uniform(0, 1, n_samples),
            'dst_host_srv_diff_host_rate': np.random.uniform(0, 1, n_samples),
            'dst_host_serror_rate': np.random.uniform(0, 1, n_samples),
            'dst_host_srv_serror_rate': np.random.uniform(0, 1, n_samples),
            'dst_host_rerror_rate': np.random.uniform(0, 1, n_samples),
            'dst_host_srv_rerror_rate': np.random.uniform(0, 1, n_samples),
            'class': class_labels,
        })
        
        self._data = data
        return data

def get_dataset():
    """Obtener instancia del dataset"""
    loader = DatasetLoader()
    return loader.load_dataset()
