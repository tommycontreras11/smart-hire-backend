import { CandidateEntity } from "./../database/entities/entity/candidate.entity";
import { EmployeeEntity } from "./../database/entities/entity/employee.entity";
import { RecruiterEntity } from "./../database/entities/entity/recruiter.entity";
import { statusCode } from "./status.util";

export async function retrieveIfUserExists(
  identification?: string | null,
  uuid?: string | null
) {
  const entities = await Promise.all([
    CandidateEntity.findOneBy({
      ...(identification && { identification }),
      ...(uuid && { uuid }),
    }),
    EmployeeEntity.findOneBy({
      ...(identification && { identification }),
      ...(uuid && { uuid }),
    }),
    RecruiterEntity.findOneBy({
      ...(identification && { identification }),
      ...(uuid && { uuid }),
    }),
  ]);

  return entities.find((entity) => entity) || null;
}

export async function validateIdentification<T>(entityClass: { new (): T }, identification: string) {
    const foundUser = await retrieveIfUserExists(identification);
  
    const isEntityClassType = foundUser instanceof entityClass;
  
    if (foundUser && (!isEntityClassType || isEntityClassType)) {
      return Promise.reject({
        message: "Identification already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
}