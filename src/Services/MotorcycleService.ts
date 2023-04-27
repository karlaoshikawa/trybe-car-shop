import { isValidObjectId } from 'mongoose';
import Motorcycles from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Errors from '../Middlewares/helper/errors';
import MotorcycleODM from '../Models/MotorcycleODM';

const invalid = 'Invalid mongo id';
const motorcycleNotFound = 'Motorcycle not found';

class MotorcycleService {
  public addMotorcycle(motorcycle: IMotorcycle | null): Motorcycles | null {
    if (motorcycle) {
      return new Motorcycles(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.createMotorcycle(motorcycle);
    return this.addMotorcycle(result);
  }

  public async findAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.findAllMotorcycles();
    return result;
  }

  public async findByIdMotorcycle(id: string) {
    const motorcycleODM = new MotorcycleODM();

    if (!isValidObjectId(id)) throw new Errors(422, invalid);

    const car = await motorcycleODM.findByIdMotorcycle(id);
    if (!car) throw new Errors(404, motorcycleNotFound);
    return car;
  }

  public async updateMotorcycleById(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();

    if (!isValidObjectId(id)) throw new Errors(422, invalid);

    const result = await motorcycleODM.updateMotorcycleById(id, motorcycle);
    if (!result) throw new Errors(404, motorcycleNotFound);
    return result;
  }

  public async deleteMotorcycleById(id: string) {
    const motorcycleODM = new MotorcycleODM();

    if (!isValidObjectId(id)) throw new Errors(422, invalid);
    const hasCar = await motorcycleODM.findByIdMotorcycle(id);
    if (!hasCar) throw new Errors(404, motorcycleNotFound);
    await motorcycleODM.deleteMotorcycleById(id);
  }
}

export default MotorcycleService;