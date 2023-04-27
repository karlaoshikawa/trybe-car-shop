import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcyclesController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async createMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMoto = await this.service.createMotorcycle(motorcycle);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAllMotorcycles() {
    try {
      const allMotorcycles: IMotorcycle[] | null = await this.service.findAllMotorcycles();

      if (allMotorcycles) {
        const result = allMotorcycles.map((car) => ({
          id: car.id,
          model: car.model,
          year: car.year,
          color: car.color,
          status: car.status,
          buyValue: car.buyValue,
          category: car.category,
          engineCapacity: car.engineCapacity,
        }));
        return this.res.status(200).json(result);
      }
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      return this.next(error);
    }
  }

  public async findByIdMotorcycle() {
    try {
      const { id } = this.req.params;

      const car: IMotorcycle | null = await this.service.findByIdMotorcycle(id);

      return this.res.status(200).json({
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        category: car.category,
        engineCapacity: car.engineCapacity,
      });
    } catch (error) {
      return this.next(error);
    }
  }

  public async updateMotorcycleById() {
    try {
      const { id } = this.req.params;

      const car: IMotorcycle | null = await this.service.updateMotorcycleById(id, this.req.body);

      return this.res.status(200).json({
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        category: car.category,
        engineCapacity: car.engineCapacity,
      });
    } catch (error) {
      return this.next(error);
    }
  }

  public async deleteMotorcycleById() {
    try {
      const { id } = this.req.params;

      await this.service.deleteMotorcycleById(id);

      return this.res.status(204).end();
    } catch (error) {
      return this.next(error);
    }
  }
}

export default MotorcyclesController;