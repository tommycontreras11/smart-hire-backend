import { ClassConstructor, plainToInstance } from "class-transformer";
import { convertObjectValues } from "./../../utils/object.util";
import { ValidationDTOEnum, ValidationDTOType } from "./validate-dto.interface";
import { RequestHandler } from "express";
import { validate } from "class-validator";
import { statusCode } from "./../../utils/status.util";
import { SignUpDTO } from "../../dto/auth.dto";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { CreateCandidateDTO } from "../../dto/candidate.dto";
import { CreateEmployeeDTO } from "../../dto/employee.dto";
import { CreateRecruiterDTO } from "../../dto/recruiter.dto";

const typeToDTOMap: Record<UserRoleEnum, ClassConstructor<any>> = {
  [UserRoleEnum.RECRUITER]: CreateRecruiterDTO,
  [UserRoleEnum.CANDIDATE]: CreateCandidateDTO,
  [UserRoleEnum.EMPLOYEE]: CreateEmployeeDTO,
};

export const validateDTO = (
  dtoClass: ClassConstructor<ObjectI>,
  type: ValidationDTOType = 'body',
  clearEmptyString = true,
  convertObjectValue = false
): RequestHandler => {
  return async (req, res, next) => {
    const types: string[] = Object.values(ValidationDTOEnum);
    if (!types.includes(type)) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        error: { message: 'Invalid type into validation DTO' },
      });
	  return;
    }

    if (convertObjectValue) {
      req[type] = convertObjectValues(req[type]);
    }

    const data: ObjectI = plainToInstance(dtoClass, req[type], {
      strategy: 'exposeAll',
    });

    try {
      const errors = await validate(data, { whitelist: true });
      if (errors.length > 0) {
        const error = errors[0];
        const errorMessage = formatError(Object.values(error.constraints || {})[0]);
        res.status(statusCode.BAD_REQUEST).json({ error: { message: errorMessage } });
		return;
      }

      // Special handling for SignUpDTO
      if (dtoClass === SignUpDTO) {
        const signUpBody = req[type];
        const roleType = signUpBody.type as UserRoleEnum;
        const userDTOClass = typeToDTOMap[roleType];

        if (!userDTOClass) {
          res.status(statusCode.BAD_REQUEST).json({
            error: { message: 'Invalid user role type for sign up' },
          });
		  return;
        }

        const userInstance = plainToInstance(userDTOClass, signUpBody.user, {
          strategy: 'exposeAll',
        });

        const userErrors = await validate(userInstance, { whitelist: true });
        if (userErrors.length > 0) {
          const userError = userErrors[0];
          const userErrorMessage = formatError(Object.values(userError.constraints || {})[0]);
          res.status(statusCode.BAD_REQUEST).json({ error: { message: userErrorMessage } });
		  return
        }

        // Assign cleaned and validated user back
        req[type].user = userInstance;
      }

      // Clean empty/null/undefined values
      for (const key in data) {
        if (
          (clearEmptyString && data[key] === '') ||
          data[key] === null ||
          data[key] === undefined
        ) {
          delete data[key];
        }
      }

      req[type] = data;
      next();
    } catch (error) {
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        error: { message: error instanceof Error ? error.message : String(error) },
      });
    }
  };
};

const formatError = (error: string) => {
	error = error.replace("_", " ");
	return error[0].toUpperCase() + error.slice(1);
}