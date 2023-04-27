import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';

const carList: ICar[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

const carInput = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const carOutput = {
  id: '6449af04fb7a26f0bb4c537f',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};
    
describe('Testar o endpoint /cars', function () {
  it('Testa se e possivel adicionar um carro', async function () {
    // Arrange
    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.addNewCar(carInput);

    // Assert
    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Testa se retorna a lista com todos os carros', async function () {
    // Arrange
    const allCars: Car[] = carList.map((item) => new Car(item));
    sinon.stub(Model, 'find').resolves(allCars);

    // Act
    const service = new CarService();
    const result = await service.findAllCars();

    // Assert
    expect(result).to.be.deep.equal(allCars);

    sinon.restore();
  });

  it('Testa se retorna carro pelo id', async function () {
    // Arrange
    sinon.stub(Model, 'findById').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.findByIdCar('6449af04fb7a26f0bb4c537f');

    // Assert
    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Testa se faz o update do carro pelo id', async function () {
    // Arrange
    sinon.stub(Model, 'findOneAndUpdate').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.updateCarById('6449af04fb7a26f0bb4c537f', carInput);

    // Assert
    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });
});
