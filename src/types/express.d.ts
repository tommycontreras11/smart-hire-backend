import {
	IQueryDates,
	IQueryPagination
} from '@interfaces/common/express.interface'
import { FindOptionsWhere } from 'typeorm'
import { UserEntity } from './../database/entities/entity/user.entity'
import { EmployeeEntity } from './../database/entities/entity/employee.entity'

declare global {
	namespace Express {
		interface Request {
			session: ObjectI
			pagination?: IQueryPagination
			dates?: IQueryDates
			order: "ASC" | "DESC"
			filter: FindOptionsWhere | ObjectI
			user: UserEntity | EmployeeEntity
			cookies: {
				[key: string]: string
			}
		}
	}
}

export { }
