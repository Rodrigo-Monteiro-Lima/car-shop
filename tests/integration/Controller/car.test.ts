import chai, { expect } from 'chai';
import chaiHtpp from 'chai-http';
import sinon from 'sinon';
import { Model } from 'mongoose';
import app from '../../../src/app';
import { 
  carInput, 
  carOutput, 
  cars, 
  id, 
  updateCar,
  invalidCarInput,
  updatedCarInput } from '../../mocks/car.mock';

chai.use(chaiHtpp);

describe('Testing car controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Posting a car', function () {
    it('create a car successfully', async function () {
      sinon.stub(Model, 'create').resolves(carOutput);
      const response = await chai.request(app).post('/cars').send(carInput);
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(carOutput);
    });
    it('Should return status 404 when any field is missing', async function () {
      const response = await chai.request(app).post('/cars').send(invalidCarInput);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'model is required' });
    });
  });
  describe('Listing cars', function () {
    it('Should return status 200 and cars list', async function () {
      sinon.stub(Model, 'find').resolves(cars);
      const response = await chai.request(app).get('/cars');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(cars);
    });
  });
  describe('Listing a car', function () {
    it('Should return status 200 and car', async function () {
      sinon.stub(Model, 'findById').resolves(carOutput);
      const response = await chai.request(app).get(`/cars/${id}`);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(carOutput);
    });
  });
  describe('Updating a car', function () {
    it('Should return status 200 and updated car', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(updateCar);
      const response = await chai.request(app).put(`/cars/${id}`).send(updatedCarInput);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(updateCar);
    });
  });
  describe('Deleting a car', function () {
    it('Should return status 204', async function () {
      sinon.stub(Model, 'findByIdAndDelete').resolves(updateCar);
      const response = await chai.request(app).delete(`/cars/${id}`);
      expect(response.status).to.be.equal(204);
    });
  });
});