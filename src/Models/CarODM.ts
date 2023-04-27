import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import VehicleODM from './AbstractODM';

class CarODM extends VehicleODM<ICar> {
  // private schema: Schema;
  // private model: Model<ICar>;

  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    const carsModel = 'cars';
    super(schema, carsModel);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async findAllCars(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findByIdCar(id: string): Promise<ICar | null> {
    if (id) {
      return this.model.findById(id);
    }
    return null;
  }

  public async updateCarById(id: string, car: ICar): Promise<ICar | null> {
    if (id) {
      return this.model.findOneAndUpdate({ _id: id }, { ...car }, { new: true });
    }
    return null;
  }

  public async deleteCarById(id: string): Promise<ICar | null> {
    if (id) {
      return this.model.findByIdAndDelete(id);
    }
    return null;
  }
}

export default CarODM;