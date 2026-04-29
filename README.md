# 🎓 SII ITC Celaya — Portal Estudiantil

Sistema web para consumo de la API del SII del Tecnológico Nacional de México en Celaya.

![TecNM Celaya](public/images/encabezado.jpg)

---

## 📋 Descripción

Portal estudiantil que permite a los alumnos del TecNM Celaya autenticarse con sus credenciales institucionales y acceder a:

- **Perfil del estudiante** — Datos personales, foto (actualizable) y estadísticas
- **Calificaciones** — Materias con filtro en tiempo real y semáforo de desempeño
- **Kardex** — Historial académico agrupado por semestre
- **Horario** — Clases organizadas por día
- **Croquis del Campus** — Mapa interactivo GPS de Campus 1 y Campus 2

---

## 🛠️ Tecnología Elegida: **Next.js 14**

| Característica | Beneficio |
|---|---|
| App Router (RSC) | Renderizado en servidor, rutas automáticas |
| API Routes integradas | Backend y frontend en un solo proyecto |
| TypeScript nativo | Tipado seguro en toda la app |
| Tailwind CSS | Diseño rápido con utilidades |
| Deployable en Vercel | Deploy con un click sin configuración extra |

---

## ⚙️ Instalación en Laragon (Windows)

### Prerrequisitos

- [Laragon](https://laragon.org/download/) instalado (incluye Node.js)
- [Node.js 18+](https://nodejs.org/) — verificar con `node -v`
- [Git](https://git-scm.com/)

### Pasos

```bash
# 1. Clonar el repositorio
cd C:/laragon/www
git clone https://github.com/tu-usuario/sii-itc.git
cd sii-itc

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env.local

# 4. Ejecutar en desarrollo
npm run dev
```

La app estará disponible en: **http://localhost:3000**

### Laragon con dominio local (opcional)

Laragon puede servir el proyecto en `http://sii-itc.test`:

1. Abrir Laragon → Menu → Apache → Sites-enabled → Agregar virtual host
2. Apuntar al directorio del proyecto
3. O simplemente usar `npm run dev` y abrir `http://localhost:3000`

---

## 🚀 Deploy en Vercel

### Opción 1: GitHub + Vercel (recomendado)

```bash
# 1. Crear repo en GitHub y subir el proyecto
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/sii-itc.git
git push -u origin main

# 2. En Vercel:
# - Ir a https://vercel.com/new
# - Importar el repositorio
# - Framework: Next.js (auto-detectado)
# - Click en "Deploy"
```

### Opción 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Variables de entorno en Vercel

No se requieren variables adicionales. La API del SII se proxea internamente.

---

## 📁 Estructura del Proyecto

```
sii-itc/
├── src/
│   ├── app/
│   │   ├── login/           # Página de inicio de sesión
│   │   ├── dashboard/
│   │   │   ├── page.tsx     # Perfil del estudiante
│   │   │   ├── calificaciones/
│   │   │   ├── kardex/
│   │   │   ├── horario/
│   │   │   ├── campus/      # Croquis GPS
│   │   │   └── layout.tsx   # Layout con sidebar
│   │   └── api/
│   │       ├── login/       # Proxy de autenticación
│   │       └── proxy/       # Proxy para endpoints SII
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx  # Menú lateral
│   │   │   └── Header.tsx   # Encabezado con logos
│   │   └── dashboard/
│   │       └── MapView.tsx  # Mapa Leaflet
│   ├── lib/
│   │   └── api.ts           # Cliente HTTP + token JWT
│   └── types/
│       └── index.ts         # Tipos TypeScript
├── public/images/           # Logos del TEC
└── vercel.json
```

---

## 🔒 Seguridad

- El token JWT se almacena en `localStorage` del navegador
- Las rutas del dashboard están protegidas: redirigen a `/login` si no hay token
- Las peticiones a la API del SII se realizan vía proxy interno (`/api/proxy`) para evitar exposición directa
- Manejo de token expirado: redirección automática al login con status 401

---

## 📡 API Reference — SII ITC Celaya

**Base URL:** `https://sii.celaya.tecnm.mx/api`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/login` | Autenticación → Token JWT | Email + Password |
| GET | `/api/movil/estudiante` | Perfil del estudiante | Bearer Token |
| GET | `/api/movil/estudiante/calificaciones` | Calificaciones del periodo | Bearer Token |
| GET | `/api/movil/estudiante/kardex` | Historial académico completo | Bearer Token |
| GET | `/api/movil/estudiante/horarios` | Horario del semestre | Bearer Token |

### Ejemplo de autenticación

```http
POST https://sii.celaya.tecnm.mx/api/login
Content-Type: application/json

{
  "email": "usuario@itcelaya.edu.mx",
  "password": "tu_contraseña"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Uso del token

```http
GET https://sii.celaya.tecnm.mx/api/movil/estudiante
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗺️ Funcionalidad Adicional: Croquis del Campus GPS

**Propuesta:** Mapa interactivo con ubicación GPS del usuario y los dos campus del TecNM Celaya.

**Justificación:** Los estudiantes de nuevo ingreso, visitantes y personal docente frecuentemente tienen dificultad para ubicar salones, laboratorios y edificios específicos. Este módulo:

- Muestra la ubicación GPS en tiempo real del usuario
- Señala Campus 1 (principal) y Campus 2 (laboratorios) en el mapa
- Calcula la distancia desde la posición del usuario a cada campus
- Permite alternar entre campus con animación de vuelo en el mapa
- Usa OpenStreetMap (sin costo) vía Leaflet

**Tecnología:** React Leaflet + OpenStreetMap + Geolocation API

---

## 🎨 Diseño

Paleta de colores oficial del TecNM Celaya:

| Color | Hex | Uso |
|-------|-----|-----|
| Verde institucional | `#006633` | Sidebar, bordes, acentos |
| Verde claro | `#009944` | Hover, badges de aprobado |
| Azul institucional | `#003F8A` | Header, títulos |
| Blanco | `#FFFFFF` | Fondo de tarjetas |

---

## 👥 Equipo

- [Nombre 1] — Frontend / Login
- [Nombre 2] — Dashboard / Calificaciones
- [Nombre 3] — Kardex / Horario
- [Nombre 4] — Campus GPS / Deploy

---

## 📸 Capturas de Pantalla

> *(Agregar capturas del sistema funcionando)*

---

## 📄 Licencia

Proyecto académico — TecNM Campus Celaya, ISC — 2024

LINUX 
# Opción 1 - En tu carpeta home
cd ~/proyectos
unzip sii-itc.zip
cd sii-itc
npm install
npm run dev
bash# Opción 2 - Si usas el equivalente de Laragon en Linux (Laragon no existe en Linux)
# Usa directamente Node.js
cd ~
unzip sii-itc.zip
cd sii-itc
npm install
npm run dev

Prerrequisitos en Linux
bash# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm git unzip -y

# Verificar versión (necesitas Node 18+)
node -v
npm -v
Si tienes Node viejo, instala la versión correcta con nvm:
bashcurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

Para Vercel desde Linux
bashcd sii-itc
npm i -g vercel
vercel        # primera vez, te pide login con GitHub
vercel --prod # publicar
