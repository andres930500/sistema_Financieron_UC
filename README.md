# SAPFIAI - Sistema Financiero (Frontend)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)

## 📋 Descripción Profesional

**SAPFIAI** es la interfaz moderna del Sistema Financiero de la Universidad de Caldas. Se trata de una Single Page Application (SPA) de alto rendimiento diseñada bajo el paradigma de **Feature-Driven Architecture**, garantizando un código escalable, mantenible y desacoplado.

Esta UI ha sido optimizada para consumir servicios robustos en **.NET 8 Core**, implementando patrones de seguridad avanzados y una experiencia de usuario (UX) fluida.

---

## 🏗️ Arquitectura y Buenas Prácticas

El proyecto no es una simple carpeta de componentes; sigue una estructura de **Arquitectura Limpia** adaptada al ecosistema Frontend:

* **Feature-Driven Design:** Cada dominio de negocio (Auth, Dashboard, Reportes) tiene su propia lógica, componentes y servicios aislados.
* **Separación de Responsabilidades:**
    * `@shared`: Componentes de UI "tontos" (Atómicos) sin lógica de negocio.
    * `@features`: Componentes "inteligentes" que gestionan datos y eventos.
* **State Management Eficiente:** Uso de **Zustand** para un estado global ligero, evitando el prop-drilling y sobrecarga de re-renders.
* **Tipado Estricto:** Implementación de interfaces exhaustivas para asegurar contratos de datos con el Backend.

---

## 🛠️ Stack Tecnológico

| Herramienta | Función |
| :--- | :--- |
| **React 18** | Biblioteca base para la UI |
| **TypeScript** | Superconjunto de JS para desarrollo robusto |
| **Vite** | Bundler de última generación para carga instantánea |
| **Zustand** | Gestión de estado global (Auth, UI State) |
| **Tailwind CSS** | Estilizado basado en utilidades y Responsive Design |
| **React Router 6** | Manejo de navegación y rutas protegidas (RBAC) |
| **Axios** | Cliente HTTP con interceptores para tokens JWT |

---

## 📁 Estructura del Proyecto (Alias configurados)

Para evitar rutas relativas complejas (`../../`), el proyecto utiliza alias de ruta:

```text
src/
├── core/               # Providers, configuración de Axios y Router
├── features/           # Módulos por dominio de negocio (Lógica Smart)
│   ├── auth/           # Login, Recuperación, Registro
│   └── dashboard/      # Métricas y vistas financieras
├── shared/             # UI Kit y utilidades universales (Lógica Dumb)
│   ├── components/     # Botones, Inputs, Cards reutilizables
│   ├── hooks/          # Custom hooks genéricos
│   └── types/          # Definiciones de tipos globales
├── store/              # Stores de Zustand (Global State)
└── assets/             # Recursos estáticos (Imágenes, SVG)

Instalación y Desarrollo
Clonar el repositorio:

Bash
git clone [https://github.com/TU_USUARIO/SistemaFinancieroUcaldas_Frontend.git](https://github.com/TU_USUARIO/SistemaFinancieroUcaldas_Frontend.git)
Instalar dependencias:

Bash
npm install
Configurar Variables de Entorno:
Crea un archivo .env en la raíz con la URL de la API:

Fragmento de código
VITE_API_BASE_URL=[https://api.tusistema.com](https://api.tusistema.com)
Lanzar entorno de desarrollo:

Bash
npm run dev
🔐 Seguridad e Integración
Route Guarding: Implementación de un componente PrivateRoute que verifica la persistencia del estado en el useAuthStore antes de permitir el acceso.

Interceptores HTTP: Cada petición saliente adjunta automáticamente el Bearer Token si el usuario está autenticado.

Clean Architecture (Backend): Diseñado para trabajar en conjunto con APIs de .NET Core siguiendo patrones CQRS y MediatR.

📄 Licencia
Este proyecto está bajo la Licencia MIT.
