import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async addNewCar() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.addNewCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      return this.next(error);
    }
  }

  public async findAllCars() {
    try {
      const allCars: ICar[] | null = await this.service.findAllCars();

      if (allCars) {
        const cars = allCars.map((car) => ({
          id: car.id,
          model: car.model,
          year: car.year,
          color: car.color,
          status: car.status,
          buyValue: car.buyValue,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty,
        }));
        return this.res.status(200).json(cars);
      }
      return this.res.status(200).json(allCars);
    } catch (error) {
      return this.next(error);
    }
  }

  public async findByIdCar() {
    try {
      const { id } = this.req.params;

      const car: ICar | null = await this.service.findByIdCar(id);

      return this.res.status(200).json({
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      });
    } catch (error) {
      return this.next(error);
    }
  }

  public async updateCarById() {
    try {
      const { id } = this.req.params;

      const car: ICar | null = await this.service.updateCarById(id, this.req.body);

      return this.res.status(200).json({
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      });
    } catch (error) {
      return this.next(error);
    }
  }

  public async deleteCarById() {
    try {
      const { id } = this.req.params;

      await this.service.deleteCarById(id);

      return this.res.status(204).end();
    } catch (error) {
      return this.next(error);
    }
  }
}

export default CarController;