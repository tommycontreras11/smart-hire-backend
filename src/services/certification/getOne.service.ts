import { FindOneOptions } from "typeorm";
import { CertificationEntity } from "./../../database/entities/entity/certification.entity";
import { statusCode } from "./../../utils/status.util";

export async function getOneCertificationService(
  option: FindOneOptions<CertificationEntity>
) {
  const foundCertification = await CertificationEntity.findOne(option).catch(
    (e) => {
      console.error(
        "getOneCertificationService -> CertificationEntity.findOne: ",
        e
      );
      return null;
    }
  );

  if (!foundCertification) {
    return Promise.reject({
      message: "Certification not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundCertification;
}
