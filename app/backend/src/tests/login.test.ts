import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/User.model';
import HTTPCodes from '../utils/HTTPCodes';

chai.use(chaiHttp);

const { expect } = chai;

const adminUser = {
  id: 1,
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin',
};

describe('Integration tests of login route', () => {
  afterEach(sinon.restore);
  test("It's possible to login with the correct email and password", async () => {
    sinon.stub(UserModel, 'findAll').resolves([adminUser] as UserModel[]);

    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.deep.equal({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc',
    });
  });
  test("It's not possible to login with invalid login information", async () => {
    sinon.stub(UserModel, 'findAll').resolves([adminUser] as UserModel[]);

    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@not_admin.com', password: 'secret_admin' });

    expect(res.status).to.be.equal(HTTPCodes.authenticationError);
    expect(res.body).to.deep.equal({ message: 'Incorrect email or password' });
  });
  test("It's not possible to login without an email", async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin' });

    expect(res.status).to.be.equal(HTTPCodes.badRequest);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
  });
});
