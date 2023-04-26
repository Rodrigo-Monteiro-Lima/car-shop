import Motorcycle from '../../src/Domains/Motorcycle';
import IMotorcycle from '../../src/Interfaces/IMotorcycle';

const id = '64382149f84413b71bc61d01';

const motorcycleInput: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  buyValue: 30,
  status: true,
  category: 'Street',
  engineCapacity: 600,
};

const motorcycleOutput: Motorcycle = new Motorcycle({
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  buyValue: 30,
  status: true,
  category: 'Street',
  engineCapacity: 600,
  id,
});

const motorcycleInputWithoutStatus: IMotorcycle = {
  model: 'Honda Bros',
  year: 2012,
  color: 'Red',
  buyValue: 15.8,
  category: 'Street',
  engineCapacity: 160,
};

const motorcycleOutputWithoutStatus: Motorcycle = new Motorcycle({
  model: 'Honda Bros',
  year: 2012,
  color: 'Red',
  buyValue: 15.8,
  category: 'Street',
  engineCapacity: 160,
  id: '6438213df84413b71bc61cff',
});

const invalidMotorcycleInput = {
  year: 2005,
  color: 'Yellow',
  buyValue: 30,
  status: true,
  category: 'Street',
  engineCapacity: 600,
};

const updatedMotorcycleInput = { ...motorcycleInputWithoutStatus, status: true };

const updateMotorcycle = { id, ...updatedMotorcycleInput };

const motorcycles: Motorcycle[] = [motorcycleOutput, motorcycleOutputWithoutStatus];

export { 
  id, 
  motorcycleInput, 
  motorcycleOutput, 
  motorcycleInputWithoutStatus, 
  motorcycleOutputWithoutStatus, 
  updateMotorcycle, 
  updatedMotorcycleInput, 
  motorcycles, 
  invalidMotorcycleInput };
