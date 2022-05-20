import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  findByCarId(car_id: string): Promise<CarImage[]>;
  deleteImageByName(image_name: string): Promise<void>;
}

export { ICarsImagesRepository };
