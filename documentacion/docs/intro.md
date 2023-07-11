---
sidebar_position: 1
---

# Introduccion al sistema de Gestion de Activos

un sistema de manejo de activos fijos bajo plataforma web diseñado para facilitar el seguimiento, control y administración utilizando microservicios, que permita adaptarse al contexto de una institución en un corto período de tiempo y sea altamente adaptable y fácilmente configurable para una entidad

## Primer paso para la creacion de activos

Para comenzar necesitamos instalar algunas herramientas

## Creacion del rpoyecto

En este proyecto se trabajo utilizando un template para la creacion de todo el contenido que tendremos.

## HERRAMIENTAS

- [React.js] es una biblioteca de JavaScript muy popular y potente que se utiliza para construir interfaces de usuario interactivas
- [Next.js] Es un framework popular de React.js que se utiliza para construir aplicaciones web, incluyendo sitios estáticos y de renderizado del lado del servidor (SSR)
- [Typescript] Es un lenguaje de programacion construido a un nivel
- [Axios] Es una biblioteca de JavaScript que se utiliza para realizar solicitudes HTTP desde el navegador o desde Node.js. Proporciona una interfaz fácil de usar para enviar solicitudes y manejar respuestas de forma asincrónica.

```bash
 npm install axios

```

## Como inicial el proyecto

Tenemos la carpeta de nuestro proyecto llamado Sistema-de-Activos:

```bash
 cd Sistema-de-Activos
```

Abrir con VisualCode

```bash
  code .
```

primero se instalara todas las dependencias con :

```bash
 npm install
```

Al tener abierto nuestro proyecto, abrir el terminal

```bash
 npm run dev
```

Donde el sistio web se abrira de manera local **http://localhost:3000/** listo para que se vea el proyecto

Create a file at `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react'
import Layout from '@theme/Layout'

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  )
}
```

A new page is now available at [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).
