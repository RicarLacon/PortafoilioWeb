# Portafolio web

Portafolio profesional bilingüe construido con HTML, CSS y JavaScript y publicado como sitio estático en GitHub Pages.

## Funcionalidades

- Contenido disponible en español e inglés.
- Preferencia de idioma conservada en el navegador.
- Descarga del CV correspondiente mediante rutas estáticas compatibles con GitHub Pages.
- Formulario de contacto y acceso directo a WhatsApp.
- Diseño adaptable a computadoras y dispositivos móviles.

## Publicación principal

GitHub Pages publica el `index.html` ubicado en la raíz del repositorio. El cambio de idioma y la selección del CV se realizan completamente en JavaScript, por lo que el sitio publicado no depende de un servidor de aplicaciones.

Los archivos descargados son:

- `frontend/CV/Imagen web ES.pdf` para español.
- `frontend/CV/Imagen web ENG.docx.pdf` para inglés.

## Backend de referencia

El proyecto ASP.NET Core se conserva en `backend/Api`. Incluye los endpoints `/api/cv/es` y `/api/cv/en` y puede ejecutarse localmente, pero el sitio publicado en GitHub Pages no depende de ellos.

## Ejecutar localmente

Se requiere el SDK de .NET 8 o una versión posterior compatible.

```powershell
dotnet run --project .\backend\Api\Api.csproj
```

Después, abra `http://localhost:5093` en el navegador. Este modo permite revisar el backend, aunque no es necesario para utilizar la versión estática.

## Compilar

```powershell
dotnet build .\backend\Api\Api.csproj
```
