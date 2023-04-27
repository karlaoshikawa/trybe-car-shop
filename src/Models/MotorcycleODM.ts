import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import VehicleODM from './AbstractODM';

class MotorcycleODM extends VehicleODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    const modelName = 'motorcycles';
    super(schema, modelName);
  }

  public async createMotorcycle(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }

  public async findAllMotorcycles(): Promise<IMotorcycle[]> {
    return this.model.find();
  }

  public async findByIdMotorcycle(id: string): Promise<IMotorcycle | null> {
    if (id) {
      return this.model.findById(id);
    }
    return null;
  }

  public async updateMotorcycleById(id: string, moto: IMotorcycle): Promise<IMotorcycle | null> {
    if (id) {
      return this.model.findOneAndUpdate({ _id: id }, { ...moto }, { new: true });
    }
    return null;
  }

  public async deleteMotorcycleById(id: string): Promise<IMotorcycle | null> {
    if (id) {
      return this.model.findByIdAndDelete(id);
    }
    return null;
  }
}

export default MotorcycleODM;