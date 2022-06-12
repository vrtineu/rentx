import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  public async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  public async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const allAvailable = this.cars.filter((car) => car.available);

    if (brand || category_id || name) {
      allAvailable.filter(
        (car) =>
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)
      );
    }

    return allAvailable;
  }

  public async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }

  public async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
