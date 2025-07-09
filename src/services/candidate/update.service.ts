import { In } from "typeorm";
import {
  SocialLinkCandidateDTO,
  UpdateCandidateDTO,
} from "../../dto/candidate.dto";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { SocialLinkEntity } from "./../../database/entities/entity/social-link.entity";
import { hashPassword } from "./../../utils/common.util";
import { statusCode } from "./../../utils/status.util";
import { uploadFile } from "./../../utils/upload.util";
import { validateProperty } from "./../../utils/user.util";

export async function updateCandidateService(
  uuid: string,
  {
    identification,
    name,
    email,
    password,
    desired_salary,
    phone,
    location,
    bio,
    social_links,
    departmentUUID,
    positionUUID,
    competencyUUIDs,
    status,
  }: Partial<UpdateCandidateDTO>,
  file?: Express.Multer.File | undefined
) {
  const foundCandidate = await CandidateEntity.findOne({
    relations: {
      department: true,
      competencies: true,
    },
    where: { uuid },
  }).catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.findOne: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (identification) {
    const foundIdentification = await validateProperty<CandidateEntity>(
      CandidateEntity,
      identification,
      "Identification"
    ).catch((e) => {
      console.error("updateCandidateService -> validateProperty: ", e);
      return null;
    });

    if (foundIdentification) {
      return Promise.reject({
        message: "Identification already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  if (email) {
    const foundEmail = await validateProperty<CandidateEntity>(
      CandidateEntity,
      email,
      "Email"
    ).catch((e) => {
      console.error("updateCandidateService -> validateProperty: ", e);
      return null;
    });

    if (foundEmail) {
      return Promise.reject({
        message: "Email already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  let foundDepartment: DepartmentEntity | null = null;
  if (departmentUUID) {
    foundDepartment = await DepartmentEntity.findOneBy({
      uuid: departmentUUID,
    }).catch((e) => {
      console.error(
        "updateCandidateService -> DepartmentEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundDepartment) {
      return Promise.reject({
        message: "Department not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  let foundPositionType: PositionTypeEntity | null = null;
  if (positionUUID) {
    foundPositionType = await PositionTypeEntity.findOne({
      relations: { department: true },
      where: { uuid: positionUUID },
    }).catch((e) => {
      console.error(
        "updateCandidateService -> PositionTypeEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundPositionType) {
      return Promise.reject({
        message: "Position type not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  if (foundDepartment && foundPositionType) {
    if (foundPositionType.department.uuid !== foundDepartment.uuid)
      return Promise.reject({
        message: "Position type and department not match",
        status: statusCode.BAD_REQUEST,
      });
  }

  let foundCompetencies: CompetencyEntity[] | null = [];
  if (competencyUUIDs && competencyUUIDs?.length > 0) {
    foundCompetencies = await CompetencyEntity.find({
      where: {
        uuid: In(competencyUUIDs),
      },
    }).catch((e) => {
      console.error(
        "updateCandidateService -> CompetencyEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (
      !foundCompetencies ||
      foundCompetencies.length !== competencyUUIDs.length
    ) {
      return Promise.reject({
        message: "Competencies not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  if (social_links && social_links.length > 0)
    await recursiveUpdateOrCreateSocialLinks(social_links, foundCandidate);

  foundCandidate.identification =
    identification ?? foundCandidate.identification;
  foundCandidate.name = name ?? foundCandidate.name;
  foundCandidate.email = email ?? foundCandidate.email;
  foundCandidate.password = password
    ? hashPassword(password)
    : foundCandidate.password;
  foundCandidate.desired_salary = desired_salary
    ? parseFloat(desired_salary)
    : foundCandidate.desired_salary;
  foundCandidate.phone = phone ?? foundCandidate.phone;
  foundCandidate.location = location ?? foundCandidate.location;
  foundCandidate.bio = bio ?? foundCandidate.bio;
  foundCandidate.department = foundDepartment ?? foundCandidate.department;
  foundCandidate.desiredPosition =
    foundPositionType ?? foundCandidate.desiredPosition;
  foundCandidate.competencies =
    foundCompetencies ?? foundCandidate.competencies;
  foundCandidate.status = status ?? foundCandidate.status;

  if (file)
    foundCandidate.curriculum = await uploadFile<CandidateEntity>(
      foundCandidate,
      file
    );

  await foundCandidate.save().catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.update: ", e);
    return null;
  });

  return "Candidate updated successfully";
}

const recursiveUpdateOrCreateSocialLinks = async (
  socialLinks: SocialLinkCandidateDTO[],
  candidate: CandidateEntity
): Promise<unknown> => {
  const payload = socialLinks.pop();

  if (!payload) return;

  const foundSocialLinks = await SocialLinkEntity.findOne({
    relations: {
      candidate: true,
    },
    where: {
      platform: payload.key,
      candidate: { id: candidate.id },
    },
  });

  if (foundSocialLinks) {
    foundSocialLinks.url = payload.value;
    await foundSocialLinks.save().catch((e) => {
      console.error("updateCandidateService -> save: ", e);
    });
  } else {
    await SocialLinkEntity.create({
      url: payload.value,
      platform: payload.key,
      candidate: candidate,
    })
      .save()
      .catch((e) => {
        console.error("updateCandidateService -> save: ", e);
      });
  }

  return recursiveUpdateOrCreateSocialLinks(socialLinks, candidate);
};
