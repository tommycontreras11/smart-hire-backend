import { Request, Response } from "express";
import { getOneCandidateService } from "../../services/candidate/getOne.service";
import { statusCode } from "../../utils/status.util";
import { StatusRequestEnum } from "./../../constants";
import { ObjectStorage } from "./../../libs/object-storage";

export const getProfileController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneCandidateService({
    where: {
      uuid,
    },
    relations: {
      desiredPosition: true,
      department: true,
      workExperience: true,
      competencies: true,
      educations: {
        institution: true,
        academicDiscipline: true,
      },
      certifications: {
        institution: true,
        competencies: true,
      },
      requests: {
        recruitment: {
          recruiter: true,
        },
        jobPosition: {
          department: true,
        },
      },
      socialLinks: true,
    },
  })
    .then(async (data) => {
      const storage = ObjectStorage.instance;

      const candidate = {
        uuid: data.uuid,
        identification: data.identification,
        email: data.email,
        name: data.name,
        password: data.password,
        desired_salary: data.desired_salary,
        phone: data.phone,
        location: data.location,
        bio: data.bio,
        ...(data.educations && {
          educations: data.educations.map((education) => ({
            uuid: education.uuid,
            title: education?.title,
            description: education?.description,
            grade: education?.grade,
            start_date: education?.start_date,
            end_date: education?.end_date,
            institution: {
              uuid: education.institution.uuid,
              name: education.institution.name,
            },
            academicDiscipline: {
              uuid: education.academicDiscipline.uuid,
              name: education.academicDiscipline.name,
            },
          })),
        }),
        ...(data.certifications && {
          certifications: data.certifications.map((certification) => ({
            uuid: certification.uuid,
            name: certification.name,
            description: certification.description,
            expedition_date: certification?.expedition_date,
            expiration_date: certification?.expiration_date,
            credential_id: certification?.credential_id,
            credential_link: certification?.credential_link,
            institution: {
              uuid: certification.institution.uuid,
              name: certification.institution.name,
            },
            ...(certification.competencies && {
              competencies: certification.competencies.map((competency) => ({
                uuid: competency.uuid,
                name: competency.name,
              })),
            }),
          })),
        }),
        ...(data.requests && {
          requests: data.requests.map((request) => ({
            uuid: request.uuid,
            recruitment: {
              recruiter: {
                uuid: request.recruitment[0].recruiter.uuid,
                name: request.recruitment[0].recruiter.name,
              },
            },
            jobPosition: {
              uuid: request.jobPosition.uuid,
              name: request.jobPosition.name,
              department: {
                uuid: request.jobPosition.department.uuid,
                name: request.jobPosition.department.name,
              },
            },
            started_at:
              request.status === StatusRequestEnum.HIRED
                ? request.updatedAt
                : null,
          })),
        }),
        ...(data.socialLinks && {
          socialLinks: data.socialLinks.map((socialLink) => ({
            uuid: socialLink.uuid,
            url: socialLink.url,
            platform: socialLink.platform
          })),
        }),
        ...(data.competencies && {
          competencies: data.competencies.map((competency) => ({
            uuid: competency.uuid,
            name: competency.name,
          })),
        }),
        ...(data.photo && { photo_url: await storage.getUrl(data.photo) }),
        ...(data.curriculum && {
          curriculum: await storage.getUrl(data.curriculum),
        }),
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: candidate });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
