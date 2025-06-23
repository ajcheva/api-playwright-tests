import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Tests', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com'; 

  test('GET /posts should return 100 posts', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`); 
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts.length).toBe(100);
  });

  test('POST /posts should create a new post', async ({ request }) => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    const response = await request.post(`${baseURL}/posts`, { 
      data: newPost,
    });

    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data).toMatchObject(newPost);
    expect(data).toHaveProperty('id');
  });

  test('PUT /posts/1 should update a post', async ({ request }) => {
    const updateData = {
      id: 1,
      title: 'updated title',
      body: 'updated body',
      userId: 1,
    };

    const response = await request.put(`${baseURL}/posts/1`, { 
      data: updateData,
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toMatchObject(updateData);
  });

  test('DELETE /posts/1 should delete a post', async ({ request }) => {
    const response = await request.delete(`${baseURL}/posts/1`); 
    expect(response.status()).toBe(200);
  });
});
