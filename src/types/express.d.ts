import {
	IQueryDates,
	IQueryPagination
} from '@interfaces/common/express.interface'
import { FindOptionsWhere } from 'typeorm'
import { CandidateEntity } from './../database/entities/entity/candidate.entity'
import { EmployeeEntity } from './../database/entities/entity/employee.entity'
import { RecruiterEntity } from './../database/entities/entity/recruiter.entity'

declare global {
	namespace Express {
		interface Request {
			session: ObjectI
			pagination?: IQueryPagination
			dates?: IQueryDates
			order: "ASC" | "DESC"
			filter: FindOptionsWhere | ObjectI
			user: RecruiterEntity | EmployeeEntity | CandidateEntity
			cookies: {
				[key: string]: string
			}
		}
	}
}

export { }

