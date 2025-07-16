import {
    WorkContractType,
    WorkLocationType
} from "./../../../enums/work.enum";

export interface WorkMetadata {
  work_type: WorkContractType;
  work_location: WorkLocationType;
}
