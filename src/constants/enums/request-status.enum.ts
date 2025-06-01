export enum StatusRequestEnum {
  DRAFT = "DRAFT", // The request is being created but not yet submitted
  SUBMITTED = "SUBMITTED", // The request was submitted by the candidate or recruiter
  UNDER_REVIEW = "UNDER_REVIEW", // HR is reviewing the request
  INTERVIEW = "INTERVIEW", // The candidate is scheduled for/interviewing
  EVALUATED = "EVALUATED", // Candidate interview has been completed and evaluated
  REJECTED = "REJECTED", // The candidate was not selected
  HIRED = "HIRED", // The candidate has accepted the offer and is hired
  CANCELLED = "CANCELLED", // The process was stopped or withdrawn
}

export type StatusRequestType = keyof typeof StatusRequestEnum;