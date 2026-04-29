# Portal Estudiantil SII ITC

Aplicación web desarrollada para consumir los servicios REST del sistema SII ITC, permitiendo a los estudiantes autenticarse y visualizar su información académica de forma dinámica.

---

##  Tecnologías utilizadas

El proyecto fue desarrollado utilizando **Next.js 14+**, un framework basado en React que permite crear aplicaciones web modernas con renderizado híbrido.

###  Características principales:

* App Router (enrutamiento basado en carpetas)
* API Routes integradas (backend dentro del mismo proyecto)
* Uso de Fetch API para consumo de servicios REST
* Tailwind CSS para diseño responsivo
* Manejo de autenticación mediante JWT

---

##  Instalación y ejecución

Sigue estos pasos para ejecutar el proyecto en tu equipo local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sii-app.git
```

### 2. Acceder a la carpeta del proyecto

```bash
cd sii-app
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 5. Abrir en el navegador

http://localhost:3000

---

## Despliegue en Vercel

La aplicación se encuentra desplegada en la plataforma Vercel, lo que permite su acceso desde cualquier dispositivo con conexión a internet.

### 🔗 URL del proyecto:




---

##  Funcionalidades implementadas

* ✔ Autenticación de usuario mediante API REST
* ✔ Consumo de endpoints protegidos con token JWT
* ✔ Almacenamiento del token en el navegador
* ✔ Protección de rutas privadas
* ✔ Proxy interno para evitar problemas de CORS
* ✔ Interfaz moderna y responsiva

---

##  Consumo de API

La aplicación consume directamente la API oficial del SII ITC:

* POST /api/login → Autenticación
* GET /api/movil/estudiante → Información del estudiante
* GET /api/movil/estudiante/calificaciones → Calificaciones
* GET /api/movil/estudiante/kardex → Historial académico
* GET /api/movil/estudiante/horarios → Horario

---

## Capturas de pantalla

### Login



### Dashboard

<img width="1600" height="915" alt="image" src="https://github.com/user-attachments/assets/dd99b971-a600-4a10-9a9b-4fb3e8aeff3d" />


---

##  Notas importantes

* La aplicación requiere credenciales válidas del sistema SII ITC.
* Se implementó un proxy interno para evitar errores de CORS al consumir la API.

---

