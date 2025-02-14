import { Role } from '../../user/enums/role.enum'

export type JwtUser = {
  userId: number
  role: Role
}
