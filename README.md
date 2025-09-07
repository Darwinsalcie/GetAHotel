# GetAHotel 🏨

Una aplicación web moderna para encontrar hoteles cercanos utilizando servicios de geolocalización.

## 🚀 Características

- **Búsqueda por geolocalización**: Encuentra hoteles cercanos automáticamente basándose en tu ubicación
- **Interfaz intuitiva**: Diseño minimalista y fácil de usar
- **Autenticación segura**: Sistema de usuarios con OAuth 2.0
- **Gestión de ubicaciones**: Administra y guarda ubicaciones favoritas
- **Información detallada**: Datos relevantes de hoteles con interfaz clara

## 🛠️ Stack Tecnológico

### Frontend
- **React.js** - Aplicación SPA moderna
- **JavaScript/HTML5/CSS3** - Tecnologías web estándar

### Backend  
- **.NET Core** - API wrapper para servicios de geocoding
- **OAuth 2.0** - Autenticación y autorización
- **RESTful API** - Arquitectura de servicios

### Servicios Externos
- **Geocoding API** - Servicios de geolocalización

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (v14+)
- .NET Core SDK
- Clave de API de geocoding

### Frontend (React)
```bash
# Clonar repositorio
git clone https://github.com/Darwinsalcie/GetaHotel.git
cd GetaHotel

# Instalar dependencias del frontend
npm install

# Ejecutar en modo desarrollo
npm start
```

### Backend (.NET)
```bash
# Navegar al directorio del API
cd api

# Restaurar paquetes NuGet
dotnet restore

# Ejecutar la API
dotnet run
```

## 🌐 Uso

1. **Registrarse/Iniciar sesión** con OAuth 2.0
2. **Permitir geolocalización** para búsquedas automáticas
3. **Explorar hoteles** cercanos con información detallada
4. **Gestionar ubicaciones** favoritas en tu perfil

## 🔧 API Endpoints

```
GET /api/hotels/nearby?lat={lat}&lng={lng} - Hoteles cercanos
POST /api/auth/login - Autenticación
GET /api/user/locations - Ubicaciones del usuario
POST /api/user/locations - Agregar ubicación
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## 👨‍💻 Autor

**Darwin Salcié** - [GitHub](https://github.com/Darwinsalcie)

ScreenShoots:
<img width="1449" height="688" alt="image" src="https://github.com/user-attachments/assets/363cd4cd-5845-4c90-8ae2-e573a81f2a1a" />


---

⭐ ¡Dale una estrella si este proyecto te ayudó!
