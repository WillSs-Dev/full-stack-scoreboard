import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/match.model';
import HTTPCodes from '../utils/HTTPCodes';
import { matches, matchesInProgress } from './mocks/match.mock';
import { test, describe } from 'mocha';
import IMatch from '../interfaces/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests of match route', () => {
  afterEach(sinon.restore);
  test('The /matches route fetches all teams on the database', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matches as IMatch[]);

    const res = await chai.request(app).get('/matches');

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.be.deep.equal(matches);
  });
  test("You can search the matches filtering by whether it's in progress or not", async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matches as IMatch[]);

    const res = await chai.request(app).get('/matches?inProgress=true');

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.be.deep.equal(matchesInProgress);
  });
});