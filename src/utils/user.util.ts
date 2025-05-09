import { CandidateEntity } from "./../database/entities/entity/candidate.entity";
import { EmployeeEntity } from "./../database/entities/entity/employee.entity";
import { RecruiterEntity } from "./../database/entities/entity/recruiter.entity";

export async function retrieveIfUserExists<T>(
  entityClass: { new (): T },
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

  return entities.find((entity) => entity instanceof entityClass) || null;
}