const request = require('supertest');
const express = require('express');
const rateLimiter = require('./rateLimiter.middleware');

describe('Middleware: rateLimiter', () => {
  let APP;

  beforeEach(() => {
    APP = express();
    APP.use(
      '/api/v1/data',
      // set custom 5 seconds rate limit to avoid long delays during test runs
      rateLimiter({
        rateLimitInMilliseconds: 1 * 5 * 1000, // 5 seconds
        maxRequestsAllowed: 10, // maximum 10 requests (every 5 seconds)
      }),
      // mock response to avoid making too many requests to real DB
      (_, res) =>
        res.status(200).send({ message: 'Data Retrieved Successfully' })
    );
  });

  it('should allow up to 10 requests per minute', async () => {
    for (let i = 0; i < 10; i++) {
      const response = await request(APP).get('/api/v1/data');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Data Retrieved Successfully');
    }
  });

  it('should block requests after 10 requests within 1 minute', async () => {
    // make 10 requests
    for (let i = 0; i < 10; i++) {
      await request(APP).get('/api/v1/data').expect(200);
    }

    // but, 11th request should be rate limited
    const response = await request(APP).get('/api/v1/data');
    expect(response.status).toBe(429);
    expect(response.body.message).toBe(
      'Wooh! Too many requests! 🐌 Slow down and try again in a minute 🙂'
    );
  });

  it('should reset the rate limit after 1 minute', async () => {
    // make 10 requests
    for (let i = 0; i < 10; i++) {
      await request(APP).get('/api/v1/data').expect(200);
    }

    // but, 11th request should be rate limited
    await request(APP).get('/api/v1/data').expect(429);

    // wait 5 seconds (real-time delay) to let the rate limit reset
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // after waiting, a new request should succeed, no rate limit
    const response = await request(APP).get('/api/v1/data');
    expect(response.status).toBe(200); // Should pass after rate limit reset
    expect(response.body.message).toBe('Data Retrieved Successfully');
  });

  it('should return rate limit headers on the first request', async () => {
    const response = await request(APP).get('/api/v1/data');
    expect(response.headers['ratelimit-limit']).toBe('10');
    expect(response.headers['ratelimit-remaining']).toBe('9');
  });
});
