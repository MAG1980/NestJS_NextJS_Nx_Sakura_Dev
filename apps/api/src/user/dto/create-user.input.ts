import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString, MinLength } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsString()
  //Для строковых полей не требуется указывать тип GraphQL
  @Field()
  name: string

  @IsEmail()
  @Field()
  email: string

  @IsString()
  @MinLength(3)
  @Field()
  password: string
}
