### Expo App Boilerplate


#### Introducción
Esto es un boilerplate para comenzar proyectos de expo con los siguientes agregados:

- Push Notification con [Courier](https://app.courier.com/)
- Loggin con [Sentry]()
- Estilos con tawilindcss.


#### Requisitos Previos
- Node.js
- npm o yarn
- Expo CLI
- Un dispositivo móvil con Expo Go o un emulador de iOS/Android

#### Configuración del Entorno
1. Crea un archivo `.env` en la raíz del proyecto.
2. Añade las siguientes variables de entorno al archivo `.env`:

Reemplaza `your-client-key` y `your-sentry-dsn` con tus claves reales.

#### Cambio de Nombre de la App y Configuración de Notificaciones
1. Para cambiar el nombre de la aplicación, actualiza el campo `name` en `app.json`.
2. Para configurar el project ID para las notificaciones, utiliza `eas build`. Este proceso configurará automáticamente el project ID en tu aplicación durante el proceso de construcción.

#### Instalación y Ejecución
1. Clona el repositorio: `git clone [URL del repositorio]`.
2. Instala las dependencias: `npm install` o `yarn install`.
3. Ejecuta la aplicación: `expo start`.

#### Uso
Abre la aplicación en tu dispositivo móvil utilizando Expo Go o en un emulador para explorar sus funcionalidades.
