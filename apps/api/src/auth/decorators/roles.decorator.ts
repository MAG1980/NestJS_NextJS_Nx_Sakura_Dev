import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY } from '../constants'
import { Role } from '../../user/enums/role.enum'

/**
 * Добавляет к объекту запроса свойство, содержащее массив ролей,
 * наличие которых в дальнейшем будет проверять @RoleGuard().
 * @param roles
 * @constructor
 */
export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata(ROLES_KEY, roles)
