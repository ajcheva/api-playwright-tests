# API Playwright Tests

Este repositorio contiene un conjunto de pruebas automatizadas para evaluar el funcionamiento de dos APIs públicas:  
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (sin autenticación)
- [GoRest](https://gorest.co.in/public/v2/users) (con autenticación Bearer)

Las pruebas están construidas con [Playwright Test](https://playwright.dev/test) en [TypeScript](https://www.typescriptlang.org/), e incluyen casos para los principales métodos HTTP: `GET`, `POST`, `PUT`, `DELETE`.

---

## 🧠 Qué contiene este proyecto

- `tests/api.spec.ts`: pruebas básicas con JSONPlaceholder
- `tests/auth/gorest-crud.spec.ts`: pruebas con autenticación Bearer JWT sobre GoRest
- `tests/auth/gorest-crud-debug.spec.ts`: variante de debug para inspeccionar errores y contenido de respuestas
- `schemas/user-schema.ts`: esquema de validación de usuarios con Zod
- `.env`: archivo con tu token privado de GoRest
- `playwright.config.ts`: configuración global del entorno de pruebas
- `package.json`: scripts útiles para ejecutar tests
- Reportes generados automáticamente en `playwright-report/`

---

## 🛠️ Requisitos

- Node.js v16 o superior
- npm v8+
- Git
- Cuenta gratuita en [GoRest](https://gorest.co.in/) para obtener un token de acceso (Bearer Token)
- Visual Studio Code (opcional pero recomendado)

---

## 📦 Instalación

```bash
git clone https://github.com/ajcheva/api-playwright-tests.git
cd api-playwright-tests
npm install
```

---

## 🔐 Configuración del Token GoRest

Crear un archivo `.env` en la raíz del proyecto:

```bash
touch .env
```

Agregar tu token Bearer (válido y generado desde GoRest):

```env
GOREST_TOKEN=tu_token_aqui
```

---

## 🚀 Comandos disponibles

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con reporte HTML
npm run test:report

# Ejecutar solo pruebas con GoRest (CRUD completo con token)
npm run test:gorest

# Ejecutar pruebas de depuración (debug)
npm run test:debug
```

---

## 📁 Estructura del proyecto

```
api-playwright-tests/
├── node_modules/
├── playwright-report/
├── test-results/
├── tests/
│   ├── api.spec.ts
│   └── auth/
│       ├── gorest-crud.spec.ts
│       └── gorest-crud-debug.spec.ts
├── schemas/
│   └── user-schema.ts
├── .env
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

---

## 🧾 Licencia

MIT © ajcheva
