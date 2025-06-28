import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveFileNamePropertyFromEmployeeTable1751118936973 implements MigrationInterface {
    name = 'RemoveFileNamePropertyFromEmployeeTable1751118936973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`file_name\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`file_name\` varchar(255) NOT NULL`);
    }

}
