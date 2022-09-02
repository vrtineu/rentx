import { instanceToInstance } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    avatar,
    driver_license,
    email,
    id,
    name,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      avatar,
      driver_license,
      email,
      id,
      name,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
