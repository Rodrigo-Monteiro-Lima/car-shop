import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/car.service';
import CarODM from '../../../src/Models/CarODM';
import CarValidation from '../../../src/Services/validations/carValidations';
import { 
  carInput, 
  carInputWithoutStatus, 
  carOutput, 
  carOutputWithoutStatus, 
  cars, 
  id } from '../../mocks/car.mock';

const model = new CarODM();
const validation = new CarValidation();
const service = new CarService(model, validation);

describe('Testing Car service', function () {
  describe('Creating a car', function () {
    it('When status is sent', async function () {
      sinon.stub(Model, 'create').resolves(carOutput);
      const result = await service.create(carInput);
      expect(result).to.be.deep.equal(carOutput);
    });
    it('When status isn\'t sent', async function () {
      sinon.stub(Model, 'create').resolves(carOutputWithoutStatus);
      const result = await service.create(carInputWithoutStatus);
      expect(result).to.haveOwnProperty('status');
      expect(result).to.be.deep.equal(carOutputWithoutStatus);
    });
  });
  describe('Getting cars', function () {
    it('Should return all cars', async function () {
      sinon.stub(Model, 'find').resolves(cars);
      const result = await service.getAll();
      expect(result).to.be.deep.equal(cars);
    });
  });
  describe('Getting a car', function () {
    it('Should return a car successfully', async function () {
      sinon.stub(Model, 'findById').resolves(carOutput);
      const result = await service.getById(id);
      expect(result).to.be.deep.equal(carOutput);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});