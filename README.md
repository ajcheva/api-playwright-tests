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

1. Crear un archivo `.env` en la raíz del proyecto:

```bash
touch .env
```

2. Agregar tu token Bearer (válido y generado desde GoRest):

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

## ⚠️ Errores frecuentes

**❌ Error 404 Not Found en GoRest:**

Esto puede deberse a:

- ✅ **RUTA incorrecta:** GoRest exige que la ruta contenga `/public/v2`, incluso si está definida en el `baseURL`.  
  Solución: cambiar el `baseURL` a `https://gorest.co.in` y luego usar rutas absolutas como `/public/v2/users`.

- ✅ **Token inválido:** si la respuesta del servidor es HTML (y no JSON), revisá que tu token esté cargado correctamente en el `.env`.

- ✅ **No usar Accept: application/json:** puede causar que la respuesta no sea parseable como JSON.

---

## ✅ Resultado esperado (con token válido)

```bash
🔑 TOKEN USADO: <tu_token>
✓ POST /public/v2/users - Crea un nuevo usuario
✓ GET /public/v2/users/:id - Verifica datos del usuario creado
✓ GET /public/v2/users - Lista incluye al usuario creado
🗑️ Usuario eliminado correctamente
```

---

## 🧪 Ejemplo de prueba en JSONPlaceholder

```ts
test('GET /posts should return 100 posts', async ({ request }) => {
  const response = await request.get('/posts');
  expect(response.status()).toBe(200);
  const posts = await response.json();
  expect(posts.length).toBe(100);
});
```

---

## 🧭 Próximos pasos (opcional)

- [ ] Añadir pruebas de `PUT` y `DELETE` en GoRest
- [ ] Validación de esquemas con Zod o Joi
- [ ] Integración continua (CI) con GitHub Actions
- [ ] Generar reportes con trazabilidad

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
├── .env
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

---

## 🧾 Licencia

MIT © [ajcheva](https://github.com/ajcheva)
