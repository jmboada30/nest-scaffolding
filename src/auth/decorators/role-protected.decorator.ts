import { SetMetadata } from '@nestjs/common';
import { ValiRoles } from '../interfaces/valid-roles.interface';

export const META_ROLE = 'roles';

export const RoleProtected = (...args: ValiRoles[]) => {
  return SetMetadata(META_ROLE, args);
};
