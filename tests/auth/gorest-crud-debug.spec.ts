import { test, expect, request, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

console.log('🔑 TOKEN USADO:', process.env.GOREST_TOKEN);

let apiContext: APIRequestContext;
let createdUserId: number;

const API_TOKEN = process.env.GOREST_TOKEN!;

if (!API_TOKEN) {
  throw new Error('❌ El token GOREST_TOKEN no está definido en el archivo .env');
}

test.describe('CRUD debug con Bearer Token - GoRest', () => {

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://gorest.co.in',
      extraHTTPHeaders: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'PlaywrightTestRunner'
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

  test('POST /public/v2/users - Crea un nuevo usuario (debug)', async () => {
    const newUser = {
      name: 'Usuario Test Playwright',
      gender: 'female',
      email: `pwtest+${Math.random().toString(36).slice(2)}@example.com`, // ✅ email único
      status: 'active',
    };

    const response = await apiContext.post('/public/v2/users', {
      data: newUser,
    });

    const status = response.status();
    const contentType = response.headers()['content-type'];
    const body = await response.text();

    console.log('📡 Status:', status);
    console.log('📦 Content-Type:', contentType);
    console.log('📄 Body:', body.slice(0, 500));

    expect(status).toBe(201);

    const data = JSON.parse(body);
    expect(data).toMatchObject(newUser);

    createdUserId = data.id;
    console.log('✅ Usuario creado con ID:', createdUserId);
  });
});
