import Car from '../../src/Domains/Car';
import ICar from '../../src/Interfaces/ICar';

const id = '63319d80feb9f483ee823ac5';

const carInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  buyValue: 15,
  status: true,
  doorsQty: 4,
  seatsQty: 5,
};

const carOutput: Car = new Car({
  model: 'Marea',
  year: 2002,
  color: 'Black',
  buyValue: 15,
  status: true,
  doorsQty: 4,
  seatsQty: 5,
  id,
});

const carInputWithoutStatus: ICar = {
  model: 'Gol',
  year: 1996,
  color: 'Green',
  buyValue: 8,
  doorsQty: 2,
  seatsQty: 5,
};

const carOutputWithoutStatus: Car = new Car({
  model: 'Gol',
  year: 1996,
  color: 'Green',
  buyValue: 8,
  doorsQty: 2,
  seatsQty: 5,
  id: '64370f7ae747b6d0fd175026',
});

const updatedCarInput = { ...carInputWithoutStatus, status: true };

const updateCar = { id, ...updatedCarInput };

const cars: Car[] = [carOutput, carOutputWithoutStatus];

const invalidCarInput = {
  year: 2002,
  color: 'Black',
  buyValue: 15,
  status: true,
  doorsQty: 4,
  seatsQty: 5,
};

export {
  carInput,
  carOutput,
  carOutputWithoutStatus,
  carInputWithoutStatus, 
  cars, 
  id, 
  updateCar, 
  updatedCarInput,
  invalidCarInput,
};