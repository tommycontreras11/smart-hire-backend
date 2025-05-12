import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);