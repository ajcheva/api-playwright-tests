import { test, expect, request, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { UserSchema } from '../schemas/user-schema';



console.log('🔑 TOKEN USADO:', process.env.GOREST_TOKEN);

let apiContext: APIRequestContext;
let createdUserId: number;



const API_TOKEN = process.env.GOREST_TOKEN!;
if (!API_TOKEN) {
  throw new Error('❌ El token GOREST_TOKEN no está definido en el archivo .env');
}

test.describe('CRUD completo con Bearer Token - GoRest', () => {

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://gorest.co.in', 
      extraHTTPHeaders: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'PlaywrightTestRunner',
      },
    });
  });

  test.afterAll(async () => {
    if (createdUserId) {
      const deleteResponse = await apiContext.delete(`/public/v2/users/${createdUserId}`);
      console.log(`🗑️ Usuario ${createdUserId} eliminado. Status:`, deleteResponse.status());
    }
    await apiContext.dispose();
  });

  test('POST /public/v2/users - Crea un nuevo usuario', async () => {
    const newUser = {
      name: 'Usuario Test Playwright',
      gender: 'female',
      email: `playwright_${Date.now()}@example.com`,
      status: 'active',
    };

    const response = await apiContext.post('/public/v2/users', { data: newUser });
    const status = response.status();
    if (status !== 201) {
      const body = await response.text();
      console.error('❌ Fallo al crear usuario:\n', body);
    }

    expect(status).toBe(201);
    const data = await response.json();
    expect(data).toMatchObject(newUser);
    createdUserId = data.id;
    console.log('✅ Usuario creado con ID:', createdUserId);
  });

  test('GET /public/v2/users/:id - Verifica datos del usuario creado', async () => {
  const response = await apiContext.get(`/public/v2/users/${createdUserId}`);
  const status = response.status();

  if (status !== 200) {
    const body = await response.text();
    console.error('❌ Error al obtener usuario por ID:\n', body);
  }

  expect(status).toBe(200);

  const user = await response.json();

  // ✅ NUEVO: Validación completa del esquema
  const parsedUser = UserSchema.parse(user);

  // 🔎 Aserción adicional (opcional)
  expect(parsedUser.id).toBe(createdUserId);
});


  test('GET /public/v2/users - Lista incluye al usuario creado', async () => {
    const response = await apiContext.get('/public/v2/users');
    const status = response.status();
    if (status !== 200) {
      const body = await response.text();
      console.error('❌ Error al obtener usuarios:\n', body);
    }

    expect(status).toBe(200);
    const users = await response.json();
    const found = users.some((u: any) => u.id === createdUserId);
    expect(found).toBe(true);
  });

  test('PUT /public/v2/users/:id - Actualiza nombre del usuario', async () => {
  const updatedUser = {
    name: 'Usuario Modificado Playwright',
  };

  const response = await apiContext.put(`/public/v2/users/${createdUserId}`, {
    data: updatedUser,
  });

  const status = response.status();
  if (status !== 200) {
    const body = await response.text();
    console.error('❌ Fallo al actualizar usuario:\n', body);
  }

  expect(status).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty('name', updatedUser.name);
  console.log('✏️ Usuario actualizado:', data.name);
});

test('DELETE /public/v2/users/:id - Elimina usuario creado', async () => {
  const response = await apiContext.delete(`/public/v2/users/${createdUserId}`);
  const status = response.status();

  if (status !== 204) {
    const body = await response.text();
    console.error('❌ Error al eliminar usuario:\n', body);
  }

  expect(status).toBe(204);
  console.log('🗑️ Usuario eliminado correctamente');
});

});
