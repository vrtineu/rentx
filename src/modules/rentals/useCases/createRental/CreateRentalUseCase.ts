import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  public async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const minHour = 24;
    const carUnavailable = await this.rentalsRepository.findByCarId(car_id);

    if (carUnavailable) {
      throw new AppError('Car not available');
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for this user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minHour) {
      throw new AppError('Expected return date cannot be less than 24 hours');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
