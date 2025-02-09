import { registerEnumType } from '@nestjs/graphql'

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

//Регистрируем Enum в GraphQL
registerEnumType(Role, { name: 'Role', description: 'User roles' })
