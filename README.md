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

http://localhost:3001

---

## Despliegue en Vercel

La aplicación se encuentra desplegada en la plataforma Vercel, lo que permite su acceso desde cualquier dispositivo con conexión a internet.

###  URL del proyecto:




---

##  Funcionalidades implementadas

* Autenticación de usuario mediante API REST
* Consumo de endpoints protegidos con token JWT
* Almacenamiento del token en el navegador
* Protección de rutas privadas
* Proxy interno para evitar problemas de CORS
* Interfaz moderna y responsiva

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


<img width="1600" height="915" alt="image" src="https://github.com/user-attachments/assets/dd99b971-a600-4a10-9a9b-4fb3e8aeff3d" />

### Dashboard

<img width="1486" height="849" alt="image" src="https://github.com/user-attachments/assets/ea04d5c0-0378-472c-a645-9698def6044f" />

### Kardex
<img width="1542" height="815" alt="image" src="https://github.com/user-attachments/assets/8fdbea88-29d9-437e-8c62-ac9614209594" />

### Horario
<img width="1377" height="850" alt="image" src="https://github.com/user-attachments/assets/6d77e0f1-a3e4-4142-8524-db9b7d0b9924" />

### Calificaciones
<img width="1579" height="334" alt="image" src="https://github.com/user-attachments/assets/c769fa7f-dae0-4e59-a7b8-0fea6fc935d7" />


### Funcionalidad extra

---

##  Notas importantes

* La aplicación requiere credenciales válidas del sistema SII ITC.
* Se implementó un proxy interno para evitar errores de CORS al consumir la API.

---

