import { Request, Response } from "express";
import { getOneCandidateService } from "../../services/candidate/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCandidateController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneCandidateService({
    where: {
      uuid,
    },
    relations: {
      desiredPosition: true,
      department: true,
      workExperience: true,
      educations: {
        institution: true,
        academicDiscipline: true,
      },
      certifications: {
        institution: true,
        competencies: true,
      },
    },
  })
    .then((data) => {
      const candidate = {
        uuid: data.uuid,
        identification: data.identification,
        email: data.email,
        name: data.name,
        password: data.password,
        desired_salary: data.desired_salary,
        desiredPosition: {
          uuid: data.desiredPosition.uuid,
          name: data.desiredPosition.name,
        },
        department: {
          uuid: data.department.uuid,
          name: data.department.name,
        },
        ...(data.workExperience && {
          workExperience: {
            uuid: data.workExperience.uuid,
            company: data.workExperience.company,
          },
        }),
        ...(data.educations && {
          educations: data.educations.map((education) => ({
            uuid: education.uuid,
            title: education?.title,
            grade: education?.grade,
            description: education?.description,
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
