# NSL-KDD Dataset Visualization - Dashboard Interactivo

Sistema completo distribuido para visualizar y analizar el dataset NSL-KDD 2009 (detección de intrusiones en redes).

## Tecnologías

- **Backend**: Django REST Framework, Pandas, NumPy, Scikit-Learn → Render
- **Frontend**: Next.js 16, React 19, Recharts, Tailwind CSS → Vercel
- **Arquitectura**: API REST distribuida

## Descripción

API REST + Dashboard interactivo para análisis del dataset NSL-KDD 2009 de detección de intrusiones en redes (IDS - Intrusion Detection System).

### ¿Qué es NSL-KDD 2009?

El dataset NSL-KDD es una versión mejorada del clásico dataset KDD'99. Contiene:
- **125,973 registros** de tráfico de red
- **42 características** diferentes de conexión
- **5 clases**: Normal, DoS, Probing, R2L, U2R

Características principales:
- `duration`: Duración de la conexión
- `protocol_type`: Protocolo (TCP, UDP, ICMP)
- `service`: Servicio (HTTP, FTP, Telnet, etc.)
- `src_bytes` / `dst_bytes`: Bytes origen/destino
- `class`: Etiqueta (normal o ataque)

## Estructura del Proyecto

\`\`\`
proyecto/
├── backend/                 # API Django para Render
│   ├── api/                # Endpoints y lógica
│   │   ├── views.py        # 8 endpoints REST
│   │   ├── analytics.py    # Análisis de datos
│   │   ├── data_loader.py  # Carga del dataset
│   │   └── serializers.py  # Validación
│   ├── config/             # Configuración Django
│   ├── manage.py
│   ├── requirements.txt
│   ├── Procfile
│   └── render.yaml
│
├── frontend/               # Dashboard Next.js para Vercel
│   ├── app/               # Páginas
│   │   ├── page.tsx       # Home con visualizaciones
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/        # Componentes React
│   │   ├── dashboard-overview.tsx    # Tarjetas principales
│   │   ├── data-explanation.tsx      # Documentación interactiva
│   │   ├── visualization-charts.tsx  # Gráficas
│   │   ├── charts/                   # Componentes de gráficas
│   │   └── ui/                       # Componentes de UI (shadcn)
│   ├── package.json
│   ├── vercel.json
│   └── .env.production
│
├── DEPLOYMENT_GUIDE.md     # Instrucciones de despliegue
└── README.md              # Este archivo
\`\`\`

## Instalación Local

### Backend

\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
\`\`\`

Disponible en `http://localhost:8000`

### Frontend (en otra terminal)

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Disponible en `http://localhost:3000`

## Despliegue en Producción

Ver [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) para instrucciones detalladas paso a paso.

### Resumen Rápido

**Backend (Render):**
1. Conecta tu repo en https://render.com
2. Apunta al directorio `backend/`
3. Render usará automáticamente `render.yaml`

**Frontend (Vercel):**
1. Conecta tu repo en https://vercel.com
2. Apunta al directorio `frontend/`
3. Agrega `NEXT_PUBLIC_API_URL` con tu URL de Render

## Endpoints API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/dataset-overview/` | GET | Información general (registros, características, etc.) |
| `/api/statistics/` | GET | Estadísticas: media, mediana, desviación estándar |
| `/api/class-distribution/` | GET | Distribución: Normal vs Anomalía |
| `/api/feature-distributions/` | GET | Distribución de 30+ características |
| `/api/correlation-matrix/` | GET | Matriz de correlación entre variables |
| `/api/anomaly-analysis/` | GET | Comparativa: conexiones normales vs ataques |
| `/api/model-metrics/` | GET | Métricas: Accuracy, Precision, Recall, F1-Score |
| `/api/feature-stats/` | GET | Estadísticas detalladas por característica |

## Dashboard Features

### Información General
- Total de registros en el dataset
- Número de características
- Distribución de clases
- Versión del dataset

### Visualizaciones
- **Pie Chart**: Distribución Normal vs Anomalías
- **Bar Chart**: Estadísticas de 10 características principales
- **Heatmap**: Matriz de correlación
- **Histogramas**: Distribuciones individuales

### Documentación Interactiva
- 42 características explicadas
- Tipos de ataques definidos
- Métricas del modelo interpretadas
- Tooltips en cada sección

## Explicación de Datos

### Dataset Overview
- **Total Records**: Número total de conexiones de red en el dataset
- **Total Features**: Cantidad de atributos medidos por conexión
- **Normal Connections**: % de tráfico legítimo
- **Attack Connections**: % de intentos de intrusión detectados

### Accuracy (96%)
Porcentaje de predicciones correctas del modelo. Indica qué tan bien el modelo identifica conexiones normales y ataques.

### Precision (94%)
De los casos que el modelo predijo como ataque, 94% realmente lo eran. Evita falsos positivos.

### Recall (92%)
De los ataques reales, el modelo detecta 92%. Mide qué tan pocos ataques se escapan sin detectar.

### F1-Score (93%)
Balance entre Precision y Recall. Métrica armónica que considera ambas.

## Ejemplos de Uso

### cURL
\`\`\`bash
# Info del dataset
curl https://tu-api.onrender.com/api/dataset-overview/

# Estadísticas
curl https://tu-api.onrender.com/api/statistics/

# Distribución de clases
curl https://tu-api.onrender.com/api/class-distribution/
\`\`\`

### JavaScript
\`\`\`javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener datos
const response = await fetch(`${API_URL}/dataset-overview/`);
const data = await response.json();
console.log(data);
\`\`\`

### Python
\`\`\`python
import requests

API_URL = 'https://tu-api.onrender.com/api'

response = requests.get(f'{API_URL}/dataset-overview/')
print(response.json())
\`\`\`

## Características Principales

✅ **8 Endpoints Especializados**: Análisis completo del dataset
✅ **Dashboard Interactivo**: Visualizaciones profesionales con Recharts
✅ **Documentación Integrada**: Tooltips y secciones explicativas
✅ **Responsive Design**: Funciona en desktop y móvil
✅ **API REST Completa**: CORS habilitado
✅ **Datos de Ejemplo**: Funciona sin archivos ARFF
✅ **Logging Detallado**: Seguimiento de errores
✅ **Listo para Producción**: Configs para Render y Vercel

## Limitaciones Conocidas

- Solo captura correlaciones lineales
- Dataset de ejemplo es sintético
- Render free tier duerme si no hay actividad
- Sin autenticación (agregar en producción)

## Próximas Mejoras

- [ ] Cargar datos reales desde ARFF
- [ ] Agregar autenticación JWT
- [ ] Cache con Redis
- [ ] Análisis de componentes principales (PCA)
- [ ] Exportar reportes
- [ ] Tests unitarios

## Licencia

MIT

## Contacto

Para preguntas o bugs, abre un issue en GitHub.
