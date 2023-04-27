import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Errors from '../Middlewares/helper/errors';

const invalid = 'Invalid mongo id';
const carNotFound = 'Car not found';

class CarService {
  public addCar(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async addNewCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.addCar(newCar);
  }

  public async findAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.findAllCars();
    return cars;
  }

  public async findByIdCar(id: string) {
    const carODM = new CarODM();

    if (!isValidObjectId(id)) throw new Errors(422, invalid);

    const car = await carODM.findByIdCar(id);
    if (!car) throw new Errors(404, carNotFound);
    return car;
  }

  public async updateCarById(id: string, car: ICar) {
    const carODM = new CarODM();

    if (!isValidObjectId(id)) throw new Errors(422, invalid);

    const result = await carODM.updateCarById(id, car);
    if (!result) throw new Errors(404, carNotFound);
    return result;
  }

  public async deleteCarById(id: string) {
    const carODM = new CarODM();

    if (!isValidObjectId(id)) throw new Errors(422, invalid);
    const hasCar = await carODM.findByIdCar(id);
    if (!hasCar) throw new Errors(404, carNotFound);
    await carODM.deleteCarById(id);
  }
}

export default CarService;