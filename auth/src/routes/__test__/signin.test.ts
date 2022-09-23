import request from 'supertest';
import {app} from '../../app';

it('fails when provide email password thats not exit', async()=>{
    return request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@app.com',
                password: 'password'
            })
            .expect(400)
})

it('fails when incorrect password provide', async()=>{
    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@app.com',
                password: 'password'
            })
            .expect(201)

    await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test1@app.com',
                password: 'sfsdf'
            })
            .expect(400)
    
})

it('response with a cookie when valid credentials provide', async()=>{
    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@app.com',
                password: 'password'
            })
            .expect(201)

    const response = await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@app.com',
                password: 'password'
            })
            .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
})