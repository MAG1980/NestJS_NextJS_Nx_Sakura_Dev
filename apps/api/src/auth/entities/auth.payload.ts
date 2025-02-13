import { Role } from '../../user/enums/role.enum'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthPayload {
  @Field(() => Int)
  userId: number

  @Field(() => Role)
  role: Role

  @Field()
  accessToken: string
}
