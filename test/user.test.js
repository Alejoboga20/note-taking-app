const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userId = new mongoose.Types.ObjectId();
const user = {
  _id: userId,
  name: 'Test',
  email: 'testemail@test.com',
  password: 'Testing123!',
  tokens: [
    {
      token: jwt.sign({ _id: userId }, process.env.JWT_SECRET)
    }
  ]
};

const { name, email, password, tokens } = user;

beforeEach(async () => {
  await User.deleteMany();
  await new User(user).save();
});

afterEach(async () => {
  await User.deleteMany();
});

test('Should sign up a new user', async () => {
  const newUser = {
    name: 'newTest',
    email: 'newTestEmail@email.com',
    password: 'newTest123!'
  };
  const response = await request(app).post('/users').send(newUser).expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test('Should not signup a new user with no email', async () => {
  const newUser = {
    name: 'newTest',
    password: 'newTest123!'
  };
  const response = await request(app).post('/users').send(newUser).expect(400);
});

test('Should not signup a new user with password as password', async () => {
  const newUser = {
    name: 'newTest',
    email: 'newTestEmail@email.com',
    password: 'password'
  };
  const response = await request(app).post('/users').send(newUser).expect(400);
});

test('Login Successful with existing user', async () => {
  const response = await request(app).post('/users/login').send({ email, password }).expect(200);
  const user = await User.findById(userId);
  expect(response.body.token).toMatch(user.tokens[1].token);
});

test('Should not Login with wrong credentials', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({ email, password: 'fakePass' })
    .expect(400);
});

test('Should read user data', async () => {
  const response = await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body).toEqual({ name, email });
});

test('Should not read user data without authorization', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not delete account for user  without authorization', async () => {
  await request(app).delete('/users/me').send().expect(401);
});
