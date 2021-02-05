const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const Note = require('../src/models/note');
const User = require('../src/models/user');

const userId = new mongoose.Types.ObjectId();
const user = {
  _id: userId,
  name: 'TestNoteUser',
  email: 'testnoteemail@test.com',
  password: 'Testing123!',
  tokens: [
    {
      token: jwt.sign({ _id: userId }, process.env.JWT_SECRET)
    }
  ]
};

const note = {
  title: 'Existing Test Note Title',
  body: 'Existing Test Note Body',
  owner: userId
};

const newNote = {
  title: 'Test Title',
  body: 'Test Body'
};

beforeEach(async () => {
  await User.deleteMany();
  await Note.deleteMany();
  await new User(user).save();
  await new Note(note).save();
});

afterEach(async () => {
  await User.deleteMany();
  await Note.deleteMany();
});

test('Should create a note', async () => {
  const response = await request(app)
    .post('/notes')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send(newNote)
    .expect(201);
});

test('Should get Notes by user', async () => {
  const response = await request(app)
    .get('/notes')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send()
    .expect(200);
});
