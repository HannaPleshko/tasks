import request from 'supertest';
import { app } from '../../../app';
import { ExceptionType } from '../../../exception/exception';

const endPointUrl = '/auth/';

describe(endPointUrl, () => {
  const [login, password] = ['testUserName', 'testUserPassword'];

  describe(`POST ${endPointUrl}register`, () => {
    it('should success', async () => {
      const response = await request(app)
        .post(endPointUrl + '/register')
        .send({ login: login, password: password });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure with register in validDataUser Title or Description are missing!', async () => {
      const response = await request(app)
        .post(endPointUrl + '/register')
        .send({ login: ' ', password: ' ' });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
    });
  });

  describe(`POST ${endPointUrl}login`, () => {
    it('should success', async () => {
      const response = await request(app)
        .post(endPointUrl + '/login')
        .send({ login: login, password: password });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should failure with login in validDataUser Title or Description are missing!', async () => {
      const response = await request(app)
        .post(endPointUrl + '/login')
        .send({ login: ' ', password: ' ' });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
    });
  });

  describe(`POST ${endPointUrl}logout`, () => {
    it('should success', async () => {
      const oldToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjY5LCJpYXQiOjE2MzQxMjUzMTksImV4cCI6MTYzNDEyODkxOX0.gyFOYeLk5zCCCo_LOy7s8OJayEblo2pDQwtrSFSLUwY';
      const modifiedToken = 'Bearer';

      const response = await request(app)
        .post(endPointUrl + '/logout')
        .set('Authorization', oldToken);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(modifiedToken).toBe(response.header.authorization);
    });
  });

  describe(`DELETE ${endPointUrl}delUser`, () => {
    it('should success', async () => {
      process.env.NODE_ENV = 'DEV';
      const response = await request(app)
        .delete(endPointUrl + '/delUser')
        .send({ login: login });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });
});
