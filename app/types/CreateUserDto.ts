export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  authProvider: string;
}
