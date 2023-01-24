import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/match.model';
import HTTPCodes from '../utils/HTTPCodes';
import {
  matches,
  matchesInProgress,
  newMatch,
  newMatchResponse,
  pastMatches,
} from './mocks/match.mock';
import { test, describe } from 'mocha';
import IMatch from '../interfaces/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests of match route', () => {
  afterEach(sinon.restore);
  test('The /matches route fetches all matches on the database', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matches as IMatch[]);

    const res = await chai.request(app).get('/matches');

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.be.deep.equal(matches);
  });
  test('You can search the matches that are in progress', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress as IMatch[]);

    const res = await chai.request(app).get('/matches?inProgress=true');

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.be.deep.equal(matchesInProgress);
  });
  test('You can search the past matches on the DB', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(pastMatches as IMatch[]);

    const res = await chai.request(app).get('/matches?inProgress=false');

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.be.deep.equal(pastMatches);
  });
  test('You can save a match on the DB', async () => {
    sinon.stub(MatchModel, 'create').resolves();

    const res = await chai.request(app).post('/matches').send(newMatch);

    expect(res.status).to.be.equal(HTTPCodes.created);
    expect(res.body).to.be.deep.equal(newMatchResponse);
  });
  test("You can set the 'inProgress' status of a match to false", async () => {
    sinon.stub(MatchModel, 'update').resolves();

    const res = await chai.request(app).patch('/matches/1/finish');

    expect(res.status).to.be.equal(HTTPCodes.ok);
    expect(res.body).to.be.deep.equal({ message: 'Finished' });
  });
});
