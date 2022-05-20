import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  public async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImages = await this.carsImagesRepository.findByCarId(car_id);

    if (carImages.length) {
      carImages.forEach(async (carImage) => {
        await this.carsImagesRepository.deleteImageByName(carImage.image_name);
        await deleteFile(`./tmp/cars/${carImage.image_name}`);
      });
    }

    images_name.map(async (image) =>
      this.carsImagesRepository.create(car_id, image)
    );
  }
}

export { UploadCarImagesUseCase };
