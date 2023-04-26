import chai, { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import chaiAsPromised from 'chai-as-promised';
import CarService from '../../../src/Services/car.service';
import CarODM from '../../../src/Models/CarODM';
import CarValidation from '../../../src/Services/validations/carValidations';
import { 
  carInput, 
  carInputWithoutStatus, 
  carOutput, 
  carOutputWithoutStatus, 
  cars, 
  id,
  updateCar,
  updatedCarInput } from '../../mocks/car.mock';

chai.use(chaiAsPromised);

const model = new CarODM();
const validation = new CarValidation();
const service = new CarService(model, validation);
const notFound = 'Car not found';
const invalidId = 'Invalid mongo id';

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
    afterEach(function () {
      sinon.restore();
    });
    it('Should return a car successfully', async function () {
      sinon.stub(Model, 'findById').resolves(carOutput);
      const result = await service.getById(id);
      expect(result).to.be.deep.equal(carOutput);
    });
    it('Should return an error when a invalid car id is sent', async function () {
      return expect(service.getById('12312312321')).to.be.rejectedWith(invalidId);
    });
    it('Should return an error when the car does not exists', async function () {
      sinon.stub(Model, 'findById').resolves(null);
      return expect(service.getById(id)).to.be.rejectedWith(notFound);
    });
  });
  describe('Updating a car', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should return the updated car', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(updateCar);
      const result = await service.update(id, updatedCarInput);
      expect(result).to.be.deep.equal(updateCar);
    });
    it('Should return an error when a invalid id is sent', async function () {
      return expect(service.update('12312312321', updatedCarInput)).to.be
        .rejectedWith(invalidId);
    });
    it('Should return an error when the car does\'nt exists', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      return expect(service.update(id, updatedCarInput)).to.be.rejectedWith(notFound);
    });
  });
  describe('Deleting a car', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should delete the car', async function () {
      sinon.stub(Model, 'findByIdAndDelete').resolves(carOutput);
      return expect(service.delete(id)).to.not.be.rejected;
    });
    it('Should return an error when a invalid id is sent', async function () {
      return expect(service.delete('12312312321')).to.be.rejectedWith(invalidId);
    });
    it('Should return an error when the car does not exists', async function () {
      sinon.stub(Model, 'findByIdAndDelete').resolves(null);
      return expect(service.delete(id)).to.be.rejectedWith(notFound);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});