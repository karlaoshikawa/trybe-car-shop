import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';

import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

const motoOutput: IMotorcycle = {
  id: '6449b4d1fb7a26f0bb4c5381',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const motoInput: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

describe('Testar o endpoint /motorcycle', function () {
  it('Testa se e possivel addicionar uma moto com sucesso', async function () {
    // Arrange
    sinon.stub(Model, 'create').resolves(motoOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.createMotorcycle(motoInput);

    // Assert
    expect(result).to.be.deep.equal(motoOutput);

    sinon.restore();
  });

  it('Testa se retorna a lista com todos os carros', async function () {
    // Arrange
    sinon.stub(Model, 'find').resolves([motoOutput]);

    // Act
    const service = new MotorcycleService();
    const result = await service.findAllMotorcycles();

    // Assert
    expect(result).to.be.deep.equal([motoOutput]);

    sinon.restore();
  });

  it('Testa se retorna carro pelo id', async function () {
    // Arrange
    sinon.stub(Model, 'findById').resolves(motoOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.findByIdMotorcycle('6449af04fb7a26f0bb4c537f');

    // Assert
    expect(result).to.be.deep.equal(motoOutput);

    sinon.restore();
  });

  it('Testa se faz o update do moto pelo id', async function () {
    // Arrange
    sinon.stub(Model, 'findOneAndUpdate').resolves(motoOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.updateMotorcycleById('6449b4d1fb7a26f0bb4c5381', motoInput);

    // Assert
    expect(result).to.be.deep.equal(motoOutput);

    sinon.restore();
  });
});
