# Frontend – Portfolio en React

Este proyecto es el frontend de mi portfolio personal, desarrollado en React.

## Conexión con el backend

El frontend consume dos variantes de API:

- `api.js`: conecta con funciones serverless desplegadas en Supabase.
- `api-local.js`: conecta con el backend Express corriendo localmente.

## Funcionalidades

- Visualización de secciones: About, Experience, Projects, Skills, Contact.
- Envío de mensajes desde el formulario de contacto.
- Panel de administración con login por email y contraseña.

## Desarrollo local

Para testear funcionalidades como envío de mails o encriptación, usar `api-local.js` y correr el backend Express en `localhost:3001`.

## Producción

En producción se usa `api.js`, que invoca funciones HTTP desplegadas en Supabase.

