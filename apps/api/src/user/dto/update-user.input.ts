import { Field, InputType, PartialType } from '@nestjs/graphql'
import { SignUpInput as CreateUserInput } from '../../auth/dto/sign-up.input'
import { Role } from '../enums/role.enum'
import { IsEnum, IsOptional } from 'class-validator'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsOptional()
  @IsEnum(Role)
  @Field(() => Role, { nullable: true })
  role?: Role
}
