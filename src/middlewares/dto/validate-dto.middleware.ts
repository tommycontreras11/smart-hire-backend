import { ClassConstructor, plainToInstance } from "class-transformer";
import { convertObjectValues } from "./../../utils/object.util";
import { ValidationDTOEnum, ValidationDTOType } from "./validate-dto.interface";
import { RequestHandler } from "express";
import { validate } from "class-validator";

export const validateDTO = (
	dtoClass: ClassConstructor<ObjectI>,
	type: ValidationDTOType = 'body',
	clearEmptyString = true,
	convertObjectValue = false
  ): RequestHandler => {
	return async (req, res, next) => {
	  const types: string[] = Object.values(ValidationDTOEnum);
	  if (!types.includes(type)) {
		res.status(500).json({
		  error: { message: 'Invalid type into validation DTO' },
		});
		return; // Ensure we exit early
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
		  const errorMessage = Object.values(error.constraints || {})[0];
		  res.status(400).json({ error: { message: errorMessage } });
		  return; // Ensure we exit early
		}
  
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
		next(); // Pass control to the next middleware
	  } catch (error) {
		res.status(500).json({ error: { message: error } });
	  }
	};
  };
  