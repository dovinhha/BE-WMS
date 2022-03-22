import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { UserRegisterRequest } from '@components/auth/dto/request/user-register.request';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public createEntity(request: UserRegisterRequest): UserEntity {
    const user = new UserEntity();
    user.phone = request.phone;
    user.email = request.email;
    user.fullname = request.fullname;
    user.gender = request.gender;
    user.password = request.password;
    return user;
  }
}
