import { CertificationEntity } from "./../../database/entities/entity/certification.entity";
import { statusCode } from "./../../utils/status.util";

export async function deleteCertificationService(uuid: string) {
  const foundCertification = await CertificationEntity.findOneBy({
    uuid,
  }).catch((e) => {
    console.error(
      "deleteCertificationService -> CertificationEntity.findOneBy: ",
      e
    );
    return null;
  });
  if (!foundCertification) {
    return Promise.reject({
      message: "Certification not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundCertification.softRemove().catch((e) => {
    console.error(
      "deleteCertificationService -> CertificationEntity.softRemove: ",
      e
    );
    return null;
  });

  return "Certification deleted successfully";
}
