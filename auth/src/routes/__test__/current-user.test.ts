import request from 'supertest';
import { app } from '../../app';

it('return current user info', async () => {

   const cookie = await global.signin();

   const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send({})
      .expect(200)

   expect(response.body.currentUser.email).toEqual('test@app.com');
})

it('response null if not authenticate', async () => {
   const response = await request(app)
      .get('/api/users/currentuser')
      .send({})
      .expect(200)

   expect(response.body.currentUser).toEqual(null);
})