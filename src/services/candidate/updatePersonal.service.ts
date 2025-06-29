import {
  SocialLinkCandidateDTO,
  UpdateCandidateDTO,
} from "../../dto/candidate.dto";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { SocialLinkEntity } from "./../../database/entities/entity/social-link.entity";
import { hashPassword } from "./../../utils/common.util";
import { statusCode } from "./../../utils/status.util";
import { validateProperty } from "./../../utils/user.util";

export async function updateCandidatePersonalService({
  candidate,
  identification,
  name,
  email,
  password,
  desired_salary,
  phone,
  location,
  bio,
  social_links,
  status,
}: UpdateCandidateDTO & { candidate: CandidateEntity }) {
  if (identification) {
    const foundIdentification = await validateProperty<CandidateEntity>(
      CandidateEntity,
      identification,
      "Identification"
    ).catch((e) => {
      console.error("updateCandidatePersonalService -> validateProperty: ", e);
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
      console.error("updateCandidatePersonalService -> validateProperty: ", e);
      return null;
    });

    if (foundEmail) {
      return Promise.reject({
        message: "Email already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  if (social_links && social_links.length > 0)
    await recursiveUpdateOrCreateSocialLinks(social_links, candidate);

  candidate.identification = identification ?? candidate.identification;
  candidate.name = name ?? candidate.name;
  candidate.email = email ?? candidate.email;
  candidate.password = password ? hashPassword(password) : candidate.password;
  candidate.desired_salary = desired_salary
    ? parseFloat(desired_salary)
    : candidate.desired_salary;
  candidate.phone = phone ?? candidate.phone;
  candidate.location = location ?? candidate.location;
  candidate.bio = bio ?? candidate.bio;
  candidate.status = status ?? candidate.status;

  await candidate.save().catch((e) => {
    console.error("updateCandidatePersonalService -> save: ", e);
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
    payload.value = foundSocialLinks.url;
    await foundSocialLinks.save().catch((e) => {
      console.error("updateCandidatePersonalService -> save: ", e);
    });
  } else {
    await SocialLinkEntity.create({
      url: payload.value,
      platform: payload.key,
      candidate: candidate,
    })
      .save()
      .catch((e) => {
        console.error("updateCandidatePersonalService -> save: ", e);
      });
  }

  return recursiveUpdateOrCreateSocialLinks(socialLinks, candidate);
};
