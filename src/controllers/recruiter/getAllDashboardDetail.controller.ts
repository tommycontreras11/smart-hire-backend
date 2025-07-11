import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { StatusEnum, StatusRequestEnum } from "../../constants";
import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";
import { retrieveIfUserExists } from "../../utils/user.util";
import { getAllDashboardDetailService } from "./../../services/recruiter/getAllDashboardDetail.service";

interface IRecruitmentCommonActivity {
  total_candidates: number;
  total_hired: number;
}

interface IRecruitmentMonthActivity {
  month: string;
  activity: IRecruitmentCommonActivity;
}

interface IRecruitmentDepartmentActivity extends IRecruitmentCommonActivity {
  department: string;
  total_candidates: number;
  total_hired: number;
}

export const getAllDashboardDetailController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.user;

  const validateUser = (await retrieveIfUserExists(
    null,
    null,
    uuid
  )) as RecruiterEntity;

  getAllDashboardDetailService(validateUser, {
    relations: {
      requests: {
        candidate: {
          desiredPosition: true,
        },
        histories: true
      },
      recruiter: {
        institution: true,
      },
      department: true,
      country: true,
    },
    where: {
      recruiter: {
        institution: {
          uuid: validateUser?.institution?.uuid,
        },
      },
    },
  })
    .then((data) => {
      const activeVacancies = data
        .filter(
          (dashboardDetail) => dashboardDetail.status === StatusEnum.ACTIVE
        )
        .map((dashboardDetail) => ({
          uuid: dashboardDetail.uuid,
          name: dashboardDetail.name,
          department: dashboardDetail.department.name,
          country: dashboardDetail.country.name,
          total_candidates:
            dashboardDetail?.requests.filter(
              (r) => r.status === StatusRequestEnum.SUBMITTED
            )?.length || 0,
          due_date: dashboardDetail.due_date,
        }));

      const recentCandidates = data
        .map(
          (dashboardDetail) =>
            dashboardDetail?.requests?.map((r) => ({
              uuid: r.candidate.uuid,
              full_name: r.candidate.name,
              position_type: r.candidate.desiredPosition.name,
              applied_at: r.createdAt,
              status: r.status,
            })) || []
        )
        .flat();

      const dashboardResume = {
        total_active_vacancies:
          activeVacancies?.length === 0 ? 0 : activeVacancies.length,
        total_recent_candidates:
          recentCandidates?.length === 0 ? 0 : recentCandidates.length,
        total_interviews: getTotalRequestByStatus(
          data,
          StatusRequestEnum.INTERVIEW
        ),
        total_hired: getTotalRequestByStatus(data, StatusRequestEnum.HIRED),
      };

      const recruitmentMonthActivity: IRecruitmentMonthActivity[] = [];

      for (let i = 1; i <= 12; i++) {
        const date = new Date();
        date.setMonth(i - 1);
        const month = getMonth(data, date);
        recruitmentMonthActivity.push(month);
      }

      const recruitmentDepartmentActivity: IRecruitmentDepartmentActivity[] =
        [];

      for (const department of data
        .map((d) => d.department.name)
        .filter((v, i, a) => a.indexOf(v) === i)) {
        const departmentData = filterRecruitmentActivityByDepartment(
          data,
          department
        );
        recruitmentDepartmentActivity.push({ ...departmentData, department });
      }

      const dashboardDetails = {
        dashboardResume,
        recruitmentMonthActivity,
        recruitmentDepartmentActivity,
        activeVacancies,
        recentCandidates,
        totalDaysToHire: getTotalsDaysToHireByDepartment(data),
      };

      res.status(statusCode.OK).json({ data: dashboardDetails });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};

export const filterRecruitmentActivityByMonth = (
  data: JobPositionEntity[],
  month: number | null
) => {
  const currentYear = new Date().getFullYear();

  const dataFilteredByCurrentMonthAndYear = data.filter(
    (dashboard) =>
      dashboard.createdAt.getFullYear() == currentYear &&
      dashboard.createdAt.getMonth() + 1 == month
  );

  return getRecruitmentActivityCandidateResume(
    dataFilteredByCurrentMonthAndYear
  );
};

export const filterRecruitmentActivityByDepartment = (
  data: JobPositionEntity[],
  department: string
) => {
  const currentYear = new Date().getFullYear();

  const dataFilteredByCurrentMonthAndYear = data.filter(
    (dashboard) =>
      dashboard.department.name == department &&
      dashboard.createdAt.getFullYear() == currentYear
  );

  return getRecruitmentActivityCandidateResume(
    dataFilteredByCurrentMonthAndYear
  );
};

export const getRecruitmentActivityCandidateResume = (
  data: JobPositionEntity[]
) => {
  return {
    total_candidates: getTotalRequestByStatus(
      data,
      StatusRequestEnum.SUBMITTED
    ),
    total_hired: getTotalRequestByStatus(data, StatusRequestEnum.HIRED),
  };
};

export const getMonth = (data: JobPositionEntity[], date: Date) => {
  return {
    month: date.toLocaleString("default", { month: "long" }),
    activity: filterRecruitmentActivityByMonth(data, date.getMonth() + 1),
  };
};

export const getTotalRequestByStatus = (
  data: JobPositionEntity[],
  status: StatusRequestEnum
) => {
  if (!existsRequest(data)) return 0;

  return data?.filter((dashboard) =>
    dashboard?.requests?.find((r) => r?.status === status)
  ).length;
};

export const existsRequest = (data: JobPositionEntity[]) => {
  return data.some((dashboard) => dashboard?.requests?.length > 0);
};

export const getTotalsDaysToHireByDepartment = (data: JobPositionEntity[]) => {
  return data.flatMap((dashboard) => {
    return dashboard.requests
      .filter((r) => r.status === StatusRequestEnum.HIRED)
      .map((r) => {
        const requestHistories = r.histories
          ?.filter((h) => h.request_id === r.id)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        if (!requestHistories || requestHistories.length < 2) {
          return null; // Not enough data to calculate
        }

        const start = new Date(requestHistories[0].createdAt);
        const end = new Date(requestHistories[requestHistories.length - 1].createdAt);

        const diffMs = end.getTime() - start.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        return {
          department: dashboard.department.name,
          days: parseFloat(diffDays.toFixed(4)),
        };
      })
      .filter(Boolean);
  });
};
