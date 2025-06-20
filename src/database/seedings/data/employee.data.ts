import { StatusEnum } from "./../../../constants"

const employees = [
    {
        identification: "123456789",
        email: "employee@example.com",
        name: "Carlos ",
        password: "123456",
        monthly_salary: 5000,
        entry_date: "2023-01-01",
        positionType: "Front End",
        department: "IT",
        file_name: ""
    }
]

export const employeesData = employees.map((employee) => ({
    identification: employee.identification,
    email: employee.email,
    name: employee.name,
    password: employee.password,
    monthly_salary: employee.monthly_salary,
    entry_date: employee.entry_date,
    positionType: employee.positionType,
    department: employee.department,
    file_name: employee.file_name,
    status: StatusEnum.ACTIVE
}))