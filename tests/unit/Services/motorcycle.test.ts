import chai, { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import chaiAsPromised from 'chai-as-promised';
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

chai.use(chaiAsPromised);

const model = new MotorcycleODM();
const validation = new MotorcycleValidation();
const service = new MotorcycleService(model, validation);
const notFound = 'Motorcycle not found';
const invalidId = 'Invalid mongo id';

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
    afterEach(function () {
      sinon.restore();
    });
    it('Should return a motorcycle successfully', async function () {
      sinon.stub(Model, 'findById').resolves(motorcycleOutput);
      const result = await service.getById(id);
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
    it('Should return an error when a invalid motorcycle id is sent', async function () {
      return expect(service.getById('12312312321')).to.be.rejectedWith(invalidId);
    });
    it('Should return an error when the motorcycle does\'nt exists', async function () {
      sinon.stub(Model, 'findById').resolves(null);
      return expect(service.getById(id)).to.be.rejectedWith(notFound);
    });
  });
  describe('Updating a motorcycle', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should return the updated motorcycle', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(updateMotorcycle);
      const result = await service.update(id, updatedMotorcycleInput);
      expect(result).to.be.deep.equal(updateMotorcycle);
    });
    it('Should return an error when a invalid id is sent', async function () {
      return expect(service.update('12312312321', updatedMotorcycleInput)).to.be
        .rejectedWith(invalidId);
    });
    it('Should return an error when the motorcycle does not exists', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      return expect(service.update(id, updatedMotorcycleInput)).to.be
        .rejectedWith(notFound);
    });
  });
  describe('Deleting a motorcycle', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Should delete the motorcycle', async function () {
      sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleOutput);
      return expect(service.delete(id)).to.not.be.rejected;
    });
    it('Should return an error when a invalid id is sent', async function () {
      return expect(service.delete('12312312321')).to.be.rejectedWith(invalidId);
    });
    it('Should return an error when the motorcycle does not exists', async function () {
      sinon.stub(Model, 'findByIdAndDelete').resolves(null);
      return expect(service.delete(id)).to.be.rejectedWith(notFound);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});