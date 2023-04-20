import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

export async function compare(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
