# Portafolio web

Portafolio profesional bilingüe construido con HTML, CSS y JavaScript, servido por una aplicación ASP.NET Core.

## Funcionalidades

- Contenido disponible en español e inglés.
- Preferencia de idioma conservada en el navegador.
- Descarga segura del CV correspondiente mediante una API en C# y .NET.
- Formulario de contacto y acceso directo a WhatsApp.
- Diseño adaptable a computadoras y dispositivos móviles.

## Ejecutar localmente

Se requiere el SDK de .NET 8 o una versión posterior compatible.

```powershell
dotnet run --project .\backend\Api\Api.csproj
```

Después, abra `http://localhost:5093` en el navegador. El sitio debe ejecutarse desde ASP.NET Core para que las rutas de descarga `/api/cv/es` y `/api/cv/en` estén disponibles.

## Compilar

```powershell
dotnet build .\backend\Api\Api.csproj
```
