import request from 'supertest';
import { app } from '../../../app';
import { ExceptionType } from '../../../exception/exception';

const endPointUrl = '/tasks/';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjY5LCJpYXQiOjE2MzQxMjUzMTksImV4cCI6MTYzNDEyODkxOX0.gyFOYeLk5zCCCo_LOy7s8OJayEblo2pDQwtrSFSLUwY';

describe(endPointUrl, () => {
  let firstTask;

  describe(`GET ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app).get(endPointUrl).set('Authorization', token);
      firstTask = response.body[0];

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure Authentication Token is Missing!', async () => {
      const response = await request(app).get(endPointUrl).set('Authorization', 'Bearer');

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.TOKEN_MISSING);
    });
  });

  describe(`GET by id ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app)
        .get(endPointUrl + firstTask.id)
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure Authentication Token is Missing!', async () => {
      const response = await request(app)
        .get(endPointUrl + firstTask.id)
        .set('Authorization', 'Bearer');

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.TOKEN_MISSING);
    });
  });

  describe(`POST ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app).post(endPointUrl).set('Authorization', token).send({ title: '1', description: '1' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure Title or Description are missing', async () => {
      const response = await request(app).post(endPointUrl).set('Authorization', token).send({ title: ' ', description: ' ' });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
    });

    it('should failure Authentication Token is Missing!', async () => {
      const response = await request(app).post(endPointUrl).set('Authorization', 'Bearer').send({ title: '1', description: '1' });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.TOKEN_MISSING);
    });
  });

  describe(`PUT ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app)
        .put(endPointUrl + firstTask.id)
        .set('Authorization', token)
        .send({ title: '1', description: '1' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure Title or Description are missing', async () => {
      const response = await request(app)
        .put(endPointUrl + firstTask.id)
        .set('Authorization', token)
        .send({ title: ' ', description: ' ' });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
    });

    it('should failure Authentication Token is Missing!', async () => {
      const response = await request(app)
        .put(endPointUrl + firstTask.id)
        .set('Authorization', 'Bearer')
        .send({ title: '1', description: '1' });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.TOKEN_MISSING);
    });
  });

  describe(`DELETE ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app)
        .delete(endPointUrl + firstTask.id)
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure Authentication Token is Missing!', async () => {
      const response = await request(app)
        .delete(endPointUrl + firstTask.id)
        .set('Authorization', 'Bearer');

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.TOKEN_MISSING);
    });
  });
});
