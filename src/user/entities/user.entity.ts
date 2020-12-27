import { CoreEntity } from 'src/common/entities/core.entity';
import { Column } from 'typeorm';

type UserRole = 'client' | 'owner' | 'delivery';

export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
