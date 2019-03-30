import { IsEmail, MaxLength, ValidationError, Equals } from 'class-validator';

export class Signup {
  @MaxLength(250, { message: 'The username must be less than 250 charachters'})
  public username: string;

  @MaxLength(72, { message: 'The password should be under 72 characters'})
  public password: string;
  
  @MaxLength(72, { message: 'The password confirmation should be under 72 characters' })
  public passwordConfirm: string;

  @MaxLength(250, { message: 'The email should be under 250 characters' })
  @IsEmail({},{ message: 'the email should be in a valid email format' })
  public email: string;
}