const request = require('supertest');

const APP = `http://localhost:${process.env.PORT || 9000}`;

describe('API: All Endpoints', () => {
  let TEST_DATA = null;

  it('should return healthcheck status message', async () => {
    const response = await request(APP).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to Rest API Starter!');
  });

  it('should create a new data entry into database', async () => {
    const newData = {
      type: '___TEST___',
      data: { name: 'Bob Myers', email: 'bob.myers@example.com' },
      metadata: { description: '___DELETE_ASAP___' },
    };

    const response = await request(APP)
      .post('/api/v1/data')
      .send(newData)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Data Creation: SUCCESS 🚀');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.type).toBe(newData.type);
    expect(response.body.data.data).toEqual(newData.data);

    // store created data for future tests
    console.log(JSON.stringify(response.body.data, null, 2));
    TEST_DATA = response.body.data;
  });

  it('should retrieve all data of `type=___TEST___` from database', async () => {
    const response = await request(APP).get('/api/v1/data?type=___TEST___');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Data Retrieval By Type: SUCCESS 🚀');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(1);
  });

  it('should retrieve data by ID from database', async () => {
    const response = await request(APP).get(`/api/v1/data/${TEST_DATA.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Data Retrieval By Id: SUCCESS 🚀');
    expect(response.body.data.id).toBe(TEST_DATA.id);
    expect(response.body.data.type).toBe(TEST_DATA.type);
  });

  it('should update data by ID inside database', async () => {
    const updatedData = {
      type: '___TEST___',
      data: { name: 'Kevin Myers', email: 'kevin.myers@example.com' },
      metadata: { description: '___DELETE_ASAP___' },
    };

    const response = await request(APP)
      .patch(`/api/v1/data/${TEST_DATA.id}`)
      .send(updatedData)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Data Update By Id: SUCCESS 🚀');
    expect(response.body.data.id).toBe(TEST_DATA.id);
    expect(response.body.data.type).toBe(TEST_DATA.type);
    expect(response.body.data.data).toEqual(updatedData.data);
  });

  it('should delete data by ID from database', async () => {
    const response = await request(APP).delete(`/api/v1/data/${TEST_DATA.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Data Deletion By Id: SUCCESS 🚀');
    expect(response.body.data.id).toBe(TEST_DATA.id);
  });
});
