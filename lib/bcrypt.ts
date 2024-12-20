import { genSalt, hash, compare } from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(saltRounds);
  return hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return compare(password, hash);
}
