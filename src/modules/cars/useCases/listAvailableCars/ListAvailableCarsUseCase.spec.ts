import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1202',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const list = await listAvailableCarsUseCase.execute({});

    expect(list).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1202',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: 'category_id',
    });

    const list = await listAvailableCarsUseCase.execute({ brand: car.brand });

    expect(list).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 3',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1202',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: 'category_id',
    });

    const list = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(list).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 4',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1202',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: '441415856156561bbbbddfdd',
    });

    const list = await listAvailableCarsUseCase.execute({
      name: car.category_id,
    });

    expect(list).toEqual([car]);
  });
});
