import { app } from '../../../app';
import request from 'supertest';
import { ExceptionType } from '../../../exception/exception';

let endPointUrl = '/tasks/';

describe(endPointUrl, () => {
  let firstTask;

  describe(`GET ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app).get(endPointUrl);
      firstTask = response.body[0];

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe(`GET by id ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app).get(endPointUrl + firstTask.id);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe(`POST ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app).post(endPointUrl).send({ title: '1', description: '1' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure', async () => {
      const response = await request(app).post(endPointUrl).send({ title: ' ', description: ' ' });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
    });
  });

  describe(`PUT ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app)
        .put(endPointUrl + firstTask.id)
        .send({ title: '1', description: '1' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure', async () => {
      const response = await request(app)
        .put(endPointUrl + firstTask.id)
        .send({ title: ' ', description: ' ' });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
    });
  });

  describe(`DELETE ${endPointUrl}`, () => {
    it('should success', async () => {
      const response = await request(app).delete(endPointUrl + firstTask.id);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });
});
