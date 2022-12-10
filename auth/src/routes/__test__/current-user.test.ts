import request from 'supertest';
import { app } from '../../app';

it('respond with user details of current user.', async () => {
    const cookie = await global.signin()
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send().expect(200)
    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('current user null  - not logged in.', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send().expect(200)
    expect(response.body.currentUser).toBeNull();
});
