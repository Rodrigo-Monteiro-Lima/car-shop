import chai, { expect } from 'chai';
import chaiHtpp from 'chai-http';
import sinon from 'sinon';
import { Model } from 'mongoose';
import app from '../../../src/app';
import { 
  id, 
  invalidMotorcycleInput,
  motorcycleInput, 
  motorcycleOutput, 
  motorcycles, 
  updateMotorcycle, 
  updatedMotorcycleInput } from '../../mocks/motorcycle.mock';

chai.use(chaiHtpp);

const invalidErrorId = 'Should return status 422 when id is invalid';
const invalidIdUrl = '/motorcycles/12312312321';
const invalidMongoId = 'Invalid mongo id';

const route = '/motorcycles';

describe('Testing motorcycle controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Posting a motorcycle', function () {
    it('create a motorcycle successfully', async function () {
      sinon.stub(Model, 'create').resolves(motorcycleOutput);
      const response = await chai.request(app).post(route).send(motorcycleInput);
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(motorcycleOutput);
    });
    it('Should return status 400 when any field is missing', async function () {
      const response = await chai.request(app).post(route).send(invalidMotorcycleInput);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: '"model" is required' });
    });
  });
  describe('Listing motorcycles', function () {
    it('Should return status 200 and motorcycles list', async function () {
      sinon.stub(Model, 'find').resolves(motorcycles);
      const response = await chai.request(app).get(route);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(motorcycles);
    });
  });
  describe('Listing a motorcycle', function () {
    it('Should return status 200 and motorcycle', async function () {
      sinon.stub(Model, 'findById').resolves(motorcycleOutput);
      const response = await chai.request(app).get(`/motorcycles/${id}`);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(motorcycleOutput);
    });
    it(invalidErrorId, async function () {
      const response = await chai.request(app).get(invalidIdUrl);
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: invalidMongoId });
    });
  });
  describe('Updating a motorcycle', function () {
    it('Should return status 200 and updated motorcycle', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(updateMotorcycle);
      const response = await chai.request(app).put(`/motorcycles/${id}`)
        .send(updatedMotorcycleInput);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(updateMotorcycle);
    });
    it(invalidErrorId, async function () {
      const response = await chai.request(app).put(invalidIdUrl)
        .send(updatedMotorcycleInput);
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: invalidMongoId });
    });
  });
  describe('Deleting a motorcycle', function () {
    it('Should return status 204', async function () {
      sinon.stub(Model, 'findByIdAndDelete').resolves(updateMotorcycle);
      const response = await chai.request(app).delete(`/motorcycles/${id}`);
      expect(response.status).to.be.equal(204);
    });
    it(invalidErrorId, async function () {
      const response = await chai.request(app).delete(invalidIdUrl);
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: invalidMongoId });
    });
  });
});