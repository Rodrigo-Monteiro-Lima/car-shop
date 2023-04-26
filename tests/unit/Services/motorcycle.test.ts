import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleValidation from '../../../src/Services/validations/motorcycleValidation';
import MotorcycleService from '../../../src/Services/motorcycle.service';
import { 
  motorcycleOutput, 
  id, 
  motorcycleInput, 
  motorcycleInputWithoutStatus, 
  motorcycleOutputWithoutStatus, 
  motorcycles, 
  updateMotorcycle, 
  updatedMotorcycleInput, 
} from '../../mocks/motorcycle.mock';

const model = new MotorcycleODM();
const validation = new MotorcycleValidation();
const service = new MotorcycleService(model, validation);

describe('Testing Motorcycle service', function () {
  describe('Creating a motorcycle', function () {
    it('When status is sent', async function () {
      sinon.stub(Model, 'create').resolves(motorcycleOutput);
      const result = await service.create(motorcycleInput);
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
    it('When status isn\'t sent', async function () {
      sinon.stub(Model, 'create').resolves(motorcycleOutputWithoutStatus);
      const result = await service.create(motorcycleInputWithoutStatus);
      expect(result).to.haveOwnProperty('status');
      expect(result).to.be.deep.equal(motorcycleOutputWithoutStatus);
    });
  });
  describe('Getting motorcycles', function () {
    it('Should return all motorcycles', async function () {
      sinon.stub(Model, 'find').resolves(motorcycles);
      const result = await service.getAll();
      expect(result).to.be.deep.equal(motorcycles);
    });
  });
  describe('Getting a motorcycle', function () {
    it('Should return a motorcycle successfully', async function () {
      sinon.stub(Model, 'findById').resolves(motorcycleOutput);
      const result = await service.getById(id);
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });
  describe('Updating a motorcycle', function () {
    it('Should return the updated motorcycle', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(updateMotorcycle);
      const result = await service.update(id, updatedMotorcycleInput);
      expect(result).to.be.deep.equal(updateMotorcycle);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});