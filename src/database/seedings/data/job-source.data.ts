import { JobSourceEntity } from "./../../../database/entities/entity/job-source.entity";

const jobSources = [
  "LinkedIn",
  "Company website",
  "Indeed",
  "Other job sites",
  "Recommendation",
  "Contacted by recruiter",
  "Staffing agency",
  "Other"
];


export const jobSourcesData: Partial<JobSourceEntity>[] = jobSources.map((jobSource) => ({
    name: jobSource
}))