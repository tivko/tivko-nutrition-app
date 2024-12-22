import { Role } from '../enums/role.enum';

type User = {
  id?: string;
  userName: string;
  roles: Role;
};
export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}
