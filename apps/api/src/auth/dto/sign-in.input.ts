import { SignUpInput } from './sign-up.input'
import { InputType, PickType } from '@nestjs/graphql'

@InputType()
export class SignInInput extends PickType(
  SignUpInput,
  ['email', 'password'],
  InputType,
) {}
