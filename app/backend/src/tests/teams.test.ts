import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import HTTPCodes from '../utils/HTTPCodes';
import { teams } from './mocks/teams.mock';
import TeamModel from '../database/models/Team.model';

import { test, describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests of the teams route', () => {
  afterEach(sinon.restore);
  test('The /teams route fetches all teams on the database', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);

    const res = await chai.request(app).get('/teams');

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.be.deep.equal(teams);
  })
  test('The /teams/:id route fetches the correct specified team', async () => {
    const res = await chai.request(app).get('/teams/5');

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.be.deep.equal(teams[4]);
  })
});
