# Guía Completa de Despliegue - NSL-KDD Dashboard

## Prerrequisitos

- Cuenta en GitHub
- Cuenta en Render (https://render.com)
- Cuenta en Vercel (https://vercel.com)
- Repositorio con backend/ y frontend/ separados

## Paso 1: Preparar el Repositorio

### Estructura correcta

\`\`\`
tu-repo/
├── backend/           # Código Django
├── frontend/          # Código Next.js
├── README.md
└── DEPLOYMENT_GUIDE.md
\`\`\`

### Commit y Push

\`\`\`bash
git add .
git commit -m "Proyecto listo para despliegue"
git push origin main
\`\`\`

## Paso 2: Desplegar Backend en Render

### 2.1 Crear servicio en Render

1. Ve a https://dashboard.render.com
2. Haz clic en **"New"** → **"Web Service"**
3. Selecciona **"Deploy an existing repository"**
4. Conecta tu repositorio de GitHub

### 2.2 Configurar el servicio

**Nombre**: `nsl-kdd-api`

**Root Directory**: `backend` (IMPORTANTE)

**Build Command**: 
\`\`\`
pip install -r requirements.txt
\`\`\`

**Start Command**: 
\`\`\`
gunicorn config.wsgi
\`\`\`

### 2.3 Agregar variables de entorno

En la sección "Environment", agrega:

| Key | Value |
|-----|-------|
| `DEBUG` | `False` |
| `SECRET_KEY` | (Render genera automáticamente) |
| `ALLOWED_HOSTS` | `*` |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` (actualizar después) |

### 2.4 Desplegar

Haz clic en **"Deploy"** y espera ~2 minutos.

Render te mostrará la URL: `https://nsl-kdd-api-xxxx.onrender.com`

**Guarda esta URL**, la necesitarás para el frontend.

## Paso 3: Desplegar Frontend en Vercel

### 3.1 Importar proyecto

1. Ve a https://vercel.com/dashboard
2. Haz clic en **"Add New"** → **"Project"**
3. Selecciona **"Import Git Repository"**
4. Conecta tu repositorio

### 3.2 Configurar el proyecto

**Root Directory**: `frontend` (IMPORTANTE)

**Build Command**: `npm run build` (por defecto)

**Framework**: Next.js (automático)

### 3.3 Agregar variable de entorno

En **"Environment Variables"**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://nsl-kdd-api-xxxx.onrender.com/api` |

⚠️ Usa la URL de Render del Paso 2.4

### 3.4 Desplegar

Haz clic en **"Deploy"** y espera ~3 minutos.

Vercel te mostrará la URL: `https://nsl-kdd-dashboard-xxxx.vercel.app`

## Paso 4: Actualizar CORS en Render

Ahora que tienes la URL de Vercel, actualiza CORS en Render.

### 4.1 Ir al dashboard de Render

1. Ve a https://dashboard.render.com
2. Selecciona tu servicio `nsl-kdd-api`
3. Ve a la pestaña **"Environment"**

### 4.2 Actualizar CORS

Cambia `CORS_ALLOWED_ORIGINS` a tu URL de Vercel:

\`\`\`
https://nsl-kdd-dashboard-xxxx.vercel.app
\`\`\`

Si quieres permitir múltiples orígenes:
\`\`\`
https://nsl-kdd-dashboard-xxxx.vercel.app,http://localhost:3000
\`\`\`

### 4.3 Guardar cambios

Haz clic en **"Save Changes"**. Render reiniciará el servicio automáticamente (~30 segundos).

## Paso 5: Verificar que Funciona

### 5.1 Probar el Backend

Ve a:
\`\`\`
https://nsl-kdd-api-xxxx.onrender.com/api/dataset-overview/
\`\`\`

Deberías ver JSON con los datos del dataset.

### 5.2 Probar el Frontend

Ve a:
\`\`\`
https://nsl-kdd-dashboard-xxxx.vercel.app
\`\`\`

Deberías ver el dashboard cargando las gráficas desde el backend.

### 5.3 Verificar Consola

En tu navegador (F12 → Console), no debe haber errores de CORS.

## URLs Finales

| Componente | URL |
|-----------|-----|
| Frontend | `https://nsl-kdd-dashboard-xxxx.vercel.app` |
| Backend | `https://nsl-kdd-api-xxxx.onrender.com` |
| API | `https://nsl-kdd-api-xxxx.onrender.com/api` |

## Solución de Problemas

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Causa**: CORS no está configurado correctamente

**Solución**:
1. Ve a Render dashboard
2. Verifica que `CORS_ALLOWED_ORIGINS` es tu URL de Vercel
3. Espera 2 minutos a que se reinicie
4. Limpia cache del navegador (Ctrl+Shift+Supr)

### Error: "Cannot reach backend"

**Causa**: Backend está en sleep mode o URL es incorrecta

**Solución**:
1. Ve a `https://nsl-kdd-api-xxxx.onrender.com/api/health/` en otra pestaña
2. Esto "despierta" el servicio
3. Verifica que `NEXT_PUBLIC_API_URL` es correcto
4. Redeploy en Vercel (Settings → Redeploy)

### Error: "404 Not Found" en Dashboard

**Causa**: URL incorrecta en variables de entorno

**Solución**:
1. Ve a Vercel dashboard
2. Project Settings → Environment Variables
3. Verifica `NEXT_PUBLIC_API_URL`
4. Redeploy el proyecto

### Backend muy lento (>5 segundos)

**Causa**: Render free tier duerme si no hay actividad

**Solución**:
- Es normal que la primera solicitud tarde
- Soluciones a largo plazo:
  - Upgrade a Render Starter ($7/mes)
  - Usar Uptime Monitor en Render (mantiene despierto)

## Monitoreo y Mantenimiento

### Monitorear Backend

1. Ve a Render dashboard
2. Selecciona `nsl-kdd-api`
3. Mira "Logs" para errores

### Monitorear Frontend

1. Ve a Vercel dashboard
2. Selecciona el proyecto
3. Mira "Deployments" y "Analytics"

### Actualizar Código

\`\`\`bash
# Hacer cambios locales
git add .
git commit -m "Descripción del cambio"
git push origin main

# Ambos servicios se actualizarán automáticamente
# Render: ~2 minutos
# Vercel: ~3 minutos
\`\`\`

## Checklist Final

- [ ] Backend desplegado en Render sin errores
- [ ] Frontend desplegado en Vercel sin errores
- [ ] CORS configurado correctamente
- [ ] `NEXT_PUBLIC_API_URL` apunta al backend correcto
- [ ] Dashboard carga en Vercel
- [ ] Las gráficas se muestran correctamente
- [ ] No hay errores en Console (F12)
- [ ] API responde en <2 segundos
- [ ] Todos los endpoints funcionan

## URLs de Referencia

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Django REST: https://www.django-rest-framework.org/
- Next.js: https://nextjs.org/docs

## Soporte

Si tienes problemas:
1. Verifica los Logs en Render
2. Verifica los Logs en Vercel
3. Prueba en local primero
4. Abre un issue en GitHub
