import { app } from '../../../app';
import request from 'supertest';

let endPointUrl = '/tasks/';

describe(endPointUrl, () => {
  let firstTask;

  //   it('should success GET', async () => {
  //     const response = await request(app).get(endPointUrl);
  //     firstTask = response.body[0];

  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toBeTruthy();
  //     expect(response.body.length).toBeGreaterThanOrEqual(1);
  //   });

  //   it('should success GET by id', async () => {
  //     const response = await request(app).get(endPointUrl + firstTask.id);

  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toBeTruthy();
  //     expect(response.body.length).toBeGreaterThanOrEqual(1);
  //   });

  it('should success POST', async () => {
    const response = await request(app).post(endPointUrl).send({ title: '1', description: '1' });

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});
