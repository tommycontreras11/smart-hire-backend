import { comparePassword } from "./../../utils/common.util";
import { SignInDTO } from "./../../dto/auth.dto";
import { statusCode } from "./../../utils/status.util";
import { retrieveIfUserExists } from "./../../utils/user.util";


export async function signInService({ email, password }: SignInDTO) {
  const foundUser = await retrieveIfUserExists(null, email);

  if (!foundUser) {
    return Promise.reject({
      message: "Email or password incorrect",
      status: statusCode.NOT_FOUND,
    });
  }

  const compareUserPassword = await comparePassword(password, foundUser.password);

  if (!compareUserPassword) {
    return Promise.reject({
      message: "Email or password incorrect",
      status: statusCode.BAD_REQUEST,
    });
  }

  return foundUser;
}
